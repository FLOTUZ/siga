import {Entity, model, property} from '@loopback/repository';

@model()
export class PersonaMoral extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    unique: true,
  })
  idPersonaMoral?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreRepresentante: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoPaternoRepresentante: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidoMaternoRepresentante: string;

  @property({
    type: 'string',
    required: true,
  })
  telefonoLocalRep: string;

  @property({
    type: 'string',
    required: true,
  })
  telefonoCelularRep: string;

  @property({
    type: 'string',
    required: true,
  })
  correoRep: string;

  @property({
    type: 'number',
  })
  beneficiarioId?: number;

  constructor(data?: Partial<PersonaMoral>) {
    super(data);
  }
}

export interface PersonaMoralRelations {
  // describe navigational properties here
}

export type PersonaMoralWithRelations = PersonaMoral & PersonaMoralRelations;
