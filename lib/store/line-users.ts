import { LineUser, LineUserStore } from '../types/line';

class LineUserManager {
  private static readonly STORAGE_KEY = 'line_users';

  static getUsers(): LineUser[] {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    
    try {
      const data: LineUserStore = JSON.parse(stored);
      return data.users;
    } catch {
      return [];
    }
  }

  static addUser(userId: string, displayName?: string): void {
    if (typeof window === 'undefined') return;
    
    const users = this.getUsers();
    if (!users.some(user => user.userId === userId)) {
      users.push({
        userId,
        displayName,
        timestamp: Date.now()
      });
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ users }));
    }
  }

  static removeUser(userId: string): void {
    if (typeof window === 'undefined') return;
    
    const users = this.getUsers().filter(user => user.userId !== userId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ users }));
  }
}

export { LineUserManager };