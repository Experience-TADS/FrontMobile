export const Colors = {
  red: '#EB0A1E',
  redDark: '#C00D19',
  redTint: '#FFF5F5',

  ink: '#1A1A1A',
  bg: '#FFFFFF',
  soft: '#F5F5F5',
  surface: '#FFFFFF',
  muted: '#6B7280',
  line: '#E5E7EB',

  ok: '#16A34A',
  warn: '#D97706',
  err: '#DC2626',
  info: '#2563EB',
  violet: '#7C3AED',

  dark: '#1A1A1A',
  onDark: '#FFFFFF',
  sideInk: '#A1A1AA',
} as const;

export const Fonts = {
  sans: 'PlusJakartaSans',
  // weights via fontFamily variant strings
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const Radii = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 14,
  full: 999,
} as const;

export const Shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
} as const;
