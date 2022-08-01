import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    vercelUrl: process.env.VERCEL_URL,
    buildId: process.env.NEXT_BUILD_ID,
    commit: serverRuntimeConfig.NEXT_COMMIT,
    branch: serverRuntimeConfig.NEXT_BRANCH,
    environment: process.env.VERCEL_ENV,
  });
}
