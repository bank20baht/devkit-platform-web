import { Component, computed, signal, HostListener, inject } from '@angular/core';
import { TweaksService, Tweaks } from '../core/tweaks.service';
import { dkTheme } from '../core/theme';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { PaletteComponent } from './palette/palette.component';
import { TweaksPanelComponent } from './tweaks-panel/tweaks-panel.component';

@Component({
  selector: 'dk-platform-shell',
  imports: [SidebarComponent, TopbarComponent, WorkspaceComponent, PaletteComponent, TweaksPanelComponent],
  template: `
    <div [style]="rootStyle()" [attr.data-theme]="tweaks().theme">
      <dk-platform-sidebar
        [activeId]="svc.activeTool()"
        [collapsed]="svc.sidebarCollapsed()"
        [density]="tweaks().density"
        [showDesc]="tweaks().showDesc"
        [grouped]="tweaks().grouped"
        [showRecent]="tweaks().showRecent"
        [recent]="svc.recentTools()"
        [T]="T()"
        (toolPick)="svc.pickTool($event)"
        (toggleCollapse)="svc.sidebarCollapsed.update(v => !v)"
      />
      <div style="flex:1;display:flex;flex-direction:column;min-width:0;">
        <dk-platform-topbar
          [tool]="activeTool()"
          [T]="T()"
          [theme]="tweaks().theme"
          (themeToggle)="toggleTheme()"
          (openPalette)="paletteOpen.set(true)"
        />
        <dk-platform-workspace
          [tool]="activeTool()"
          [T]="T()"
        />
      </div>
      <dk-platform-palette
        [open]="paletteOpen()"
        [T]="T()"
        [recent]="svc.recentTools()"
        (closed)="paletteOpen.set(false)"
        (toolPick)="svc.pickTool($event)"
      />
      <dk-platform-tweaks-panel
        [visible]="tweaksVisible()"
        [tweaks]="tweaks()"
        [T]="T()"
        (tweakChange)="svc.setTweak($event.key, $any($event.value))"
      />
    </div>
  `,
  styles: [`:host { display: flex; height: 100%; }`],
})
export class ShellComponent {
  svc = inject(TweaksService);
  paletteOpen = signal(false);
  tweaksVisible = signal(false);

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
      this.paletteOpen.update(o => !o);
    }
  }
}
