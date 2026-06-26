import type { ThemeConfig } from 'antd';

// antd's colour engine (tinycolor) derives hover/active shades and expects
// parseable hex/rgb, so the few antd primitives we keep (Modal, Table,
// Pagination, Drawer, Skeleton, Tooltip, Breadcrumb) get hex values matched
// to the OKLCH tokens in tokens.css. Every bespoke component uses the CSS vars
// directly. No pure black or white.

const ink = '#322b25';
const inkMuted = '#6f675f';
const paper = '#f8f5f0';
const surface = '#fdfcfa';
const surfaceSunk = '#f1ece4';
const border = '#e3ddd3';
const borderStrong = '#cbc4b8';
const crimson = '#d23a32';
const crimsonHover = '#b9302a';
const crimsonSoft = '#fbe7e3';

const fontBody =
  '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

// antd 5.4's type defs don't yet include several component tokens we set
// (contentBg, headerBg, gradientFromColor, ...); they apply at runtime, so the
// components map is cast to keep the values without tripping excess-prop checks.
const components = {
  Modal: {
    borderRadiusLG: 22,
    contentBg: surface,
    headerBg: surface,
    titleColor: ink,
    paddingContentHorizontalLG: 28,
  },
  Table: {
    headerBg: surfaceSunk,
    headerColor: ink,
    borderColor: border,
    rowHoverBg: crimsonSoft,
    headerSplitColor: 'transparent',
    cellPaddingBlock: 14,
    borderRadius: 14,
  },
  Pagination: {
    itemActiveBg: crimson,
    colorPrimary: '#ffffff',
    colorPrimaryHover: '#ffffff',
    borderRadius: 10,
  },
  Drawer: {
    colorBgElevated: surface,
    paddingLG: 24,
  },
  Skeleton: {
    borderRadius: 14,
    gradientFromColor: surfaceSunk,
    gradientToColor: '#e9e2d7',
  },
  Tooltip: {
    colorBgSpotlight: ink,
    borderRadius: 8,
  },
  Breadcrumb: {
    separatorColor: borderStrong,
    itemColor: inkMuted,
    lastItemColor: ink,
    linkColor: inkMuted,
    linkHoverColor: crimson,
  },
  Input: {
    borderRadius: 11,
    colorBorder: border,
    activeBorderColor: crimson,
    hoverBorderColor: borderStrong,
  },
  Button: {
    borderRadius: 11,
    primaryShadow: 'none',
    fontWeight: 600,
  },
} as ThemeConfig['components'];

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: crimson,
    colorInfo: crimson,
    colorLink: crimson,
    colorLinkHover: crimsonHover,
    colorBgBase: paper,
    colorTextBase: ink,
    colorBgContainer: surface,
    colorBgElevated: surface,
    colorBorder: border,
    colorBorderSecondary: border,
    colorText: ink,
    colorTextSecondary: inkMuted,
    colorTextTertiary: inkMuted,
    borderRadius: 11,
    fontFamily: fontBody,
    fontSize: 15,
    controlHeight: 38,
    boxShadow:
      '0 4px 10px rgba(64,46,32,0.08), 0 14px 30px rgba(64,46,32,0.08)',
    boxShadowSecondary:
      '0 10px 24px rgba(64,46,32,0.10), 0 30px 60px rgba(64,46,32,0.12)',
  },
  components,
};
