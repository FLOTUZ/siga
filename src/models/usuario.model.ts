import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';
import {BitacoraUsuario} from './bitacora-usuario.model';
import {Captura} from './captura.model';
import {Programa} from './programa.model';
import {Solicitud} from './solicitud.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idUsuario?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoPaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoMaterno: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  puesto?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  haceSolicitudes: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  altaDeApoyos: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  autorizaApoyos: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  haceReportes?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  administraSistema?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  activo: boolean;

  @hasMany(() => Solicitud, {through: {model: () => Captura}})
  solicitudesCapturadas: Solicitud[];

  @hasMany(() => Programa)
  programasCapturados: Programa[];

  @hasMany(() => Solicitud, {keyTo: 'usuarioAutorizadorId'})
  solicitudesAutorizadas: Solicitud[];

  @hasOne(() => Solicitud, {keyTo: 'usuarioEntregaId'})
  apoyosEntregados: Solicitud;

  @hasMany(() => Beneficiario, {keyTo: 'usuarioCargaId'})
  beneficiariosDadosDeAlta: Beneficiario[];

  @hasMany(() => BitacoraUsuario)
  bitacoraUsuario: BitacoraUsuario[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
