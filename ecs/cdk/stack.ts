import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import { Cluster, ContainerImage, FargateService, FargateTaskDefinition, LogDrivers } from 'aws-cdk-lib/aws-ecs';

export class PulsarConsumerStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // Build Docker image from local Dockerfile. Replace with ECR for production usage
    const dockerImage = new DockerImageAsset(this, 'PulsarConsumerDockerImage', {
      directory: '../app',
    });

    // TODO: Will likely need to add Cognito Identity Pool permissions
    const taskDefinition = new FargateTaskDefinition(this, 'PulsarConsumerTaskDefinition', {
      cpu: 256,
      family: 'pulsar-consumer',
      memoryLimitMiB: 512,
    });

    // TODO: Turn this into an L3 construct with default env vars and map list of topics to consume
    taskDefinition.addContainer('PulsarConsumerTopicA', {
      image: ContainerImage.fromDockerImageAsset(dockerImage),
      environment: {},
      logging: LogDrivers.awsLogs({ streamPrefix: 'TopicA' }),
    });

    taskDefinition.addContainer('PulsarConsumerTopicB', {
      image: ContainerImage.fromDockerImageAsset(dockerImage),
      environment: {},
      logging: LogDrivers.awsLogs({ streamPrefix: 'TopicB' }),
    });

    new FargateService(this, 'PulsarConsumerFargateService', {
      cluster: new Cluster(this, 'PulsarConsumerCluster', { vpc: new Vpc(this, 'PulsarConsumerClusterVpc') }),
      desiredCount: 1,
      taskDefinition: taskDefinition,
      serviceName: 'pulsar-consumer',
    });

    // TODO: Figure out the optimum scaling strategy for production usage
    // const scaling = fargateService.autoScaleTaskCount({ maxCapacity: 10, minCapacity: 1 });
    // scaling.scaleOnCpuUtilization('CpuScaling', { targetUtilizationPercent: 70 });
  }
}
