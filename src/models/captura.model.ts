import {Entity, model, property} from '@loopback/repository';

@model()
export class Captura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    unique: true,
  })
  idCaptura?: number;

  @property({
    type: 'number',
  })
  usuarioId?: number;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  constructor(data?: Partial<Captura>) {
    super(data);
  }
}

export interface CapturaRelations {
  // describe navigational properties here
}

export type CapturaWithRelations = Captura & CapturaRelations;
