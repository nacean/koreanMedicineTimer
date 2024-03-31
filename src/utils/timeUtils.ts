export const getClockFromNumber = (num: number) => {
  const minute = Math.floor(num / 60);
  const second = num - minute * 60;

  const minuteString =
    minute < 10
      ? "0" + minute.toFixed().toString()
      : minute.toFixed().toString();
  const secondString =
    second < 10
      ? "0" + second.toFixed().toString()
      : second.toFixed().toString();

  return minuteString + ":" + secondString;
};
