import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbRouteTabsetModule,
    NbSearchModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbContextMenuModule, NbBadgeModule,
} from '@nebular/theme';

import {NbSecurityModule} from '@nebular/security';

import {
    FooterComponent,
    HeaderComponent,
    SearchInputComponent,
    ThemeSettingsComponent,
    SwitcherComponent,
    LayoutDirectionSwitcherComponent,
    ThemeSwitcherComponent,
    TinyMCEComponent,
    ThemeSwitcherListComponent,
} from './components';
import {CapitalizePipe, PluralPipe, RoundPipe, TimingPipe} from './pipes';
import {
    OneColumnLayoutComponent,
    SampleLayoutComponent,
    ThreeColumnsLayoutComponent,
    TwoColumnsLayoutComponent,
} from './layouts';
import {DEFAULT_THEME} from './styles/theme.default';
import {COSMIC_THEME} from './styles/theme.cosmic';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {PageTitleComponent} from './page-title/page-title.component';
import {UserModule} from '../modules/user/user.module';
import { CardActionsComponent } from './components/card-actions/card-actions.component';
import {TranslateModule} from '@ngx-translate/core';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, UserModule, TranslateModule];

const NB_MODULES = [
    NbBadgeModule,
    NbCardModule,
    NbLayoutModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbContextMenuModule,
    NgbModule,
    NbSecurityModule, // *nbIsGranted directive
];

const COMPONENTS = [
    SwitcherComponent,
    LayoutDirectionSwitcherComponent,
    ThemeSwitcherComponent,
    ThemeSwitcherListComponent,
    HeaderComponent,
    FooterComponent,
    SearchInputComponent,
    ThemeSettingsComponent,
    TinyMCEComponent,
    OneColumnLayoutComponent,
    SampleLayoutComponent,
    ThreeColumnsLayoutComponent,
    TwoColumnsLayoutComponent,
    PageTitleComponent,
    CardActionsComponent,
];

const ENTRY_COMPONENTS = [
    ThemeSwitcherListComponent,
];

const PIPES = [
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
];

const NB_THEME_PROVIDERS = [
    ...NbThemeModule.forRoot(
        {
            name: 'corporate',
        },
        [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME],
    ).providers,
    ...NbSidebarModule.forRoot().providers,
    ...NbMenuModule.forRoot().providers,
];

@NgModule({
    imports: [...BASE_MODULES, ...NB_MODULES],
    exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
    declarations: [...COMPONENTS, ...PIPES],
    entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ThemeModule,
            providers: [...NB_THEME_PROVIDERS],
        };
    }
}
