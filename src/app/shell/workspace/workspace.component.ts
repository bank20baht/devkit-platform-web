import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TweaksService } from '../../core/tweaks.service';
import { dkTheme } from '../../core/theme';

@Component({
  selector: 'dk-platform-workspace',
  imports: [RouterOutlet],
  template: `<main [style]="mainStyle()"><router-outlet /></main>`,
  styles: [`:host { display: flex; flex: 1; min-height: 0; overflow: hidden; }`],
})
export class WorkspaceComponent {
  private svc = inject(TweaksService);
  private T = computed(() => dkTheme(this.svc.tweaks().theme));

  mainStyle = computed(() => ({
    flex: '1',
    overflow: 'auto',
    position: 'relative',
    background: this.T().bg,
  }));
}
