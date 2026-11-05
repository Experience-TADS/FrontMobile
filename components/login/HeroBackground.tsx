import { StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  G,
  Polygon,
} from 'react-native-svg';

export function HeroBackground() {
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      viewBox="0 0 600 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        <LinearGradient id="lg" x1="0" x2="1">
          <Stop offset="0" stopColor="#EB0A1E" stopOpacity={0} />
          <Stop offset="0.6" stopColor="#EB0A1E" stopOpacity={0.9} />
          <Stop offset="1" stopColor="#fff" stopOpacity={0.9} />
        </LinearGradient>
        <LinearGradient id="bgd" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#2a2a2e" />
          <Stop offset="1" stopColor="#0b0b0c" />
        </LinearGradient>
      </Defs>

      <Rect width={600} height={800} fill="url(#bgd)" />

      <G fill="url(#lg)">
        <Polygon points="-40,610 640,470 640,478 -40,622" />
        <Polygon points="-40,660 640,540 640,544 -40,668" opacity={0.7} />
        <Polygon points="120,540 640,430 640,434 120,546" opacity={0.5} />
        <Polygon points="-40,720 640,630 640,640 -40,736" opacity={0.35} />
        <Polygon points="200,380 640,300 640,303 200,384" opacity={0.4} />
      </G>
    </Svg>
  );
}
