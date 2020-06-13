import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  findByData(date: Date): Promise<Appointment | undefined>;
}
