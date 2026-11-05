import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts } from '@/constants/theme';

interface ClienteHeaderProps {
  showBack?: boolean;
}

export function ClienteHeader({ showBack = false }: ClienteHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.brand} numberOfLines={1}>
        <Text style={styles.brandBold}>TOYOTA </Text>
        <Text style={styles.brandLight}>EXPERIENCE</Text>
      </Text>

      {showBack ? (
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
          activeOpacity={0.7}
        >
          <Text style={styles.logoutIcon}>{'←'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/')}
          accessibilityLabel="Sair"
          activeOpacity={0.7}
        >
          <Text style={styles.logoutIcon}>{'↪'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flex: 1,
  },
  brandBold: {
    fontFamily: Fonts.extraBold,
    fontSize: 15,
    letterSpacing: 1.5,
    color: '#fff',
  },
  brandLight: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    letterSpacing: 1.5,
    color: Colors.sideInk,
  },
  logoutBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
  },
});
