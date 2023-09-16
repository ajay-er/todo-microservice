import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'todo-app',
  brokers: ['kafka:9092'],
});
