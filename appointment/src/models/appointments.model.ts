import {Entity, model, property} from '@loopback/repository';

@model()
export class Appointments extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  patient_id: number;

  @property({
    type: 'number',
    required: true,
  })
  doctor_id: number;

  @property({
    type: 'string',
    required: true,
  })
  appointment_day: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  reason: string;

  @property({
    type: 'string',
    required: true,
  })
  start_time: string;

  @property({
    type: 'string',
    required: true,
  })
  end_time: string;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Appointments>) {
    super(data);
  }
}

export interface AppointmentsRelations {
  // describe navigational properties here
}

export type AppointmentsWithRelations = Appointments & AppointmentsRelations;
