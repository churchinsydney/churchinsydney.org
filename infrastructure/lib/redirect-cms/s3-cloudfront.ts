import {
  aws_certificatemanager as certManager,
  aws_cloudfront as cloudFront,
  aws_iam as IAM,
  aws_route53 as route53,
  aws_route53_targets as route53Targets,
  aws_s3 as s3,
  CfnOutput,
  RemovalPolicy,
  Stack,
} from 'aws-cdk-lib';
import { CloudFrontWebDistributionProps } from 'aws-cdk-lib/aws-cloudfront/lib/web-distribution';
import { BucketProps } from 'aws-cdk-lib/aws-s3/lib/bucket';

export const createS3Cloudfront = (
  stack: Stack,
  certificateArn: string,
  domain: string,
  bucketName: string,
  hostedZoneId: string,
  awsRegion: string,
  allowedMethods?: string[],
  allowedActions?: string[],
  s3Props?: BucketProps,
  cloudFrontProps?: Omit<CloudFrontWebDistributionProps, 'originConfigs'>
) => {
  // Add S3 Bucket
  const s3Bucket = new s3.Bucket(stack, `${bucketName}`, {
    bucketName,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    autoDeleteObjects: true,
    removalPolicy: RemovalPolicy.DESTROY,
    ...s3Props,
  });

  enableCorsOnBucket(s3Bucket, allowedMethods);

  // Create a new CloudFront Distribution
  const cloudFrontOAI = new cloudFront.OriginAccessIdentity(stack, 'OAI', {
    comment: `OAI for ${bucketName} app.`,
  });

  const certificate = certManager.Certificate.fromCertificateArn(
    stack,
    `${bucketName}-cert`,
    certificateArn
  );

  const distribution = new cloudFront.CloudFrontWebDistribution(
    stack,
    `${bucketName}-cf-distribution`,
    {
      ...{
        viewerCertificate: cloudFront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: [domain],
            securityPolicy: cloudFront.SecurityPolicyProtocol.TLS_V1_2_2021,
          }
        ),
        priceClass: cloudFront.PriceClass.PRICE_CLASS_ALL,
        defaultRootObject: '/',
        originConfigs: [
          {
            customOriginSource: {
              domainName: `${bucketName}.s3-website-${awsRegion}.amazonaws.com`,
            },
            behaviors: [
              {
                viewerProtocolPolicy:
                  cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                isDefaultBehavior: true,
                compress: true,
                allowedMethods: cloudFront.CloudFrontAllowedMethods.ALL,
                cachedMethods:
                  cloudFront.CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
                forwardedValues: {
                  queryString: true,
                  cookies: {
                    forward: 'none',
                  },
                  headers: [
                    'Access-Control-Request-Headers',
                    'Access-Control-Request-Method',
                    'Origin',
                  ],
                },
              },
            ],
          },
        ],
        comment: `${bucketName} - CloudFront Distribution`,
        viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      ...cloudFrontProps,
    }
  );
  const cloudfrontS3Access = new IAM.PolicyStatement();
  [...(allowedActions || [])]?.forEach((action) => {
    cloudfrontS3Access.addActions(action);
  });

  cloudfrontS3Access.addResources(s3Bucket.bucketArn);
  cloudfrontS3Access.addResources(`${s3Bucket.bucketArn}/*`);
  cloudfrontS3Access.addCanonicalUserPrincipal(
    cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
  );
  s3Bucket.addToResourcePolicy(cloudfrontS3Access);

  const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
    stack,
    `${bucketName}-route53-hosted-zone`,
    {
      hostedZoneId,
      zoneName: domain,
    }
  );

  new route53.ARecord(stack, `${bucketName}-aliasForCloudfront`, {
    target: route53.RecordTarget.fromAlias(
      new route53Targets.CloudFrontTarget(distribution)
    ),
    zone: hostedZone,
    recordName: domain,
  });

  // Final CloudFront URL
  new CfnOutput(stack, `${bucketName}-CloudFront URL`, {
    value: distribution.distributionDomainName,
  });

  return { s3Bucket, cloudFrontDistribution: distribution };
};

/**
 * Enables CORS access on the given bucket
 */
const enableCorsOnBucket = (
  bucket: s3.IBucket,
  allowedMethods: string[] = []
) => {
  const cfnBucket = bucket.node.findChild('Resource') as s3.CfnBucket;
  cfnBucket.addPropertyOverride('CorsConfiguration', {
    CorsRules: [
      {
        AllowedOrigins: ['*'],
        AllowedMethods: ['HEAD', 'GET', ...allowedMethods],
        ExposedHeaders: [
          'x-amz-server-side-encryption',
          'x-amz-request-id',
          'x-amz-id-2',
        ],
        AllowedHeaders: ['*'],
      },
    ],
  });
};
