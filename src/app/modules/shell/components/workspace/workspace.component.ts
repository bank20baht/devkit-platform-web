import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TweaksService } from '../../../../core/tweaks.service';
import { dkTheme } from '../../../../core/theme';

@Component({
  selector: 'dk-platform-workspace',
  imports: [RouterOutlet],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
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
