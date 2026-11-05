import Svg, { Path, Circle } from 'react-native-svg';

interface Props { size?: number; color?: string }

export function CarIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 17h16v-4l-2-5H6l-2 5z" />
      <Circle cx={7.5} cy={17} r={1.6} />
      <Circle cx={16.5} cy={17} r={1.6} />
    </Svg>
  );
}
