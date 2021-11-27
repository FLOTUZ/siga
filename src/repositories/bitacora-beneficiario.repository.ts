import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {BitacoraBeneficiario, BitacoraBeneficiarioRelations} from '../models';

export class BitacoraBeneficiarioRepository extends DefaultCrudRepository<
  BitacoraBeneficiario,
  typeof BitacoraBeneficiario.prototype.idBitacoraBeneficiario,
  BitacoraBeneficiarioRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(BitacoraBeneficiario, dataSource);
  }
}
