import { SSM } from 'aws-sdk';

const appName = 'mehubarim-server';
const keys = ['jwt-expiration', 'jwt-secret', 'mmongodb-uri', 'port'];

async function getParameter(
  ssm: SSM,
  name: string,
): Promise<string | undefined> {
  try {
    console.info(`before getParameter ${name}`);
    const data = await ssm
      .getParameter({
        Name: name,
        WithDecryption: true,
      })
      .promise();

    console.info(`after getParameter ${data}`);
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
  console.info(`loading env params from SSM env:${process.env.NODE_ENV}`);
  const ssm = new SSM();
  await keys.forEach(async (key) => {
    const value = await getParameter(ssm, `/${appName}/${process.env}/${key}`);
    console.info(`/${appName}/${process.env}/${key}`, value);
    process.env[key.replace('-', '_').toUpperCase()] = value;
  });
}
