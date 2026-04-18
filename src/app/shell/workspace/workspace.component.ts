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

  private gridColor = computed(() =>
    this.T().bg === '#0F0F11' ? 'rgba(255,255,255,0.035)' : 'rgba(23,23,26,0.045)',
  );

  mainStyle = computed(() => ({
    flex: '1',
    overflow: 'auto',
    position: 'relative',
    background: this.T().bg,
    backgroundImage: `linear-gradient(to right, ${this.gridColor()} 1px, transparent 1px), linear-gradient(to bottom, ${this.gridColor()} 1px, transparent 1px)`,
    backgroundSize: '24px 24px',
  }));
}
