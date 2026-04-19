import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { ShellComponent } from './modules/shell/shell.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { FallbackComponent } from './components/fallback/fallback.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const fallbackRoutes: Routes = [
  { path: '', component: FallbackComponent },
];

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: LandingPageComponent },
      {
        path: 'diff-checker',
        loadChildren: () =>
          loadRemoteModule('devkit-diff-checker-web', './dk-diff-checker-routes')
            .then((m) => m.routes)
            .catch((error) => {
              console.error('Error loading remote module: devkit-diff-checker-web', error);
              return fallbackRoutes;
            }),
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
