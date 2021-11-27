import {Entity, model, property, hasMany} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';

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

  @hasMany(() => Beneficiario)
  beneficiarios: Beneficiario[];

  constructor(data?: Partial<Comunidad>) {
    super(data);
  }
}

export interface ComunidadRelations {
  // describe navigational properties here
}

export type ComunidadWithRelations = Comunidad & ComunidadRelations;
