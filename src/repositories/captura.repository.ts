import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Captura, CapturaRelations} from '../models';

export class CapturaRepository extends DefaultCrudRepository<
  Captura,
  typeof Captura.prototype.idCaptura,
  CapturaRelations
> {
  constructor(@inject('datasources.Azure') dataSource: AzureDataSource) {
    super(Captura, dataSource);
  }
}
