import { SSM } from 'aws-sdk';

const appName = 'mehubarim-server';
const keys = [
  'jwt-expiration',
  'jwt-secret',
  'mmongodb-uri',
  'node-env',
  'port',
];

async function getParameter(
  ssm: SSM,
  name: string,
): Promise<string | undefined> {
  try {
    const data = await ssm
      .getParameter({
        Name: name,
        WithDecryption: true,
      })
      .promise();

    return data.Parameter?.Value;
  } catch (error) {
    console.error('Error retrieving parameter:', error);
    throw new Error(`Failed to get parameter: ${name}`);
  }
}

export async function loadEnvParamsFromSsm() {
  if (process.env.NODE_ENV === 'local') {
    return;
  }
  const ssm = new SSM();
  await keys.forEach(async (key) => {
    const value = await getParameter(ssm, `/${appName}/${process.env}/${key}`);
    process.env[key.replace('-', '_').toUpperCase()] = value;
  });
}
