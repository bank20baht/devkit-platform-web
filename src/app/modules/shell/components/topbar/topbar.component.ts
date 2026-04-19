import { Component, input, output, computed } from '@angular/core';
import { Tool } from '../../../../core/tools';
import { ThemePalette } from '../../../../core/theme';
import { IconComponent } from '../../../../shared/icon/icon.component';

@Component({
  selector: 'dk-platform-topbar',
  imports: [IconComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  tool = input<Tool | null>(null);
  T = input.required<ThemePalette>();
  theme = input<'light' | 'dark'>('light');
  themeToggle = output<void>();
  openPalette = output<void>();

  wrapStyle = computed(() => ({
    height: '48px',
    flexShrink: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    background: this.T().surface,
    borderBottom: `1px solid ${this.T().border}`,
  }));

  paletteBtnStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 8px 4px 10px',
    borderRadius: '6px',
    fontFamily: "'Geist','Inter',sans-serif",
    fontSize: '12px',
    cursor: 'pointer',
    color: this.T().fgMuted,
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
  }));

  kbdStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    color: this.T().fgMuted,
    background: this.T().surface,
    border: `1px solid ${this.T().border}`,
    borderBottomWidth: '2px',
    borderRadius: '4px',
    padding: '0 5px',
    marginLeft: '4px',
  }));

  pillStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    padding: '3px 9px',
    borderRadius: '999px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    color: this.T().brandStrong,
    background: this.T().brandBg,
  }));

  iconBtnStyle = computed(() => ({
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: this.T().fgMuted,
    border: `1px solid ${this.T().border}`,
    background: this.T().surface,
  }));

  avatarStyle = computed(() => ({
    width: '28px',
    height: '28px',
    borderRadius: '999px',
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: this.theme() === 'dark' ? '#E6E6DF' : '#17171A',
    color: this.theme() === 'dark' ? '#17171A' : '#4DD585',
  }));
}
