import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<Programa>) {
    super(data);
  }
}

export interface ProgramaRelations {
  // describe navigational properties here
}

export type ProgramaWithRelations = Programa & ProgramaRelations;
