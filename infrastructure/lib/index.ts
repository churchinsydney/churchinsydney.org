#!/usr/bin/env node
import { App } from 'aws-cdk-lib/core/lib/app';
import 'source-map-support/register';

import { RedirectCmsStack } from './redirect-cms';

// eslint-disable-next-line import/no-anonymous-default-export
export default (app: App) => {
  const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  };

  return {
    RedirectCmsStack: new RedirectCmsStack(app, `redirect-cms-stack`, {
      env,
    }),
  };
};
