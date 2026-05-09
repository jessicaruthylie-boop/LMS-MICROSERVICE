const amqp = require("amqplib");

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    const channel = await connection.createChannel();

    await channel.assertQueue("exam_queue");

    console.log("RabbitMQ Connected");

    return channel;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = connectRabbitMQ;
