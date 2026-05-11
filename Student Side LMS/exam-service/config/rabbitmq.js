const amqp = require("amqplib");

const connectRabbitMQ = async () => {
  while (true) {
    try {
      const connection = await amqp.connect("amqp://rabbitmq");

      const channel = await connection.createChannel();

      await channel.assertQueue("exam_queue");

      console.log("RabbitMQ Connected");

      return channel;
    } catch (error) {
      console.log("Waiting RabbitMQ...");

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

module.exports = connectRabbitMQ;
