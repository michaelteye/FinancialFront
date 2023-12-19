export interface streakData {
  status: boolean;
  fullDate: string;
}
export interface streakValues {
  Monday?: streakData;
  Tuesday?: streakData;
  Wednesday?: streakData;
  Thursday?: streakData;
  Friday?: streakData;
  Saturday?: streakData;
  Sunday?: streakData;
}

export interface NotificationsData {
  createdAt: string;
  id: string;
  isRead: boolean;
  message: string;
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
}
