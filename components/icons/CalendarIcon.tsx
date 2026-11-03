import Svg, { Path } from 'react-native-svg';

interface Props { size?: number; color?: string }

export function CalendarIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 5h18v16H3z" />
      <Path d="M3 9h18" />
      <Path d="M8 3v4M16 3v4" />
    </Svg>
  );
}
