import { SSM } from 'aws-sdk';

const appName = 'mehubarim-server';
const keys = ['jwt-expiration', 'jwt-secret', 'mmongodb-uri', 'port'];

async function fetchParameter(
  ssm: SSM,
  parameterName: string,
): Promise<string | undefined> {
  try {
    console.info(`Fetching parameter: ${parameterName}`);
    const { Parameter } = await ssm
      .getParameter({ Name: parameterName, WithDecryption: true })
      .promise();
    if (!Parameter || !Parameter.Value) {
      throw new Error(`Parameter ${parameterName} has no value`);
    }
    console.info(`Fetched parameter: ${parameterName}`);
    return Parameter.Value;
  } catch (error) {
    console.error(`Error fetching parameter ${parameterName}:`, error);
    throw new Error(`Failed to retrieve parameter: ${parameterName}`);
  }
}

export async function loadEnvParamsFromSsm(): Promise<void> {
  if (process.env.NODE_ENV === 'local') {
    console.info('Skipping SSM loading, local environment detected');
    return;
  }

  console.info(
    `Loading environment variables from SSM for environment: ${process.env.NODE_ENV}`,
  );
  const ssm = new SSM();

  try {
    const loadPromises = keys.map(async (key) => {
      const parameterName = `/${appName}/${process.env.NODE_ENV}/${key}`;
      const value = await fetchParameter(ssm, parameterName);

      if (value) {
        const envKey = key.replace('-', '_').toUpperCase();
        console.info(`Setting environment variable ${envKey}`);
        process.env[envKey] = value;
      }
    });

    await Promise.all(loadPromises);
    console.info('All environment variables have been loaded successfully');
  } catch (error) {
    console.error('Error loading environment variables from SSM:', error);
    throw new Error('Failed to load environment variables from SSM');
  }
}
