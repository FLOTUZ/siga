import {Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import {BitacoraPrograma} from './bitacora-programa.model';
import {Solicitud} from './solicitud.model';
import {Unidad} from './unidad.model';

@model()
export class Programa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPrograma?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  costoUnitario: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'boolean',
    default: false,
  })
  habilitado?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro?: string;

  @property({
    type: 'date',
  })
  fechaFinalizacion?: string;

  @property({
    type: 'number',
  })
  usuarioId?: number;

  @property({
    type: 'number',
  })
  unidadId?: number;

  @hasMany(() => BitacoraPrograma)
  logPrograma: BitacoraPrograma[];

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @hasOne(() => Unidad)
  unidad: Unidad;

  constructor(data?: Partial<Programa>) {
    super(data);
  }
}

export interface ProgramaRelations {
  // describe navigational properties here
}

export type ProgramaWithRelations = Programa & ProgramaRelations;
