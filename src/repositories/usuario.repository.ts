import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Usuario, UsuarioRelations} from '../models';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(Usuario, dataSource);
  }
}
