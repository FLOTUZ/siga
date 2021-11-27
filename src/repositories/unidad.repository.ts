import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Unidad, UnidadRelations} from '../models';

export class UnidadRepository extends DefaultCrudRepository<
  Unidad,
  typeof Unidad.prototype.idUnidad,
  UnidadRelations
> {
  constructor(@inject('datasources.Azure') dataSource: AzureDataSource) {
    super(Unidad, dataSource);
  }
}
