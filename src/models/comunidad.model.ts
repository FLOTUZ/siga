import {Entity, model, property} from '@loopback/repository';

@model()
export class Comunidad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idComunidad?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  beneficiarioId?: number;

  constructor(data?: Partial<Comunidad>) {
    super(data);
  }
}

export interface ComunidadRelations {
  // describe navigational properties here
}

export type ComunidadWithRelations = Comunidad & ComunidadRelations;
