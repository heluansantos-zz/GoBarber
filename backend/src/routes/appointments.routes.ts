import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();
interface Appointment {
  id: string;
  provider: string;
  date: Date;
}
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
  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };
  appointments.push(appointment);
  return response.json(appointment);
});
export default appointmentsRouter;
