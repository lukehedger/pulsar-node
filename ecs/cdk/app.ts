import { App } from 'aws-cdk-lib';
import { PulsarConsumerStack } from './stack';

const app = new App();

new PulsarConsumerStack(app, 'PulsarConsumerStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.AWS_REGION || process.env.CDK_DEFAULT_REGION,
  },
});
