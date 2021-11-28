import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {BitacoraUsuario, BitacoraUsuarioRelations} from '../models';

export class BitacoraUsuarioRepository extends DefaultCrudRepository<
  BitacoraUsuario,
  typeof BitacoraUsuario.prototype.idBitacoraUsuario,
  BitacoraUsuarioRelations
> {
  constructor(@inject('datasources.Azure') dataSource: AzureDataSource) {
    super(BitacoraUsuario, dataSource);
  }
}
