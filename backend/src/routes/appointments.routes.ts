import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppintmentsInSameDate = appointmentRepository.findByDate(
    parsedDate,
  );
  if (findAppintmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'Thie appointment is alread booked' });
  }

  const appointment = appointmentRepository.create(provider, parsedDate);

  return response.json(appointment);
});
export default appointmentsRouter;
