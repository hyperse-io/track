export type InputOption = {
  level?: 'info' | 'warn' | 'error';
  message?: string;
  page?: string;
  event?: string;
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  eventValue?: string;
  reportTime?: number;
};
