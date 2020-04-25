import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import appointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: appointmentsRepository;
  constructor(appointmentsRepository: appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }
  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppintmentsInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppintmentsInSameDate) {
      throw Error('Thie appointment is alread booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
