# IT Loupe

- [Miro](https://miro.com/app/board/uXjVP6h9ioc=/)
- [Presentation](https://docs.google.com/presentation/d/1_YJaqwwzofk55nRsRXhcHYGJmLTNzQSsJDUyKFrwFKI/edit#slide=id.g15e334fe05e_0_17)

## How to start

Copy .env.example to `.env`.

[Create](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and add GITHUB_TOKEN to `.env`

```shell
docker compose --env-file .env up --build -d
```

## Usage example

You can make request to url <http://localhost:10022/topic/keycloak> to see stats on keycloak topic.

## Ports map

| Url                      | Description          |
|--------------------------|----------------------|
| <http://localhost:10012> | RabbitMQ Management  |
| <http://localhost:10022> | API                  |
| <http://localhost:10021> | Frontend (Not ready) |

## Contributing

```shell
docker compose --env-file .env up -d
```

### API

```shell
docker compose exec "api" /bin/sh
npm run start:dev
```

## References

- [Github API docs](https://docs.github.com/en/rest/search?apiVersion=2022-11-28)
- [Awesome-rest, пример awesome репозитория](https://github.com/marmelab/awesome-rest/)
- [React](https://reactjs.org/docs/getting-started.html)
- [Create react app](https://create-react-app.dev/docs/adding-typescript/)
- [amqplib](https://github.com/amqp-node/amqplib)
- [amqplib docs](https://amqp-node.github.io/amqplib/)
- [rabbitmq-nodejs-tutorials](https://github.com/johnfriz/rabbitmq-nodejs-tutorials/blob/master/one/send.js)
- [How to Consume/Publish RabbitMQ queue in NodeJS](https://medium.com/@rafael.guzman/how-to-consume-publish-rabbitmq-message-in-nodejs-cb68b5a6484c)
- [rabbitmq-tutorials](https://github.com/rabbitmq/rabbitmq-tutorials/blob/main/javascript-nodejs/src/receive.js)
- [How to run RabbitMQ with Node.JS](https://www.cloudamqp.com/blog/how-to-run-rabbitmq-with-nodejs.html)
- [Rabbitmq In Nodejs And Task Processing](https://strapengine.com/rabbitmq-in-nodejs-and-task-processing/)
- [RabbitMQ In Docker](https://strapengine.com/rabbitmq-in-docker/)
- [Строим REST API с использованием Nest.js и Swagger](https://habr.com/ru/post/668340/)
- [nest](https://github.com/nestjs/nest/tree/master/sample)
- [Building Modern Backend Using Nest JS, MongoDB](https://medium.com/weekly-webtips/building-modern-backendusing-nest-js-and-mongodb-96fd04f4b050)
- [Joining tables in MongoDB with Mongoose](https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60)
- [How to Create Relationships with Mongoose and Node.JS](https://dev.to/oluseyeo/how-to-create-relationships-with-mongoose-and-node-js-11c8)
- [Fetch all pages with Octokit pagination](https://michaelheap.com/octokit-pagination/)
- [Stackoverflow example](https://stackoverflow.com/questions/tagged/kotlin?sort=MostFrequent&edited=true)
- [api.stackexchange.com](https://api.stackexchange.com/docs)
