import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

type GraphQLResponse = {
  email_templates: {
    0: {
      template: string;
    };
  };
  settings: {
    0: { toEmail: string };
  };
};

export async function getEmailTemplateBySlug(
  emailTemplateSlug: string,
  contactUsToEmailKey: string
) {
  const {
    email_templates: {
      0: { template },
    },
    settings: {
      0: { toEmail },
    },
  } = (await request({
    document: gql`
      query GetEmailTemplateBySlug(
        $emailTemplateSlug: String!
        $contactUsToEmailKey: String!
      ) {
        email_templates(filter: { slug: { _eq: $emailTemplateSlug } }) {
          template
        }
        settings(filter: { key: { _eq: $contactUsToEmailKey } }) {
          toEmail: value
        }
      }
    `,
    variables: {
      emailTemplateSlug,
      contactUsToEmailKey,
    },
  })) as GraphQLResponse;

  return { template, toEmail };
}
