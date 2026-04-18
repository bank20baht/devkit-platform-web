import { Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule('devkit-diff-checker-web', './dk-diff-checker-routes').then(
            (m) => m.routes,
          ),
      },
    ],
  },
];
