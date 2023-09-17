import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'Todo-logger' },
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'todo.log',
    }),
  ],
});
