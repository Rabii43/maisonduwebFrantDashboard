import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Dashboard',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboards',
  },
  {
    navCap: 'Pages',
  },
  {
    displayName: 'Users',
    iconName: 'users',
    bgcolor: 'warning',
    route: 'users',
  },
  {
    displayName: 'Setting widgets',
    iconName: 'settings',
    bgcolor: 'primary',
    route: 'setting-widgets',
  },
];
