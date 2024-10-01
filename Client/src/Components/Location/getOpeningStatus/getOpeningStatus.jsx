import "./getOpeningStatus.css";

export const getOpeningStatus = (openingTime, closingTime) => {
  // console.log(openingTime, closingTime);
  const now = new Date();
  const [openingHour, openingMinute] = openingTime.split(":").map(Number);
  const [closingHour, closingMinute] = closingTime.split(":").map(Number);

  //==========================================================================
  // Check for 24-hour open status
  //==========================================================================

  if (openingHour === 0 && closingHour === 23 && closingMinute === 59) {
    return {
      isOpen: true,
      message: "Open 24 hours",
      detail: "", // No additional detail needed for 24-hour open
    };
  }
  //==========================================================================
  // Check for custom time open status
  //==========================================================================
  const openingDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    openingHour,
    openingMinute
  );
  const closingDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    closingHour,
    closingMinute
  );

  if (now >= openingDate && now <= closingDate) {
    const timeToClose = `${closingDate.getHours()}:${closingDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    return {
      isOpen: true,
      message: `Open Now.`,
      detail: `Closes at ${timeToClose}`,
    };
  } else {
    const nextOpeningDate =
      now > closingDate
        ? new Date(openingDate.setDate(openingDate.getDate() + 1))
        : openingDate;
    const timeToOpen = `${nextOpeningDate.getHours()}:${nextOpeningDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    return {
      isOpen: false,
      message: "Closed.",
      detail: `Opens tomorrow at ${timeToOpen}`,
    };
  }
};
