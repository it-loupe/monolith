import { Channel, Connection } from 'amqplib';

const amqp = require('amqplib');
const _ = require('lodash');

export default class MessageBroker {
  private readonly queues: {};
  private connection: Connection;
  private channel: Channel;
  private exchange: any;

  constructor() {
    this.queues = {};
  }

  async init() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    return this;
  }

  async createEx({ name, type, durable = true }) {
    if (!this.connection) await this.init();
    await this.channel.assertExchange(name, type, { durable });
    this.exchange = name;
    return this;
  }

  /**
   * Send message to and exchange
   * @param {Object} - object defining exchange and routingKey
   * @param {Object} msg Message{ exchange: string; routingKey: string }, msg: object)
   */
  async publish({ exchange, routingKey }: { exchange: string; routingKey: string }, msg: object) {
    const queue = `$>;{this.exchange}.${routingKey}`;
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, this.exchange, routingKey);
    this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
  }

  /**
   * @param {Object} - object defining queue name and bindingKey
   * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
   */
  async subscribe({ exchange, routingKey }: { exchange: string; routingKey: string }, handler: Function) {
    const queue = `${exchange}.${routingKey}`;
    if (!this.connection) {
      await this.init();
    }
    if (this.queues[queue]) {
      const existingHandler = _.find(this.queues[queue], (h) => h === handler);
      if (existingHandler) {
        return () => this.unsubscribe(queue, existingHandler);
      }
      this.queues[queue].push(handler);
      return () => this.unsubscribe(queue, handler);
    }

    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, this.exchange, routingKey);
    this.queues[queue] = [handler];
    await this.channel.consume(queue, async (msg) => {
      const ack = _.once(() => this.channel.ack(msg));
      this.queues[queue].forEach((h) => h(msg, ack));
    });
    return () => this.unsubscribe(queue, handler);
  }

  async unsubscribe(queue, handler) {
    _.pull(this.queues[queue], handler);
  }
}
