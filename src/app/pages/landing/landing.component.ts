import { Component, computed, inject, signal } from '@angular/core';
import { TweaksService } from '../../core/tweaks.service';
import { dkTheme } from '../../core/theme';
import { TOOLS, CAT_ORDER } from '../../core/tools';
import { IconComponent } from '../../shared/icon/icon.component';

const CAT_ICONS: Record<string, string> = {
  Converters: 'arrow-left-right',
  Generators: 'database-zap',
  Security: 'shield-check',
  Text:       'file-text',
  Network:    'globe',
  Time:       'clock',
  Design:     'palette',
};

@Component({
  selector: 'dk-landing',
  imports: [IconComponent],
  template: `
    <div [style]="pageStyle()">

      <!-- Hero -->
      <div [style]="heroStyle()">
        <div [style]="logoStyle()">
          <dk-icon name="square-terminal" [size]="22" />
        </div>
        <h1 [style]="h1Style()">DevKit</h1>
        <p [style]="subtitleStyle()">
          Developer utilities, right in your browser.<br>
          No installs. No telemetry. Just tools.
        </p>
        <button [style]="paletteBtnStyle()" (click)="openPalette()">
          <dk-icon name="search" [size]="14" />
          <span style="flex:1;text-align:left;">Search tools...</span>
          <kbd [style]="kbdStyle()">⌘K</kbd>
        </button>
        <p [style]="statsStyle()">{{ totalTools }} tools &nbsp;·&nbsp; {{ categories.length }} categories</p>
      </div>

      <!-- Category grid -->
      <div [style]="gridStyle()">
        @for (cat of categories; track cat.name) {
          <div
            [style]="cardBaseStyle()"
            [class.card-hover]="true"
          >
            <div style="display:flex;align-items:center;gap:12px;">
              <div [style]="cardIconStyle()">
                <dk-icon [name]="cat.icon" [size]="18" />
              </div>
              <div>
                <div [style]="catNameStyle()">{{ cat.name }}</div>
                <div [style]="catCountStyle()">{{ cat.count }} tools</div>
              </div>
            </div>
            <div [style]="chipRowStyle()">
              @for (t of cat.tools.slice(0, 4); track t.id) {
                <span [style]="chipStyle()">{{ t.name }}</span>
              }
              @if (cat.count > 4) {
                <span [style]="moreChipStyle()">+{{ cat.count - 4 }} more</span>
              }
            </div>
          </div>
        }
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
    .card-hover { transition: border-color 160ms, box-shadow 160ms; }
    .card-hover:hover { box-shadow: 0 0 0 1px var(--brand-color); border-color: var(--brand-color) !important; }
  `],
})
export class LandingComponent {
  private svc = inject(TweaksService);
  T = computed(() => dkTheme(this.svc.tweaks().theme));

  readonly totalTools = TOOLS.length;
  readonly categories = CAT_ORDER.map(name => ({
    name,
    icon: CAT_ICONS[name],
    tools: TOOLS.filter(t => t.cat === name),
    count: TOOLS.filter(t => t.cat === name).length,
  }));

  openPalette() { this.svc.paletteOpen.set(true); }

  pageStyle = computed(() => ({
    padding: '48px 40px 64px',
    maxWidth: '1000px',
    margin: '0 auto',
    boxSizing: 'border-box',
    '--brand-color': this.T().brand,
  } as Record<string, string>));

  heroStyle = computed(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: '52px',
  } as Record<string, string>));

  logoStyle = computed(() => ({
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: this.T().brandBg,
    color: this.T().brand,
    border: `1px solid ${this.T().border}`,
    marginBottom: '22px',
    flexShrink: '0',
  } as Record<string, string>));

  h1Style = computed(() => ({
    fontFamily: "'Geist','Inter',sans-serif",
    fontSize: '42px',
    fontWeight: '700',
    letterSpacing: '-0.035em',
    color: this.T().fg,
    margin: '0 0 14px',
    lineHeight: '1.1',
  } as Record<string, string>));

  subtitleStyle = computed(() => ({
    fontFamily: "'Geist','Inter',sans-serif",
    fontSize: '16px',
    color: this.T().fgMuted,
    lineHeight: '1.65',
    margin: '0 0 32px',
    maxWidth: '380px',
  } as Record<string, string>));

  paletteBtnStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '360px',
    padding: '10px 14px',
    borderRadius: '8px',
    border: `1px solid ${this.T().borderInput}`,
    background: this.T().inputBg,
    color: this.T().fgMuted,
    fontSize: '14px',
    fontFamily: "'Geist','Inter',sans-serif",
    cursor: 'pointer',
    marginBottom: '20px',
    outline: 'none',
    transition: 'border-color 160ms',
  } as Record<string, string>));

  kbdStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    padding: '2px 6px',
    borderRadius: '4px',
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
    color: this.T().fgSubtle,
    lineHeight: '1.6',
  } as Record<string, string>));

  statsStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '12px',
    color: this.T().fgSubtle,
    letterSpacing: '0.04em',
  } as Record<string, string>));

  gridStyle = computed(() => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '12px',
  } as Record<string, string>));

  cardBaseStyle = computed(() => ({
    padding: '20px',
    borderRadius: '10px',
    border: `1px solid ${this.T().border}`,
    background: this.T().surface,
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    cursor: 'default',
  } as Record<string, string>));

  cardIconStyle = computed(() => ({
    width: '38px',
    height: '38px',
    borderRadius: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: this.T().brandBg,
    color: this.T().brand,
    flexShrink: '0',
  } as Record<string, string>));

  catNameStyle = computed(() => ({
    fontFamily: "'Geist','Inter',sans-serif",
    fontSize: '15px',
    fontWeight: '600',
    color: this.T().fg,
    marginBottom: '2px',
  } as Record<string, string>));

  catCountStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    color: this.T().fgSubtle,
  } as Record<string, string>));

  chipRowStyle = computed(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  } as Record<string, string>));

  chipStyle = computed(() => ({
    fontFamily: "'Geist','Inter',sans-serif",
    fontSize: '12px',
    padding: '3px 9px',
    borderRadius: '4px',
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
    color: this.T().fgMuted,
    whiteSpace: 'nowrap',
  } as Record<string, string>));

  moreChipStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    padding: '3px 9px',
    borderRadius: '4px',
    color: this.T().fgSubtle,
    alignSelf: 'center',
  } as Record<string, string>));
}
