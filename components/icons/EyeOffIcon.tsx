import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export function EyeOffIcon({ size = 24, color = 'currentColor' }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <Path d="M4 4l16 16" />
    </Svg>
  );
}
