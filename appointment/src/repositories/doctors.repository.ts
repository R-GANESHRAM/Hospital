import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Doctors, DoctorsRelations} from '../models';

export class DoctorsRepository extends DefaultCrudRepository<
  Doctors,
  typeof Doctors.prototype.doctor_id,
  DoctorsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Doctors, dataSource);
  }
}
