import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

function lastActivity(time: dayjs.Dayjs) {
  return (time as any).fromNow();
}

function adjustTime(
  time: dayjs.Dayjs,
  value: number,
  unit: dayjs.OpUnitType,
  subtract: boolean = false
) {
  return subtract ? time.subtract(value, unit) : time.add(value, unit);
}

function twoHoursLate(time: string) {
  return lastActivity(adjustTime(dayjs(time), 2, "hours"));
}

export { adjustTime, lastActivity, twoHoursLate };

export default dayjs;
