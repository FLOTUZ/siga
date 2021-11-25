import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Azure',
  connector: 'mysql',
  url: '',
  host: '104.43.202.176.',
  port: 3307,
  user: 'root',
  password: 'sintezoide',
  database: 'sigacharo'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AzureDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Azure';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Azure', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
