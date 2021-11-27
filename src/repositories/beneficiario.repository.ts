import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations} from '../models';
import {BitacoraBeneficiarioRepository} from './bitacora-beneficiario.repository';
import {ComunidadRepository} from './comunidad.repository';
import {SolicitudRepository} from './solicitud.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.idBeneficiario,
  BeneficiarioRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('BitacoraBeneficiarioRepository')
    protected bitacoraBeneficiarioRepositoryGetter: Getter<BitacoraBeneficiarioRepository>,
    @repository.getter('SolicitudRepository')
    protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
    @repository.getter('ComunidadRepository')
    protected comunidadRepositoryGetter: Getter<ComunidadRepository>,
  ) {
    super(Beneficiario, dataSource);
  }
}
