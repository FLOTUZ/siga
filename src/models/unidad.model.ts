import {Entity, model, property} from '@loopback/repository';

@model()
export class Unidad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idUnidad?: number;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  nombre?: string;

  constructor(data?: Partial<Unidad>) {
    super(data);
  }
}

export interface UnidadRelations {
  // describe navigational properties here
}

export type UnidadWithRelations = Unidad & UnidadRelations;
