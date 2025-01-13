import Pulsar from 'pulsar-client';
import {
  CognitoIdentityClient,
  GetOpenIdTokenForDeveloperIdentityCommand,
} from '@aws-sdk/client-cognito-identity';
import { ClientAssertionCredential } from '@azure/identity';

if (process.env.LOCAL) {
  const dotenv = await import('dotenv');
  dotenv.config();
}

const env = process.env;

const cognitoIdentityClient = new CognitoIdentityClient({ region: env.AWS_REGION });

(async () => {
  const { Token } = await cognitoIdentityClient.send(new GetOpenIdTokenForDeveloperIdentityCommand({
    IdentityPoolId: env.IDENTITY_POOL_ID,
    Logins: { 'azure-oidc': env.CLIENT_ID },
  }));

  const tokenCredential = new ClientAssertionCredential(env.TENANT_ID, env.CLIENT_ID, () => Token);

  const { token } = await tokenCredential.getToken(env.SCOPE);

  const client = new Pulsar.Client({
    authentication: new Pulsar.AuthenticationToken({ token: token }),
    serviceUrl: env.SERVICE_URL,
  });

  await client.subscribe({
    topic: env.TOPIC,
    subscription: env.SUBSCRIPTION,
    subscriptionType: 'Shared',
    listener: (msg, msgConsumer) => {
      console.log(msg.getData().toString());
      msgConsumer.acknowledge(msg);
    },
  });
})();
