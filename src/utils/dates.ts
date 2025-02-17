export function getDates(timeType: string) {
  const today = new Date();
  let startingDate: Date;
  let endingDate: Date;

  switch (timeType) {
    case 'today':
      startingDate = today;
      endingDate = today;
      break;
    case 'yesterday':
      startingDate = new Date(today.setDate(today.getDate() - 1));
      endingDate = startingDate;
      break;
    case 'last week':
      endingDate = new Date(today);
      startingDate = new Date(today.setDate(today.getDate() - 7));
      break;
    case 'last month':
      endingDate = new Date(today);
      startingDate = new Date(today.setMonth(today.getMonth() - 1));
      break;
    default:
      startingDate = today;
      endingDate = today;
  }

  return { startingDate, endingDate };
}

export function getSeasonDates(season: string, year: string) {
  const seasonsToDates: Record<string, [string, string]> = {
    'spring': ['03-01', '05-31'],
    'summer': ['06-01', '08-31'],
    'fall': ['09-01', '11-30'],
    'winter': ['12-01', '02-29']
  };

  const startYear = year;
  let endYear = year;

  if (season === 'winter') {
    endYear = (parseInt(year) + 1).toString();
  }

  const startingDate = new Date(`${startYear}-${seasonsToDates[season][0]} `);
  const endingDate = new Date(`${endYear}-${seasonsToDates[season][1]} `);

  return { startingDate, endingDate };
} 