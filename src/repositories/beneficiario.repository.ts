import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations} from '../models';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.idBeneficiario,
  BeneficiarioRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(Beneficiario, dataSource);
  }
}
