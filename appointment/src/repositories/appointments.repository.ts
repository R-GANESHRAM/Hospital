import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Appointments, AppointmentsRelations} from '../models';

export class AppointmentsRepository extends DefaultCrudRepository<
  Appointments,
  typeof Appointments.prototype.id,
  AppointmentsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Appointments, dataSource);
  }
}
