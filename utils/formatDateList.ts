import { format, parse } from 'date-fns';
import { id } from 'date-fns/locale';

const formatDateList = (value: string): string => {
  const dateString = value; // ISO format for March 12, 2024, 13:00 UTC

// Parse the date string into a Date object
  const parsedDate = parse(dateString, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date());

// Format the date to the desired format
  const formattedDate = format(parsedDate, "d MMMM yyyy HH:mm", { locale: id });

  return formattedDate;
};

export default formatDateList;
