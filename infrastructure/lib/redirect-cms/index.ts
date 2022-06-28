import { Stack, StackProps } from 'aws-cdk-lib';
import { RedirectProtocol, RoutingRule } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { getHostedZone } from './route53';
import { createS3Cloudfront } from './s3-cloudfront';

export class RedirectCmsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const CERTIFICATE_ARN = this.node.tryGetContext(
      'CERTIFICATE_ARN_US_EAST_1'
    );
    const REGION = Stack.of(this).region;
    const CMS_HOSTNAME = this.node.tryGetContext('CMS_HOSTNAME');
    const BASE_DOMAIN_NAME = this.node.tryGetContext('BASE_DOMAIN_NAME');
    const DOMAIN_NAME = `cms.${BASE_DOMAIN_NAME}`;
    const BUCKET_NAME = `redirect.cms.${BASE_DOMAIN_NAME}`;
    const { hostedZoneId } = getHostedZone(this, BASE_DOMAIN_NAME);

    this.templateOptions.description = `${BASE_DOMAIN_NAME} - cms redirect`;

    const routingRule: RoutingRule = {
      hostName: CMS_HOSTNAME,
      httpRedirectCode: '301',
      protocol: RedirectProtocol.HTTPS,
    };
    createS3Cloudfront(
      this,
      CERTIFICATE_ARN,
      DOMAIN_NAME,
      BUCKET_NAME,
      hostedZoneId,
      REGION,
      [],
      ['s3:GetBucketWebsite*'],
      {
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'index.html',
        websiteRoutingRules: [routingRule],
      },
      {
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: '/index.html',
          },
        ],
      }
    );
  }
}
