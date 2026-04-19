import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TweaksService } from '../../core/tweaks.service';
import { dkTheme } from '../../core/theme';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'dk-fallback',
  imports: [IconComponent],
  templateUrl: './fallback.component.html',
  styleUrl: './fallback.component.css',
})
export class FallbackComponent {
  private svc = inject(TweaksService);
  private router = inject(Router);
  private T = computed(() => dkTheme(this.svc.tweaks().theme));

  goHome() {
    this.router.navigate(['/']);
  }

  pageStyle = computed(() => ({
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    background: this.T().bg,
    fontFamily: "'Geist','Inter',sans-serif",
  }));

  cardStyle = computed(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '40px 48px',
    borderRadius: '12px',
    border: `1px solid ${this.T().border}`,
    background: this.T().surface,
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  }));

  iconWrapStyle = computed(() => ({
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: this.T().fgMuted,
    marginBottom: '4px',
  }));

  titleStyle = computed(() => ({
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    color: this.T().fg,
    letterSpacing: '-0.01em',
  }));

  descStyle = computed(() => ({
    margin: '0',
    fontSize: '13px',
    color: this.T().fgMuted,
    lineHeight: '1.6',
    maxWidth: '280px',
  }));

  metaStyle = computed(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '999px',
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '11px',
    color: this.T().fgSubtle,
    background: this.T().bg,
    border: `1px solid ${this.T().border}`,
  }));

  btnStyle = computed(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: `1px solid ${this.T().border}`,
    background: this.T().bg,
    color: this.T().fg,
    fontSize: '13px',
    fontFamily: "'Geist','Inter',sans-serif",
    cursor: 'pointer',
    transition: 'background 100ms',
  }));
}
