// iOS-style colors (dark mode) + MainQuest light screens
export const colors = {
  background: "#000000",
  secondaryBackground: "#1c1c1e",
  tertiaryBackground: "#2c2c2e",
  groupedBackground: "#1c1c1e",
  fill: "#2c2c2e",
  label: "#ffffff",
  secondaryLabel: "#ebebf5",
  tertiaryLabel: "#8e8e93",
  separator: "#38383a",
  accent: "#ff9f0a",
  red: "#820000",           // MainQuest primary
  cardinalRed: "#820000",
  // Text on light/white backgrounds — use these so text is never white-on-white
  textOnLight: "#1c1c1e",
  textOnLightSecondary: "#6c6c70",
  accentViolet: "#af52de",
  accentGreen: "#30d158",
  accentBlue: "#0a84ff",
  systemRed: "#ff453a",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const radius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Optional: load Cormorant Garamond + DM Sans via @expo-google-fonts for stats/cards
export const fonts = {
  numberSerif: "CormorantGaramond_600SemiBold", // fallback: system serif
  labelSans: "DMSans_600SemiBold",               // fallback: system
};

// Heading: Bricolage Grotesque — use for titles, section headers, tab labels
export const heading = {
  regular: "BricolageGrotesque_400Regular",
  medium: "BricolageGrotesque_500Medium",
  semibold: "BricolageGrotesque_600SemiBold",
  bold: "BricolageGrotesque_700Bold",
  extrabold: "BricolageGrotesque_800ExtraBold",
} as const;

// Body: Plus Jakarta Sans — use for body text, labels, inputs
export const body = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extrabold: "PlusJakartaSans_800ExtraBold",
} as const;

// Backward compatibility: gotham = body (Plus Jakarta Sans)
export const gotham = {
  book: body.regular,
  medium: body.medium,
  bold: body.bold,
  black: body.extrabold,
} as const;
