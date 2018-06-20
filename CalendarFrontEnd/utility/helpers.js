
export const getFirstDayOfMonth = (month, year) => {
  year = year ? year : year = new Date().getFullYear();
  return new Date(year, month, 1).getDay();
};

export const getEndOfMonth = (month, year) => {
  year = year ? year : year = new Date().getFullYear();
  return new Date(year, month + 1, 0).getDate();
};


