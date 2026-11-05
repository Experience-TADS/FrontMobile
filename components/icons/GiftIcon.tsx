import Svg, { Path, Rect } from 'react-native-svg';

interface Props { size?: number; color?: string }

export function GiftIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Rect x={3} y={8} width={18} height={4} rx={1} />
      <Path d="M12 8v13M5 12v9h14v-9" />
      <Path d="M12 8c-2-4-6-4-6-1.5S10 8 12 8zm0 0c2-4 6-4 6-1.5S14 8 12 8z" />
    </Svg>
  );
}
