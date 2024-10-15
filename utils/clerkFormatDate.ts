function clerkFormatDate(lastActiveAt: number | null): string {
  if (lastActiveAt === null) {
    return 'No date available'; // or any default value you prefer
  }

  const date = new Date(lastActiveAt);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format minutes to always show two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${month} ${year} ${hours}:${formattedMinutes}`;
}

export default clerkFormatDate;
