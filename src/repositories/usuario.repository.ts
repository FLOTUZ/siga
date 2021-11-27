import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasManyThroughRepositoryFactory,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {
  Beneficiario,
  Captura,
  Programa,
  Solicitud,
  Usuario,
  UsuarioRelations,
} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';
import {BitacoraUsuarioRepository} from './bitacora-usuario.repository';
import {CapturaRepository} from './captura.repository';
import {ProgramaRepository} from './programa.repository';
import {SolicitudRepository} from './solicitud.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {
  public readonly programas: HasManyRepositoryFactory<
    Programa,
    typeof Usuario.prototype.idUsuario
  >;

  public readonly captura: HasManyThroughRepositoryFactory<
    Solicitud,
    typeof Solicitud.prototype.idSolicitud,
    Captura,
    typeof Usuario.prototype.idUsuario
  >;

  public readonly autorizadas: HasManyRepositoryFactory<
    Solicitud,
    typeof Usuario.prototype.idUsuario
  >;

  public readonly entrega: HasOneRepositoryFactory<
    Solicitud,
    typeof Usuario.prototype.idUsuario
  >;

  public readonly beneficiarios: HasManyRepositoryFactory<
    Beneficiario,
    typeof Usuario.prototype.idUsuario
  >;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
    @repository.getter('ProgramaRepository')
    protected programaRepositoryGetter: Getter<ProgramaRepository>,
    @repository.getter('SolicitudRepository')
    protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
    @repository.getter('CapturaRepository')
    protected capturaRepositoryGetter: Getter<CapturaRepository>,
    @repository.getter('BeneficiarioRepository')
    protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
    @repository.getter('BitacoraUsuarioRepository')
    protected bitacoraUsuarioRepositoryGetter: Getter<BitacoraUsuarioRepository>,
  ) {
    super(Usuario, dataSource);

    this.beneficiarios = this.createHasManyRepositoryFactoryFor(
      'beneficiarios',
      beneficiarioRepositoryGetter,
    );
    this.entrega = this.createHasOneRepositoryFactoryFor(
      'entrega',
      solicitudRepositoryGetter,
    );
    this.registerInclusionResolver('entrega', this.entrega.inclusionResolver);

    this.autorizadas = this.createHasManyRepositoryFactoryFor(
      'autorizadas',
      solicitudRepositoryGetter,
    );

    this.captura = this.createHasManyThroughRepositoryFactoryFor(
      'captura',
      solicitudRepositoryGetter,
      capturaRepositoryGetter,
    );
    this.registerInclusionResolver('captura', this.captura.inclusionResolver);

    this.programas = this.createHasManyRepositoryFactoryFor(
      'programas',
      programaRepositoryGetter,
    );
  }
}
