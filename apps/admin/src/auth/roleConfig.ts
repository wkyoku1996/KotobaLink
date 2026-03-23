export type AppRole = 'super_admin' | 'ops_admin' | 'teacher';

export function getDefaultRouteForRole(role: string) {
  switch (role as AppRole) {
    case 'teacher':
      return '/workspace';
    case 'ops_admin':
      return '/workspace';
    case 'super_admin':
      return '/';
    default:
      return '/';
  }
}
