import { Component, input, computed } from '@angular/core';
import { Tool } from '../../core/tools';
import { ThemePalette } from '../../core/theme';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'dk-platform-workspace',
  imports: [IconComponent],
  template: `
    <main id="tool-root" [style]="mainStyle()">
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:32px;box-sizing:border-box;">
        <div [style]="cardStyle()">
          <div [style]="iconWrapStyle()">
            <dk-icon [name]="tool() ? tool()!.ic : 'square-terminal'" [size]="22" [strokeWidth]="1.5" />
          </div>
          <div [style]="eyebrowStyle()">{{ tool() ? tool()!.cat : 'Workspace' }}</div>
          <div [style]="titleStyle()">{{ tool() ? tool()!.name : 'Select a tool to begin' }}</div>
          <div [style]="bodyStyle()">
            @if (tool()) {
              This is where <code [style]="codeStyle()">#tool-root</code> mounts.
              Load the service for <strong style="font-weight:600;">{{ tool()!.name }}</strong> here.
            } @else {
              Pick any tool from the sidebar, or press
              <kbd [style]="kbdStyle()">⌘K</kbd> to jump.
              The services themselves load into this pane.
            }
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span [style]="hintKbdStyle()">/</span>
            <span [style]="hintLabelStyle()">search</span>
            <span [style]="dotStyle()">·</span>
            <span [style]="hintKbdStyle()">⌘K</span>
            <span [style]="hintLabelStyle()">palette</span>
            <span [style]="dotStyle()">·</span>
            <span [style]="hintKbdStyle()">↑↓</span>
            <span [style]="hintLabelStyle()">navigate</span>
          </div>
        </div>
      </div>
    </main>
  `,
})
export class WorkspaceComponent {
  tool = input<Tool | null>(null);
  T = input.required<ThemePalette>();

  gridColor = computed(() =>
    this.T().bg === '#0F0F11'
      ? 'rgba(255,255,255,0.035)'
      : 'rgba(23,23,26,0.045)'
  );

  mainStyle = computed(() => ({
    flex: '1',
    minWidth: '0',
    minHeight: '0',
    overflow: 'auto',
    position: 'relative',
    background: this.T().bg,
    backgroundImage: `linear-gradient(to right, ${this.gridColor()} 1px, transparent 1px), linear-gradient(to bottom, ${this.gridColor()} 1px, transparent 1px)`,
    backgroundSize: '24px 24px',
  }));

  cardStyle = computed(() => ({
    padding: '32px 36px',
    borderRadius: '10px',
    maxWidth: '560px',
    textAlign: 'left',
    background: this.T().surface,
    border: `1px solid ${this.T().border}`,
    color: this.T().fg,
  }));

  iconWrapStyle = computed(() => ({
    width: '44px',
    height: '44px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px',
    background: this.T().brandBg,
    color: this.T().brand,
    border: `1px solid ${this.T().border}`,
  }));

  eyebrowStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: this.T().fgSubtle,
    marginBottom: '6px',
  }));

  titleStyle = computed(() => ({
    fontFamily: "'Geist','Inter',sans-serif",
    fontSize: '22px',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    color: this.T().fg,
    marginBottom: '8px',
  }));

  bodyStyle = computed(() => ({
    fontFamily: "'Geist','Inter',sans-serif",
    fontSize: '14px',
    color: this.T().fgMuted,
    lineHeight: '1.5',
    maxWidth: '420px',
    marginBottom: '20px',
  }));

  codeStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    color: this.T().fg,
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
    padding: '1px 6px',
    borderRadius: '4px',
    fontSize: '12px',
  }));

  kbdStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    borderRadius: '4px',
    padding: '1px 6px',
    color: this.T().fg,
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
  }));

  hintKbdStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '10px',
    borderRadius: '4px',
    padding: '1px 6px',
    borderBottom: '2px solid',
    color: this.T().fgMuted,
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
  }));

  hintLabelStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    color: this.T().fgSubtle,
  }));

  dotStyle = computed(() => ({
    color: this.T().border,
    margin: '0 6px',
  }));
}
