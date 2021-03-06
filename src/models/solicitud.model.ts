import {Entity, hasMany, model, property} from '@loopback/repository';
import {BitacoraSolicitud} from './bitacora-solicitud.model';
import {Captura} from './captura.model';
import {Usuario} from './usuario.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    unique: true,
  })
  idSolicitud?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'date',
  })
  fechaAutorizacion?: string;

  @property({
    type: 'string',
    default: 'pendiente',
  })
  estatus?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @property({
    type: 'number',
    required: true,
  })
  costoTotal: number;

  @property({
    type: 'string',
  })
  motivoRechazo?: string;

  @property({
    type: 'date',
  })
  fechaEntrega?: string;

  @property({
    type: 'string',
  })
  notas?: string;

  @property({
    type: 'number',
  })
  usuarioAutorizadorId?: number;

  @property({
    type: 'number',
  })
  usuarioEntregaId?: number;

  @property({
    type: 'number',
    required: true,
  })
  programaId: number;

  @property({
    type: 'number',
    required: true,
  })
  beneficiarioId: number;

  @hasMany(() => BitacoraSolicitud)
  logSolicitud: BitacoraSolicitud[];

  @hasMany(() => Usuario, {through: {model: () => Captura}})
  capturadores: Usuario[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
