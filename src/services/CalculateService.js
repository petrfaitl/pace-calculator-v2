export default {
  getSpeed(time, distance) {
    return (distance / (movingTimeMs(time) / 1000 / 60 / 60)).toFixed(1);
  },
  getPace(time, distance) {
    const timePer = Math.round(movingTimeMs(time) / distance);
    return this.getHumanTime(timePer);
  },
  getMovingTime(time) {
    const millis = movingTimeMs(time);
    return this.getHumanTime(millis);
  },
  pluralStr(value, str) {
    return value > 1 ? `${str}s` : str;
  },
  getHumanTime(millis) {
    let seconds = Math.round(millis / 1000);
    let minutes = Math.trunc(seconds / 60);
    let hours = Math.trunc(minutes / 60);
    let days = Math.trunc(hours / 24);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    let str =
      minutes || hours
        ? `${String(seconds).padStart(2, "0")}`
        : `${String(seconds).padStart(2, "0")}s`;
    str = minutes || hours ? `${String(minutes).padStart(2, "0")}:` + str : str;
    str = hours || days ? `${String(hours).padStart(2, "0")}:` + str : str;
    str = days ? `${String(days)}${this.pluralStr(days, "day")} ` + str : str;

    return str;
  },
  distanceTimeCalc(time, enteredDistance, newDistance, convertFactor) {
    return this.getHumanTime(
      getPaceInMilli(time, enteredDistance / convertFactor) * newDistance
    );
  },
};
const movingTimeMs = function (time) {
  const [hours, minutes, seconds] = time.split(":");
  return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
};

const getPaceInMilli = function (time, distance) {
  return Math.round(movingTimeMs(time) / distance);
};
