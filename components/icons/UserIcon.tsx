import Svg, { Path } from 'react-native-svg';

interface Props { size?: number; color?: string }

export function UserIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <Path d="M4 20a8 8 0 0 1 16 0" />
    </Svg>
  );
}
