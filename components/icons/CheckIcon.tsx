import Svg, { Path } from 'react-native-svg';

interface Props { size?: number; color?: string }

export function CheckIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 12l5 5 9-10" />
    </Svg>
  );
}
