import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

const appointmentsRouter = Router();
const appointments: Appointment[] = [];
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppintmentsInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );
  if (findAppintmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'Thie appointment is alread booked' });
  }
  const appointment = new Appointment(provider, parsedDate);
  appointments.push(appointment);
  return response.json(appointment);
});
export default appointmentsRouter;
