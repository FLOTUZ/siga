import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, BitacoraBeneficiario, PersonaMoral, PersonaFisica} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {BitacoraBeneficiarioRepository} from './bitacora-beneficiario.repository';
import {PersonaMoralRepository} from './persona-moral.repository';
import {PersonaFisicaRepository} from './persona-fisica.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.idBeneficiario,
  BeneficiarioRelations
> {

  public readonly logBeneficiarios: HasManyRepositoryFactory<BitacoraBeneficiario, typeof Beneficiario.prototype.idBeneficiario>;

  public readonly personaMoral: HasOneRepositoryFactory<PersonaMoral, typeof Beneficiario.prototype.idBeneficiario>;

  public readonly personaFisica: HasOneRepositoryFactory<PersonaFisica, typeof Beneficiario.prototype.idBeneficiario>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('SolicitudRepository')
    protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('BitacoraBeneficiarioRepository') protected bitacoraBeneficiarioRepositoryGetter: Getter<BitacoraBeneficiarioRepository>, @repository.getter('PersonaMoralRepository') protected personaMoralRepositoryGetter: Getter<PersonaMoralRepository>, @repository.getter('PersonaFisicaRepository') protected personaFisicaRepositoryGetter: Getter<PersonaFisicaRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.personaFisica = this.createHasOneRepositoryFactoryFor('personaFisica', personaFisicaRepositoryGetter);
    this.registerInclusionResolver('personaFisica', this.personaFisica.inclusionResolver);
    this.personaMoral = this.createHasOneRepositoryFactoryFor('personaMoral', personaMoralRepositoryGetter);
    this.registerInclusionResolver('personaMoral', this.personaMoral.inclusionResolver);
    this.logBeneficiarios = this.createHasManyRepositoryFactoryFor('logBeneficiarios', bitacoraBeneficiarioRepositoryGetter,);
    this.registerInclusionResolver('logBeneficiarios', this.logBeneficiarios.inclusionResolver);
  }
}
