import Svg, { Rect } from 'react-native-svg';

interface Props { size?: number; color?: string }

export function GridIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Rect x={3} y={3} width={7} height={7} rx={1} />
      <Rect x={14} y={3} width={7} height={7} rx={1} />
      <Rect x={3} y={14} width={7} height={7} rx={1} />
      <Rect x={14} y={14} width={7} height={7} rx={1} />
    </Svg>
  );
}
