import { Component, computed, signal, HostListener, inject } from '@angular/core';
import { TweaksService, Tweaks } from '../../core/tweaks.service';
import { dkTheme } from '../../core/theme';
import { TOOLS, CAT_ORDER } from '../../core/tools';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { PaletteComponent } from './components/palette/palette.component';
import { TweaksPanelComponent } from './components/tweaks-panel/tweaks-panel.component';

@Component({
  selector: 'dk-platform-shell',
  imports: [SidebarComponent, TopbarComponent, WorkspaceComponent, PaletteComponent, TweaksPanelComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent {
  svc = inject(TweaksService);
  tweaksVisible = signal(false);

  readonly allTools = TOOLS;
  readonly catOrder = CAT_ORDER;

  tweaks = this.svc.tweaks;
  T = computed(() => dkTheme(this.svc.tweaks().theme));
  activeTool = computed(() => this.svc.getActiveTool());

  rootStyle = computed(() => ({
    display: 'flex',
    height: '100%',
    width: '100%',
    background: this.T().bg,
    color: this.T().fg,
    fontFamily: "'Geist','Inter',sans-serif",
  }));

  toggleTheme() {
    this.svc.setTweak('theme', this.tweaks().theme === 'dark' ? 'light' : 'dark');
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKey(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.svc.paletteOpen.update(o => !o);
    }
  }
}
