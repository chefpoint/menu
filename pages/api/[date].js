import database from '../../services/database';
import Day from '../../models/Day';

export default async function days(req, res) {
  //

  // Connect to the Database
  database.connect();

  switch (req.method) {
    //
    case 'GET':
      let getResult;
      if (req.query.date == '*') getResult = await getAllDays();
      else getResult = await getDayWith(req.query.date);
      await res.status(getResult.status).json(getResult.data);
      break;
    //
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

/* * */
/* REST: GET */
async function getAllDays() {
  // Fetch all documents from the database and sort them
  const allDays = await Day.find({});

  const filteredDays = allDays.filter((item) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);
    const isBetweenDates = today.getTime() <= itemDate.getTime();
    return isBetweenDates && item.is_public;
  });

  const sortedDays = filteredDays.sort((a, b) => new Date(a.date) - new Date(b.date));
  return { status: 200, data: sortedDays };
}

/* * */
/* REST: GET */
async function getDayWith(date) {
  // Fetch documents from the database that match the requested 'date'
  const foundDay = await Day.find({ date: date });

  if (foundDay.length > 0) {
    // If document with date exists
    return { status: 200, data: foundDay[0] };
  } else {
    // If document with date does not exist
    return { status: 404, data: { message: `Day with date: ${date} not found.` } };
  }
}
