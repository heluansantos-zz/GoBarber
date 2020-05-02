import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppintment = await this.findOne({
      where: { date },
    });
    return findAppintment || null;
  }
}

export default AppointmentsRepository;
