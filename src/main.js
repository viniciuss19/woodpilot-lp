import './styles.css';
import { absoluteUrl, erpPath, resolveCtaHref } from './config.js';

const CTA_LABEL = 'Quero conhecer o WoodPilot';

function wireErpLinks() {
  document.querySelectorAll('[data-erp]').forEach((el) => {
    const path = el.getAttribute('data-erp') || '/login';
    el.setAttribute('href', erpPath(path));
  });
}

function wireCtaLinks() {
  const cta = resolveCtaHref();
  document.querySelectorAll('[data-cta]').forEach((el) => {
    el.setAttribute('href', cta.href);
    if (cta.external) {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else {
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  });
}

function wireYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}

function wireMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    const openIcon = toggle.querySelector('[data-icon-open]');
    const closeIcon = toggle.querySelector('[data-icon-close]');
    if (openIcon) openIcon.hidden = open;
    if (closeIcon) closeIcon.hidden = !open;
  };

  setOpen(false);
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });
}

function wireReveal() {
  const nodes = document.querySelectorAll('[data-reveal]');
  if (!nodes.length) return;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced || typeof IntersectionObserver === 'undefined') {
    nodes.forEach((n) => n.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );

  nodes.forEach((node) => {
    node.classList.add('wp-reveal--armed');
    const delay = node.getAttribute('data-reveal-delay');
    if (delay) node.style.transitionDelay = `${delay}ms`;
    observer.observe(node);
  });
}

function wireSeoImage() {
  const og = document.querySelector('meta[property="og:image"]');
  const tw = document.querySelector('meta[name="twitter:image"]');
  const abs = absoluteUrl('/assets/painel.png');
  if (og) og.setAttribute('content', abs);
  if (tw) tw.setAttribute('content', abs);
}

wireErpLinks();
wireCtaLinks();
wireYear();
wireMobileMenu();
wireReveal();
wireSeoImage();

document.title = 'WoodPilot — Sistema de gestão para madeireiras';
void CTA_LABEL;
