import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default function lastActivity(time: string) {
  return (dayjs(time) as any).fromNow();
  //   const difference = new Date().getTime() - time;
  //   const seconds = (difference / 1000) | 0;
  //   const minutes = (seconds / 60) | 0;
  //   const hours = (minutes / 60) | 0;
  //   const days = (hours / 24) | 0;

  //   if (days > 0) return `${days} days ago`;
  //   if (hours > 0) return `${hours} hours ago`;
  //   if (minutes > 0) return `${minutes} minutes ago`;
  //   return `now`;
}
