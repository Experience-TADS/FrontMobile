import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { Colors, Fonts, Radii } from '@/constants/theme';

function BoltMini() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </Svg>
  );
}

function LogoutIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 21H5V3h4" />
      <Path d="M16 17l5-5-5-5M21 12H9" />
    </Svg>
  );
}

interface ClienteHeaderProps {
  showBack?: boolean;
}

export function ClienteHeader({ showBack = false }: ClienteHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.brand}>
        <View style={styles.mark}>
          <BoltMini />
        </View>
        <View>
          <Text style={styles.brandBold}>TOYOTA</Text>
          <Text style={styles.brandSub}>EXPERIENCE</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => showBack ? router.back() : router.replace('/')}
        accessibilityLabel={showBack ? 'Voltar' : 'Sair'}
        activeOpacity={0.7}
      >
        <LogoutIcon />
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBold: {
    fontFamily: Fonts.extraBold,
    fontSize: 15,
    letterSpacing: 0.3,
    color: '#fff',
    lineHeight: 18,
  },
  brandSub: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.sideInk,
    lineHeight: 13,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
