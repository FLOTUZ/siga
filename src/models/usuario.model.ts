import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
