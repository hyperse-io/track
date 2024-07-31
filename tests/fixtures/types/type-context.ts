export type Context = {
  env: 'prod' | 'uat';
  platform: 'android' | 'ios';
  ip: string;
  userId: string;
};
