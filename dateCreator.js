exports.date = () => {
  let date = new Date();
  let dateObj = {};
  if (date.getDate() < 10) {
    dateObj = { ...dateObj, day: "0" + date.getDate() };
  } else {
    dateObj = { ...dateObj, day: date.getDate() };
  }

  switch (date.getMonth()) {
    case 0:
      dateObj = { ...dateObj, month: "января" };
      break;
    case 1:
      dateObj = { ...dateObj, month: "февраля" };
      break;
    case 2:
      dateObj = { ...dateObj, month: "марта" };
      break;
    case 3:
      dateObj = { ...dateObj, month: "апреля" };
      break;
    case 4:
      dateObj = { ...dateObj, month: "мая" };
      break;
    case 5:
      dateObj = { ...dateObj, month: "июня" };
      break;
    case 6:
      dateObj = { ...dateObj, month: "июля" };
      break;
    case 7:
      dateObj = { ...dateObj, month: "августа" };
      break;
    case 8:
      dateObj = { ...dateObj, month: "сентября" };
      break;
    case 9:
      dateObj = { ...dateObj, month: "октября" };
      break;
    case 10:
      dateObj = { ...dateObj, month: "ноября" };
      break;
    case 11:
      dateObj = { ...dateObj, month: "декабря" };
      break;
      default:
          console.log("что то не так")
  }

  dateObj = { ...dateObj, year: date.getFullYear() };
  console.log(date.getDay());
  return dateObj;
};
