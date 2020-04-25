import Appointment from '../models/Appointments';
import { isEqual } from 'date-fns';

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppintment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppintment || null;
  }
  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
