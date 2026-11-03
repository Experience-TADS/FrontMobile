import Svg, { Path } from 'react-native-svg';

interface Props { size?: number; color?: string }

export function HomeIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 11l9-8 9 8" />
      <Path d="M5 10v10h14V10" />
      <Path d="M10 20v-6h4v6" />
    </Svg>
  );
}
