const timeRegex = /^(?<date>\d{4}\/\d{2}\/\d{2})T(?<time>\d{2}:\d{2}:\d{2})/;

const formatDate = (dateISO: string) => {
  const timestamp = timeRegex.exec(dateISO.replaceAll("-", "/"))?.groups;
  if (timestamp === undefined) return new Date();

  const event = new Date(timestamp.date + " " + timestamp.time + " GMT+00:00");
  return event;
};

const formatMessageDate = (dateISO: string) => {
  const today = new Date();
  const todayYear = today.toLocaleDateString("en-EN", { year: "numeric" });
  const todayDate = today.toLocaleDateString("en-EN", {
    month: "short",
    day: "numeric",
  });

  const timestamp = formatDate(dateISO);
  const year = timestamp.toLocaleDateString("en-EN", { year: "numeric" });
  const date = timestamp.toLocaleDateString("en-EN", {
    month: "short",
    day: "numeric",
  });
  const time = timestamp.toLocaleTimeString("en-EN", {
    hour: "numeric",
    minute: "numeric",
  });

  if (year !== todayYear) return date + " " + year + " " + time;
  else if (date !== todayDate) return date + " " + time;
};

const formatChatDate = (dateISO: string) => {
  const today = new Date();
  const timestamp = formatDate(dateISO);

  const diffTime = Math.abs(today.getTime() - timestamp.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return timestamp.toLocaleTimeString("en-EN", {
      hour: "numeric",
      minute: "numeric",
    });
  } else if (diffDays < 7) {
    return timestamp.toLocaleDateString("en-EN", { weekday: "short" });
  } else return timestamp.toLocaleDateString("en-EN");
};

export { formatMessageDate, formatChatDate };
