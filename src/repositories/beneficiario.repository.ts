import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, BitacoraBeneficiario} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {BitacoraBeneficiarioRepository} from './bitacora-beneficiario.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.idBeneficiario,
  BeneficiarioRelations
> {

  public readonly logBeneficiarios: HasManyRepositoryFactory<BitacoraBeneficiario, typeof Beneficiario.prototype.idBeneficiario>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('SolicitudRepository')
    protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('BitacoraBeneficiarioRepository') protected bitacoraBeneficiarioRepositoryGetter: Getter<BitacoraBeneficiarioRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.logBeneficiarios = this.createHasManyRepositoryFactoryFor('logBeneficiarios', bitacoraBeneficiarioRepositoryGetter,);
    this.registerInclusionResolver('logBeneficiarios', this.logBeneficiarios.inclusionResolver);
  }
}
