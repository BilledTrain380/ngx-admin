import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Gruppen',
        icon: 'fa fa-university',
        link: '/pages/group/overview',
        home: true,
    },
    {
        title: 'Teilnehmerlisten',
        icon: 'nb-list',
        link: '/pages/classes',
    },
    {
        title: 'Leichtathletik',
        icon: 'nb-keypad',
        link: '/pages/athletics',
        children: [
            // Will not be available until report generation is refactored.
            // {
            //     title: 'Startliste',
            //     link: '/pages/ui-features/buttons',
            // },
            {
                title: 'Wettkampfblätter',
                link: '/pages/ui-features/grid',
            },
            {
                title: 'Resultate',
                link: '/pages/athletics/results',
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
        link: '/pages/management',
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
