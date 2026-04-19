import { Component, input, output, computed } from '@angular/core';
import { Tweaks } from '../../../../core/tweaks.service';
import { ThemePalette } from '../../../../core/theme';

@Component({
  selector: 'dk-platform-tweaks-panel',
  templateUrl: './tweaks-panel.component.html',
  styleUrl: './tweaks-panel.component.css',
})
export class TweaksPanelComponent {
  visible = input<boolean>(false);
  tweaks = input.required<Tweaks>();
  T = input.required<ThemePalette>();
  tweakChange = output<{ key: keyof Tweaks; value: unknown }>();

  emit(key: string, value: unknown) {
    this.tweakChange.emit({ key: key as keyof Tweaks, value });
  }

  panelStyle = computed(() => ({
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    width: '280px',
    zIndex: '60',
    background: this.T().surface,
    border: `1px solid ${this.T().border}`,
    borderRadius: '10px',
    boxShadow: this.T().bg === '#0F0F11'
      ? '0 16px 32px -8px rgba(0,0,0,.5)'
      : '0 16px 32px -8px rgba(0,0,0,.15)',
    fontFamily: "'Geist','Inter',sans-serif",
  }));

  headerStyle = computed(() => ({
    padding: '10px 14px',
    borderBottom: `1px solid ${this.T().border}`,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }));

  rowStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '8px 0',
    borderTop: `1px solid ${this.T().border}`,
  }));

  labelStyle = computed(() => ({
    fontFamily: "'Geist','Inter',sans-serif",
    fontSize: '12px',
    color: this.T().fg,
  }));

  segWrapStyle = computed(() => ({
    display: 'flex',
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
    borderRadius: '6px',
    padding: '2px',
  }));

  segBtnStyle(active: boolean) {
    return {
      padding: '3px 10px',
      borderRadius: '4px',
      border: '0',
      cursor: 'pointer',
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: '11px',
      background: active ? this.T().surface : 'transparent',
      color: active ? this.T().fg : this.T().fgMuted,
      boxShadow: active ? `0 0 0 1px ${this.T().border}` : 'none',
    };
  }
}
