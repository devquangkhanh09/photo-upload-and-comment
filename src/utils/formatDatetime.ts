export const getAgoTime = (time: string) => {
  const diff = new Date().getTime() - new Date(time).getTime();
  const days = Math.floor(diff / (24 * 3600 * 1000));
  const leave1 = diff % (24 * 3600 * 1000);
  const hours = Math.floor(leave1 / (3600 * 1000));
  const leave2 = leave1 % (3600 * 1000);
  const minutes = Math.floor(leave2 / (60 * 1000));
  const leave3 = leave2 % (60 * 1000);
  const seconds = Math.round(leave3 / 1000);
  if (days > 0) {
    return `${days} ago`;
  }
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  return `${seconds} seconds ago`;
}