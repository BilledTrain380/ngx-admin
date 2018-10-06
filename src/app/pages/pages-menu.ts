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
        title: 'Groups',
        icon: 'fa fa-address-book',
        link: '/pages/group/overview',
        home: true,
        data: {
            canShow: (it: NbAccessChecker) => it.isGranted('view', 'groups'),
            translation: 'page.groups',
        },
    },
    {
        title: 'Paritcipantlist',
        icon: 'nb-list',
        link: '/pages/classes',
        data: {
            canShow: (it: NbAccessChecker) => it.isGranted('view', 'participant-list'),
            translation: 'page.participantList',
        },
    },
    {
        title: 'Athletics',
        icon: 'fas fa fa-trophy',
        link: '/pages/athletics',
        data: {
            translation: 'page.athletics',
        },
        children: [
            // Will not be available until report generation is refactored.
            // {
            //     title: 'Startliste',
            //     link: '/pages/ui-features/buttons',
            // },
            {
                title: 'Event Sheets',
                link: '/pages/ui-features/grid',
                data: {
                    canShow: (it: NbAccessChecker) => it.isGranted('view', 'event-sheet'),
                    translation: 'page.eventSheets',
                },
            },
            {
                title: 'Results',
                link: '/pages/athletics/results',
                data: {
                    canShow: (it: NbAccessChecker) => it.isGranted('view', 'results'),
                    translation: 'page.results',
                },
            },
            {
                title: 'Ranking',
                link: '/pages/ui-features/modals',
                data: {
                    canShow: (it: NbAccessChecker) => it.isGranted('view', 'ranking'),
                    translation: 'page.ranking',
                },
            },
        ],
    },
    {
        title: 'Management',
        icon: 'fa fa-building',
        link: '/pages/management',
        data: {
            canShow: (it: NbAccessChecker) => it.isGranted('view', 'management'),
            translation: 'page.management',
        },
    },
    {
        title: 'Settings',
        icon: 'nb-gear',
        data: {
            canShow: (it: NbAccessChecker) => it.isGranted('view', 'settings'),
        },
        children: [
            {
                title: 'Users',
                link: '/pages/forms/inputs',
            },
        ],
    },
];
