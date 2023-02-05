export type RequestStatus = 'pending' | 'success' | 'error';

export type ContactNotification = {
  status: RequestStatus;
  title: string;
  message: string;
};
