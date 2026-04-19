import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TweaksService } from '../../core/tweaks.service';
import { dkTheme } from '../../core/theme';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'dk-not-found',
  imports: [IconComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  private svc = inject(TweaksService);
  private router = inject(Router);
  private T = computed(() => dkTheme(this.svc.tweaks().theme));

  readonly currentPath = this.router.url;

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

  codeStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '48px',
    fontWeight: '700',
    letterSpacing: '-0.04em',
    color: this.T().fgSubtle,
    lineHeight: '1',
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
  }));

  pathStyle = computed(() => ({
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: '12px',
    color: this.T().fg,
    background: this.T().bg,
    padding: '1px 6px',
    borderRadius: '4px',
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
