import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Access Control'
  },
  {
    name: 'Users Manamgent',
    url: '/admin/users',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Customers Manamgent',
    url: '/admin/customers/list',
    iconComponent: { name: 'cil-drop' }
  },
];
