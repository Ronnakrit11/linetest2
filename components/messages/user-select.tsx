'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineUser } from '@/lib/types/line';
import { LineUserManager } from '@/lib/store/line-users';

interface UserSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function UserSelect({ value, onChange, disabled }: UserSelectProps) {
  const [users, setUsers] = useState<LineUser[]>([]);

  useEffect(() => {
    setUsers(LineUserManager.getUsers());
  }, []);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.userId} value={user.userId}>
            {user.displayName || user.userId}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}