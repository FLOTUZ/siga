import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {env} from 'process';

const config = {
  name: 'Azure',
  connector: 'mysql',
  url: '',
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AzureDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'Azure';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Azure', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
