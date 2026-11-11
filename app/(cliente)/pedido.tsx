import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, Fonts, Radii, Shadow } from '@/constants/theme';
import { PED, brl, fdt } from '@/constants/data';

export default function PedidoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = PED.find(x => x.id === id);

  if (!p) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Pedido não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Breadcrumb ── */}
      <View style={styles.crumbRow}>
        <TouchableOpacity onPress={() => router.push('/(cliente)/meus-pedidos')} activeOpacity={0.7}>
          <Text style={styles.crumbLink}>Meus Pedidos</Text>
        </TouchableOpacity>
        <Text style={styles.crumbSep}> › </Text>
        <Text style={styles.crumbCurrent}>Pedido #{p.id}</Text>
      </View>

      {/* ── Page header ── */}
      <View style={styles.pageHeader}>
        <Text style={styles.phTitle}>Pedido #{p.id}</Text>
        <Text style={styles.phSub}>{fdt(p.data)}</Text>
        <View style={styles.phDivider} />
      </View>

      <View style={styles.stack}>

        {/* ── Informações do pedido ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações do pedido</Text>
          <View style={styles.dl}>
            <Text style={styles.dt}>Data</Text>
            <Text style={styles.dd}>{fdt(p.data)}</Text>

            <Text style={styles.dt}>Vendedor</Text>
            <Text style={styles.dd}>{p.vend}</Text>

            <Text style={styles.dt}>Valor total</Text>
            <Text style={styles.ddValor}>{brl(p.valor)}</Text>
          </View>
        </View>

        {/* ── Itens ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Itens</Text>

          {/* cabeçalho da tabela */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.table}>
              <View style={styles.tableHead}>
                <Text style={[styles.th, { width: 90 }]}>MODELO</Text>
                <Text style={[styles.th, { width: 90 }]}>VERSÃO</Text>
                <Text style={[styles.th, { width: 100 }]}>COR</Text>
                <Text style={[styles.th, { width: 60 }]}>ANO</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.td, { width: 90 }]}>{p.modelo}</Text>
                <Text style={[styles.td, { width: 90 }]}>{p.versao}</Text>
                <Text style={[styles.td, { width: 100 }]}>{p.cor}</Text>
                <Text style={[styles.td, { width: 60 }]}>{p.ano}</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ── Veículo em fabricação ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Veículo em fabricação</Text>
          <TouchableOpacity
            onPress={() => router.push('/(cliente)/rastreamento')}
            activeOpacity={0.7}
          >
            <Text style={styles.linkFab}>
              Acompanhar fabricação do chassi {p.chassi}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },

  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  notFoundText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.muted,
  },

  /* ── Breadcrumb ── */
  crumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 4,
  },
  crumbLink: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    color: Colors.red,
  },
  crumbSep: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.muted,
  },
  crumbCurrent: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.muted,
  },

  /* ── Page header ── */
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
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

  /* ── Stack ── */
  stack: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 24,
  },

  /* ── Card ── */
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: 24,
    ...Shadow.card,
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.ink,
    marginBottom: 16,
  },

  /* ── DL (definition list) ── */
  dl: {
    gap: 2,
  },
  dt: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
    marginTop: 10,
  },
  dd: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.ink,
  },
  ddValor: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.red,
    letterSpacing: -0.4,
  },

  /* ── Tabela ── */
  table: {
    minWidth: 340,
  },
  tableHead: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    paddingBottom: 10,
    marginBottom: 0,
  },
  th: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: Colors.muted,
    paddingHorizontal: 0,
    paddingRight: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    paddingVertical: 16,
  },
  td: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.ink,
    paddingRight: 16,
  },

  /* ── Link fabricação ── */
  linkFab: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.red,
  },
});
