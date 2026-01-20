export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const getToday = () => formatDate(new Date());

export const isToday = (dateString) => dateString === getToday();

export const getThisWeekRange = () => {
  const today = new Date();
  const day = today.getDay();
  const start = new Date(today);
  start.setDate(today.getDate() - day);
  const end = new Date(today);
  end.setDate(today.getDate() + (6 - day));
  return { start: formatDate(start), end: formatDate(end) };
};

export const isThisWeek = (dateString) => {
  if (!dateString) return false;
  const { start, end } = getThisWeekRange();
  return dateString >= start && dateString <= end;
};

export const isAfterThisWeek = (dateString) => {
  if (!dateString) return true;
  const { end } = getThisWeekRange();
  return dateString > end;
};

export const formatDateKorean = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatTimeKorean = (timeString) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? '오후' : '오전';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${period} ${displayHour}:${minutes}`;
};

export const formatDateTime = (dateString, timeString) => {
  const datePart = formatDateKorean(dateString);
  const timePart = timeString ? ` ${formatTimeKorean(timeString)}` : '';
  return datePart + timePart;
};

export const getDayOfWeekKorean = (dateString) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return dateString ? days[new Date(dateString).getDay()] : '';
};
