const pad = (value: number) => String(value).padStart(2, "0");

export function getTodayIsoDate(): string {
  const today = new Date();

  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}
