import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Comunidad, ComunidadRelations} from '../models';

export class ComunidadRepository extends DefaultCrudRepository<
  Comunidad,
  typeof Comunidad.prototype.idComunidad,
  ComunidadRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(Comunidad, dataSource);
  }
}
