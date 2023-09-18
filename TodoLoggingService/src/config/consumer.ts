import { kafka } from './client';
import { logger } from './logger';

export async function consumer() {
  const consumer = kafka.consumer({ groupId: 'todo-group' });
  console.log('Connecting consumer');
  await consumer.connect();

  await consumer.subscribe({ topic: 'Todo-Created' });
  await consumer.subscribe({ topic: 'Todo-Updated' });
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      try {
        const decodedMessage = JSON.parse(message.value?.toString() || '');
        console.log(`[${topic}]: PART:${partition}:`, decodedMessage);
        logger.info(topic, decodedMessage);
      } catch (error) {
        console.error('Error decoding message:', error);
      }
    },
  });
}
