export interface LineUser {
  userId: string;
  displayName?: string;
  timestamp: number;
}

export interface LineUserStore {
  users: LineUser[];
}