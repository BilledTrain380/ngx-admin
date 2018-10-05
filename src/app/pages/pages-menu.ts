import {NbMenuItem} from '@nebular/theme';
import {NbAccessChecker} from '@nebular/security';

/*
 * In order to ACL the menu items, we add a object
 * to the data attribute. The object has a property canShow
 * which has the type signature: (accessChecker: NbAccessChecker).
 *
 * This allows ACL for the menu itmes. The page component will
 * change the hidden attribute based on the canShow property.
 */
export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Gruppen',
        icon: 'fa fa-address-book',
        link: '/pages/group/overview',
        home: true,
        data: {
            canShow: (it: NbAccessChecker) => it.isGranted('view', 'groups'),
        },
    },
    {
        title: 'Teilnehmerlisten',
        icon: 'nb-list',
        link: '/pages/classes',
        data: {
            canShow: (it: NbAccessChecker) => it.isGranted('view', 'participant-list'),
        },
    },
    {
        title: 'Leichtathletik',
        icon: 'fas fa fa-trophy',
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
                data: {
                    canShow: (it: NbAccessChecker) => it.isGranted('view', 'event-sheet'),
                },
            },
            {
                title: 'Resultate',
                link: '/pages/athletics/results',
                data: {
                    canShow: (it: NbAccessChecker) => it.isGranted('view', 'results'),
                },
            },
            {
                title: 'Ranglisten',
                link: '/pages/ui-features/modals',
                data: {
                    canShow: (it: NbAccessChecker) => it.isGranted('view', 'ranking'),
                },
            },
        ],
    },
    {
        title: 'Verwaltung',
        icon: 'fa fa-building',
        link: '/pages/management',
        data: {
            canShow: (it: NbAccessChecker) => it.isGranted('view', 'management'),
        },
    },
    {
        title: 'Einstellungen',
        icon: 'nb-gear',
        data: {
            canShow: (it: NbAccessChecker) => it.isGranted('view', 'settings'),
        },
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
