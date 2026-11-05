import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface ProgressBarProps {
  progress: number;
  height?: number;
  color?: string;
  trackColor?: string;
}

export function ProgressBar({
  progress,
  height = 8,
  color,
  trackColor,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, progress));
  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: trackColor ?? Colors.line },
      ]}
    >
      <View
        style={[
          styles.fill,
          { width: `${pct}%`, backgroundColor: color ?? Colors.red },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
