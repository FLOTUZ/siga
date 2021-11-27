import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, BitacoraBeneficiario} from '../models';
import {BitacoraBeneficiarioRepository} from './bitacora-beneficiario.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.idBeneficiario,
  BeneficiarioRelations
> {

  public readonly bitacoraBeneficiarios: HasManyRepositoryFactory<BitacoraBeneficiario, typeof Beneficiario.prototype.idBeneficiario>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('BitacoraBeneficiarioRepository') protected bitacoraBeneficiarioRepositoryGetter: Getter<BitacoraBeneficiarioRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.bitacoraBeneficiarios = this.createHasManyRepositoryFactoryFor('bitacoraBeneficiarios', bitacoraBeneficiarioRepositoryGetter,);
    this.registerInclusionResolver('bitacoraBeneficiarios', this.bitacoraBeneficiarios.inclusionResolver);
  }
}
