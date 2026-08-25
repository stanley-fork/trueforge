'use client';

import { useContext } from 'react';

import { cn } from '../atoms/lib/cn.js';
import { Icon } from '../icons/Icon.js';
import TrueForgeLogoDark from '../icons/trueforge-logo-dark.svg';
import TrueForgeLogoLight from '../icons/trueforge-logo.svg';
import { ThemeContext } from './ThemeProvider.js';
import type { BrandLogoConfig } from './types.js';

const DEFAULT_BRAND_NAME = 'TrueForge';

/** Mode-matched source, falling back to the other mode then the mode-agnostic `src`. */
function resolveImageSrc({
  image,
  mode,
}: {
  image: string | BrandLogoConfig;
  mode: 'light' | 'dark';
}): string | undefined {
  if (typeof image === 'string') return image;
  const preferred = mode === 'dark' ? image.dark : image.light;
  return preferred ?? image.light ?? image.dark ?? image.src;
}

/** Configured display name, or the SDK default when no custom images are set. */
export function useBrandName(): string | undefined {
  const brand = useContext(ThemeContext)?.brand;
  if (brand?.name != null) return brand.name;
  return brand?.icon == null && brand?.logo == null ? DEFAULT_BRAND_NAME : undefined;
}

/**
 * The product mark resolved against the active theme mode. Compact surfaces use
 * `icon`; expanded surfaces use `logo` and fall back to `icon`.
 */
export function BrandLogo({ className, variant = 'icon' }: { className?: string; variant?: 'icon' | 'logo' }) {
  const theme = useContext(ThemeContext);
  const brand = theme?.brand;
  const name = useBrandName();
  const mode = theme?.mode ?? 'light';
  const preferredImage = variant === 'logo' ? brand?.logo : brand?.icon;
  const preferredSrc = preferredImage == null ? undefined : resolveImageSrc({ image: preferredImage, mode });
  const icon = brand?.icon;
  const src = preferredSrc ?? (variant === 'logo' && icon != null ? resolveImageSrc({ image: icon, mode }) : undefined);

  if (src == null) {
    if (variant === 'logo') {
      const Wordmark = mode === 'dark' ? TrueForgeLogoDark : TrueForgeLogoLight;
      // svgr pins width/height to 1em; clearing both lets the viewBox aspect
      // ratio widen the wordmark to match the caller's height.
      return (
        <Wordmark
          className={cn('w-auto', className)}
          width={undefined}
          height={undefined}
          role="img"
          aria-label={name ?? DEFAULT_BRAND_NAME}
        />
      );
    }
    return (
      <Icon name={mode === 'dark' ? 'trueforge-logomark-dark' : 'trueforge-logomark-light'} className={className} />
    );
  }

  const image = <img src={src} alt={name ?? ''} className={className} />;
  const href = brand?.href;
  if (href == null) return image;

  return (
    <a href={href} aria-label={name} className="inline-flex items-center">
      {image}
    </a>
  );
}

declare module './SlotsProvider.js' {
  interface AtomSlots {
    BrandLogo: typeof BrandLogo;
  }
}
