import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, BitacoraBeneficiario, PersonaMoral} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {BitacoraBeneficiarioRepository} from './bitacora-beneficiario.repository';
import {PersonaMoralRepository} from './persona-moral.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.idBeneficiario,
  BeneficiarioRelations
> {

  public readonly logBeneficiarios: HasManyRepositoryFactory<BitacoraBeneficiario, typeof Beneficiario.prototype.idBeneficiario>;

  public readonly personaMoral: HasOneRepositoryFactory<PersonaMoral, typeof Beneficiario.prototype.idBeneficiario>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('SolicitudRepository')
    protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('BitacoraBeneficiarioRepository') protected bitacoraBeneficiarioRepositoryGetter: Getter<BitacoraBeneficiarioRepository>, @repository.getter('PersonaMoralRepository') protected personaMoralRepositoryGetter: Getter<PersonaMoralRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.personaMoral = this.createHasOneRepositoryFactoryFor('personaMoral', personaMoralRepositoryGetter);
    this.registerInclusionResolver('personaMoral', this.personaMoral.inclusionResolver);
    this.logBeneficiarios = this.createHasManyRepositoryFactoryFor('logBeneficiarios', bitacoraBeneficiarioRepositoryGetter,);
    this.registerInclusionResolver('logBeneficiarios', this.logBeneficiarios.inclusionResolver);
  }
}
