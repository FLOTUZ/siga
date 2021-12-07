import {Entity, model, property} from '@loopback/repository';

@model()
export class Unidad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    unique: true,
  })
  idUnidad?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  constructor(data?: Partial<Unidad>) {
    super(data);
  }
}

export interface UnidadRelations {
  // describe navigational properties here
}

export type UnidadWithRelations = Unidad & UnidadRelations;
