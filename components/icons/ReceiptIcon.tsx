import Svg, { Path } from 'react-native-svg';

interface Props { size?: number; color?: string }

export function ReceiptIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z" />
      <Path d="M9 8h6M9 12h6" />
    </Svg>
  );
}
