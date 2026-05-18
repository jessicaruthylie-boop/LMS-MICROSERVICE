const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");

    channel = await connection.createChannel();

    await channel.assertQueue("notification_queue");

    console.log("RabbitMQ Connected");

    return channel;
  } catch (error) {
    console.log(error);
  }
};

const getChannel = () => {
  return channel;
};

module.exports = {
  connectRabbitMQ,
  getChannel,
};
