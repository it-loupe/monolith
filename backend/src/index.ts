import MessageBroker from "./services/messageBroker"
import * as dotenv from 'dotenv';

class App {
  private rmq: MessageBroker;

  constructor() {
    dotenv.config();
  }

  async init() {
    this.rmq = await new MessageBroker().init();
  }

  async run() {
    console.log('Starting');

    // Create exchanges
    await this.rmq.createEx({ name: 'test-exchange', type: 'direct' });

    await this.rmq.subscribe({exchange: 'test-exchange', routingKey: 'test-key'}, (payload, ack) => {
      const message = JSON.parse(payload.content.toString());
      console.log(`get message 'test-key': ${message.url}`);
      ack();
    })

    await this.rmq.subscribe({exchange: 'test-exchange', routingKey: 'test-key2'}, (payload, ack) => {
      console.log(`get message 'test-key2': ${payload.content.toString()}`)
    })

    await this.rmq.publish({exchange: 'test-exchange', routingKey: 'test-key'}, {"url": "keycloak/keycloak"})
  }

  async finalize() {

  }
}

const app = new App();

app.init()
  .then(app.run.bind(app))
  .catch(e => console.log(e.message));

console.log('TEST');