/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
    production: true,
    host: window.location.origin,
    baseHref: '/app',
    passwordPolicy: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).[\\S]{8,64}$',
};
