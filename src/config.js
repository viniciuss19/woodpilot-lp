/** URLs e canais comerciais. Ajuste via .env (veja .env.example). */

const trimSlash = (value) => (value || '').replace(/\/+$/, '');

export const config = {
  erpUrl: trimSlash(import.meta.env.VITE_ERP_URL || 'http://localhost:4200'),
  siteUrl: trimSlash(import.meta.env.VITE_SITE_URL || ''),
  supportWhatsApp: import.meta.env.VITE_SUPPORT_WHATSAPP || '',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || '',
};

const CTA_MESSAGE = 'Olá! Quero conhecer o WoodPilot para a minha madeireira.';

export function erpPath(path) {
  return `${config.erpUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function resolveCtaHref() {
  const digits = (config.supportWhatsApp || '').replace(/\D/g, '');
  if (digits) {
    const phone = digits.length === 10 || digits.length === 11 ? `55${digits}` : digits;
    return {
      href: `https://wa.me/${phone}?text=${encodeURIComponent(CTA_MESSAGE)}`,
      external: true,
    };
  }
  if (config.supportEmail) {
    return {
      href: `mailto:${config.supportEmail}?subject=${encodeURIComponent(
        'Quero conhecer o WoodPilot',
      )}&body=${encodeURIComponent(CTA_MESSAGE)}`,
      external: false,
    };
  }
  return { href: erpPath('/register'), external: false };
}

export function absoluteUrl(path) {
  if (config.siteUrl) {
    return `${config.siteUrl}${path}`;
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  return path;
}
