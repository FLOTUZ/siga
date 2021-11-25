import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Log, LogRelations} from '../models';

export class LogRepository extends DefaultCrudRepository<
  Log,
  typeof Log.prototype.idLog,
  LogRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(Log, dataSource);
  }
}
