import { Routes } from '@angular/router';
import { ShellComponent } from './modules/shell/shell.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: LandingPageComponent },
      {
        path: 'diff-checker',
        loadChildren: () =>
          loadRemoteModule('devkit-diff-checker-web', './dk-diff-checker-routes').then(
            (m) => m.routes,
          ),
      },
    ],
  },
];
