import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Radii, Shadow } from '@/constants/theme';
import { PED, CURRENT_USER, brl, fd, fdt } from '@/constants/data';

export default function MeusPedidosScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const mine = PED.filter(p => p.cliente === CURRENT_USER.n);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Page header ── */}
      <View style={styles.pageHeader}>
        <Text style={styles.phTitle}>Meus Pedidos</Text>
        <Text style={styles.phSub}>{mine.length} pedido(s) encontrado(s)</Text>
        <View style={styles.phDivider} />
      </View>

      {/* ── Lista de pedidos ── */}
      <View style={styles.stack}>
        {mine.map(p => (
          <View key={p.id} style={styles.card}>
            {/* linha 1: id + data + vendedor */}
            <View style={styles.pitemTop}>
              <Text style={styles.pedidoId}>#Pedido {p.id}</Text>
              <Text style={styles.smT}>{fd(p.data)}</Text>
              <Text style={styles.smT}>{p.vend}</Text>
            </View>

            {/* divisor */}
            <View style={styles.divider} />

            {/* linha 2: modelo/cor + valor/botão */}
            <View style={styles.pitemBottom}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modeloText}>
                  {p.modelo} {p.versao} {p.ano}
                </Text>
                <Text style={styles.smT}>{p.cor} · 1 unidade</Text>
              </View>
              <View style={styles.pitemRight}>
                <Text style={styles.valorText}>{brl(p.valor)}</Text>
                <TouchableOpacity
                  style={styles.btnOut}
                  onPress={() => router.push({
                    pathname: '/(cliente)/pedido' as any,
                    params: { id: p.id },
                  })}
                  activeOpacity={0.7}
                >
                  <Text style={styles.btnOutText}>Ver detalhes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },

  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  phTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    letterSpacing: -0.56,
    color: Colors.ink,
  },
  phSub: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
    marginTop: 4,
  },
  phDivider: {
    height: 3,
    backgroundColor: Colors.red,
    borderRadius: 2,
    marginTop: 16,
  },

  stack: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 20,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: 24,
    ...Shadow.card,
  },

  pitemTop: {
    gap: 2,
  },
  pedidoId: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.info,
    marginBottom: 2,
  },
  smT: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.muted,
    lineHeight: 18,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.line,
    marginVertical: 14,
  },

  pitemBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
  },
  modeloText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.ink,
    marginBottom: 2,
  },
  pitemRight: {
    alignItems: 'flex-end',
    gap: 8,
    flexShrink: 0,
  },
  valorText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.ink,
    letterSpacing: -0.3,
  },
  btnOut: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.red,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.red,
  },
});
