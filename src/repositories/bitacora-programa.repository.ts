import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {BitacoraPrograma, BitacoraProgramaRelations} from '../models';

export class BitacoraProgramaRepository extends DefaultCrudRepository<
  BitacoraPrograma,
  typeof BitacoraPrograma.prototype.idBitacoraPrograma,
  BitacoraProgramaRelations
> {
  constructor(@inject('datasources.Azure') dataSource: AzureDataSource) {
    super(BitacoraPrograma, dataSource);
  }
}
