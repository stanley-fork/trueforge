import type { LucideIcon } from 'lucide-react';
import type { ComponentType, CSSProperties, FC, ReactNode, SVGProps } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemePreset = 'trueforge' | 'claude' | 'chatgpt' | 'gemini';

export type SemanticTokens = {
  // Across product
  sidebarBg: string;
  topbarBg: string;
  primaryBg: string;
  secondaryBg: string;
  border: string;
  fontFamily: string;
  // Building blocks
  inputBoxBg: string;
  inputBorder: string;
  textPrimary: string;
  textSecondary: string;
  cardBg: string;
  dropdownSelectedItemBg: string;
  dropdownSelectedItemText: string;
  // Chat
  userMessageBg: string;
  userMessageText: string;
  assistantMessageBg: string;
  assistantMessageText: string;
  // Buttons
  primaryButtonBg: string;
  primaryButtonHover: string;
  primaryButtonText: string;
  secondaryButtonBg: string;
  secondaryButtonHover: string;
  secondaryButtonText: string;
  ghostButtonBg: string;
  ghostButtonHover: string;
  ghostButtonText: string;
  // Status
  successBg: string;
  successText: string;
  failureBg: string;
  failureText: string;
  warningBg: string;
  warningText: string;
  // Kept internals
  focusRing: string;
  radius: string;
  composerRadius: string;
  overlay: string;
  shadowColor: string;
  scrollbarThumb: string;
};

export type IconProps = {
  className?: string;
  style?: CSSProperties;
  size?: string | number;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-label'?: string;
  'data-testid'?: string;
};

export type IconComponent = LucideIcon | ((props: IconProps) => ReactNode) | FC<SVGProps<SVGSVGElement>>;

export type IconEntry = IconComponent | ReactNode;

export type IconMap = Record<string, IconEntry>;

/**
 * Brand image sources. `light` / `dark` pick per resolved theme mode and fall
 * back to each other, then to `src`.
 */
export type BrandLogoConfig = {
  src?: string;
  light?: string;
  dark?: string;
};

export type BrandImage = string | BrandLogoConfig;

/**
 * Product branding. `icon` is the square mark used in compact surfaces. `logo`
 * is an optional wider mark used in expanded chrome and falls back to `icon`.
 */
type BrandMetadata = {
  /** Optional display name and accessible label. Omit for icon-only branding. */
  name?: string;
  /** Wraps configured brand images in a same-tab link. */
  href?: string;
};

export type BrandConfig = BrandMetadata &
  (
    | {
        /** Square image URL, or per-mode sources. Omit to keep the default mark. */
        icon?: BrandImage;
        logo?: never;
      }
    | {
        /** Square image URL, or per-mode sources, used when compact. */
        icon: BrandImage;
        /** Wider image URL, or per-mode sources, used when expanded. */
        logo: BrandImage;
      }
  );

export type ContentClassNames = {
  markdown?: string;
  inlineCode?: string;
  syntaxHighlighter?: {
    root?: string;
    pre?: string;
    code?: string;
    lineNumber?: string;
  };
  openui?: {
    root?: string;
    scope?: string;
  };
  monaco?: {
    root?: string;
    editor?: string;
    monacoTheme?: string;
  };
};

export type ThemeConfig = {
  preset?: ThemePreset;
  mode?: ThemeMode;
  tokens?: Partial<SemanticTokens>;
  brand?: BrandConfig;
  className?: string;
  icons?: IconMap;
  classNames?: ContentClassNames;
};

export type BuiltInLayout = 'sidebar' | 'drawer' | 'dock' | 'widget';

export type LayoutProp = BuiltInLayout | ComponentType<{ className?: string }>;

/** camelCase SemanticTokens key → CSS custom property name */
export const TOKEN_CSS_VARS: Record<keyof SemanticTokens, string> = {
  sidebarBg: '--sidebar-bg',
  topbarBg: '--topbar-bg',
  primaryBg: '--primary-bg',
  secondaryBg: '--secondary-bg',
  border: '--border',
  fontFamily: '--font-agent-ui',
  inputBoxBg: '--input-box-bg',
  inputBorder: '--input-border',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  cardBg: '--card-bg',
  dropdownSelectedItemBg: '--dropdown-selected-item-bg',
  dropdownSelectedItemText: '--dropdown-selected-item-text',
  userMessageBg: '--user-message-bg',
  userMessageText: '--user-message-text',
  assistantMessageBg: '--assistant-message-bg',
  assistantMessageText: '--assistant-message-text',
  primaryButtonBg: '--primary-button-bg',
  primaryButtonHover: '--primary-button-hover',
  primaryButtonText: '--primary-button-text',
  secondaryButtonBg: '--secondary-button-bg',
  secondaryButtonHover: '--secondary-button-hover',
  secondaryButtonText: '--secondary-button-text',
  ghostButtonBg: '--ghost-button-bg',
  ghostButtonHover: '--ghost-button-hover',
  ghostButtonText: '--ghost-button-text',
  successBg: '--success-bg',
  successText: '--success-text',
  failureBg: '--failure-bg',
  failureText: '--failure-text',
  warningBg: '--warning-bg',
  warningText: '--warning-text',
  focusRing: '--focus-ring',
  radius: '--radius',
  composerRadius: '--composer-radius',
  overlay: '--overlay',
  shadowColor: '--shadow-color',
  scrollbarThumb: '--scrollbar-thumb',
};
