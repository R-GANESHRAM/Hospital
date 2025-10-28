import {repository} from '@loopback/repository';
import {
  post,
  put,
  del,
  get,
  param,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {AppointmentsRepository} from '../repositories';
import {Appointments} from '../models';

export class AppointmentController {
  constructor(
    @repository(AppointmentsRepository)
    public appointmentRepository: AppointmentsRepository,
  ) {}

  // Create new appointment
  @post('/appointments')
  @response(200, {
    description: 'Appointment created successfully',
    content: {'application/json': {schema: {'x-ts-type': Appointments}}},
  })
  async create(
    @requestBody() appointmentData: Omit<Appointments, 'id'>,
  ): Promise<Appointments> {
    return this.appointmentRepository.create(appointmentData);
  }

  // Update appointment by ID
  @put('/appointments/{id}')
  @response(200, {
    description: 'Appointment updated successfully',
    content: {'application/json': {schema: {'x-ts-type': Appointments}}},
  })
  async update(
    @param.path.number('id') id: number,
    @requestBody() appointmentData: Partial<Appointments>,
  ): Promise<Appointments> {
    const existing = await this.appointmentRepository.findById(id);
    if (!existing) {
      throw new HttpErrors.NotFound(`Appointment with ID ${id} not found`);
    }
    await this.appointmentRepository.updateById(id, appointmentData);
    return this.appointmentRepository.findById(id);
  }

  // Cancel appointment (soft delete by updating status)
  @del('/appointments/cancel/{id}')
  @response(204, {description: 'Appointment canceled successfully'})
  async cancel(@param.path.number('id') id: number): Promise<void> {
    await this.appointmentRepository.updateById(id, {
      status: 'Canceled',
    });
  }

  // Get all appointments
  @get('/appointments')
  @response(200, {
    description: 'Array of all appointments',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {'x-ts-type': Appointments},
        },
      },
    },
  })
  async findAll(): Promise<Appointments[]> {
    return this.appointmentRepository.find();
  }
}
