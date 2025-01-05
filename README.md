# pulsar-node

## Setup

### Install NPM dependencies

```sh
npm install
```

## Run

### Start the Pulsar server

```sh
make pulsar
```

### Run the Pulsar producer

```sh
node producer.js
```

You should see the output:

```sh
Sent message: my-message-0
Sent message: my-message-1
Sent message: my-message-2
Sent message: my-message-3
Sent message: my-message-4
Sent message: my-message-5
Sent message: my-message-6
Sent message: my-message-7
Sent message: my-message-8
Sent message: my-message-9
```

### Run the Pulsar consumer

```sh
node consumer.js
```

You should see the output each time the producer is run:

```sh
my-message-0
my-message-1
my-message-2
my-message-3
my-message-4
my-message-5
my-message-6
my-message-7
my-message-8
my-message-9
```
