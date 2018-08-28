import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Gruppen',
    icon: 'fa fa-university',
    link: '/pages/group/overview',
  },
  {
    title: 'Teilnehmerlisten',
    icon: 'nb-list',
    link: '/pages/classes',
  },
  {
    title: 'Leichtathletik',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Starliste',
        link: '/pages/ui-features/buttons',
      },
      {
        title: 'Wettkampfblätter',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Resultate',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Ranglisten',
        link: '/pages/ui-features/modals',
      },
    ],
  },
  {
    title: 'Verwaltung',
    icon: 'users-class',
    link: '/pages/classes',
  },
  {
    title: 'Einstellungen',
    icon: 'nb-compose',
    children: [
      {
        title: 'Benutzer',
        link: '/pages/forms/inputs',
      },
      {
        title: 'PETs',
        link: '/pages/forms/layouts',
      },
    ],
  },
];
