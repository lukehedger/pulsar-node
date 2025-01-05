const Pulsar = require('pulsar-client');

(async () => {
  const client = new Pulsar.Client({
    serviceUrl: 'pulsar://localhost:6650',
    authentication: new Pulsar.AuthenticationToken({
      token: 'token',
    }),
  });

  await client.subscribe({
    topic: 'my-topic', // TODO: Get a real topic name
    subscription: 'my-subscription', // TODO: Give this a name
    subscriptionType: 'Exclusive', // TODO: is this correct?
    listener: (msg, msgConsumer) => {
      console.log(msg.getData().toString());
      msgConsumer.acknowledge(msg);
    },
  });
})();
