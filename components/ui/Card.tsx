import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Shadow } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: object | object[];
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

interface CardHeaderProps {
  title: string;
  action?: React.ReactNode;
  subtitle?: string;
}

export function CardHeader({ title, action, subtitle }: CardHeaderProps) {
  return (
    <View style={styles.cardH}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: 24,
    ...Shadow.card,
  },
  cardH: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.ink,
  },
  cardSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
  },
});
