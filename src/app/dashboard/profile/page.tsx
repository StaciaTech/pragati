'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MOCK_INNOVATOR_USER, MOCK_TTCS, MOCK_PRINCIPAL_USERS } from '@/lib/mock-data';
import { ROLES, type Role } from '@/lib/constants';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') as Role) || ROLES.INNOVATOR;

  let user: any = {};

  // Mock fetching user data based on role
  switch (role) {
    case ROLES.INNOVATOR:
      user = MOCK_INNOVATOR_USER;
      break;
    case ROLES.COORDINATOR:
      user = MOCK_TTCS[0];
      break;
    case ROLES.PRINCIPAL:
      user = MOCK_PRINCIPAL_USERS[0];
      break;
    case ROLES.SUPER_ADMIN:
      user = { name: 'Super Admin', email: 'admin@pragati.ai', role: 'Super Admin' };
      break;
    default:
      user = { name: 'Guest', email: 'guest@pragati.ai', role: 'Guest' };
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p>{user.name}</p>
        </div>
        <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p>{user.email}</p>
        </div>
         <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Role</p>
            <p>{user.role || role}</p>
        </div>
        {user.college && (
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">College</p>
                <p>{user.college}</p>
            </div>
        )}
        {user.credits !== undefined && (
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Credits</p>
                <p>{user.credits}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}