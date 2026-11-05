import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Fonts, Radii } from '@/constants/theme';
import { Card, CardHeader } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LV, EXT, saldo, lvIdx, lvPct, lvNext, fmtN, fdShort } from '@/constants/data';

export default function RecompensasScreen() {
  const insets = useSafeAreaInsets();
  const lv = LV[lvIdx()];
  const bal = saldo();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingTop: 20, paddingBottom: insets.bottom + 96 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <Text style={styles.phTitle}>Recompensas</Text>
        <Text style={styles.phSub}>Acumule pontos e troque por benefícios</Text>
      </View>

      <Card style={styles.mb16}>
        <CardHeader title="Seus pontos" />
        <Text style={styles.bigNum}>
          {fmtN(bal)}
          <Text style={styles.bigNumSuffix}> pts</Text>
        </Text>
        <View style={{ marginTop: 8, marginBottom: 12 }}>
          <Chip label={`Nível ${lv.n}`} color={lv.c} dot />
        </View>
        <ProgressBar progress={lvPct()} height={8} />
        <Text style={styles.lvNext}>{lvNext()}</Text>

        <View style={styles.lvRow}>
          {LV.map((l, i) => (
            <View
              key={l.n}
              style={[
                styles.lvItem,
                i === lvIdx() && { borderColor: l.c, borderWidth: 1.5 },
              ]}
            >
              <View style={[styles.lvDot, { backgroundColor: l.c }]} />
              <Text style={styles.lvName}>{l.n}</Text>
              <Text style={styles.lvMin}>{fmtN(l.min)} pts</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={styles.mb16}>
        <CardHeader title="Extrato de pontos" subtitle="Últimas movimentações" />
        {EXT.slice().reverse().map((x, i) => (
          <View key={i} style={[styles.extRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.extDesc}>{x.t}</Text>
              <Text style={styles.extDate}>{fdShort(x.d)}</Text>
            </View>
            <Text style={[styles.extPts, { color: x.v > 0 ? Colors.ok : Colors.err }]}>
              {x.v > 0 ? '+' : '−'}{fmtN(Math.abs(x.v))} pts
            </Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  content: { paddingHorizontal: 20 },
  mb16: { marginBottom: 16 },

  pageHeader: {
    paddingBottom: 16,
    marginBottom: 24,
    borderBottomWidth: 3,
    borderBottomColor: Colors.red,
  },
  phTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 24,
    letterSpacing: -0.5,
    color: Colors.ink,
  },
  phSub: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.muted,
    marginTop: 4,
  },

  bigNum: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    letterSpacing: -0.6,
    color: Colors.ink,
  },
  bigNumSuffix: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.muted,
  },
  lvNext: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.muted,
    marginTop: 8,
  },

  lvRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  lvItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  lvDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  lvName: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    color: Colors.ink,
  },
  lvMin: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: Colors.muted,
  },

  extRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    gap: 12,
  },
  extDesc: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    color: Colors.ink,
  },
  extDate: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },
  extPts: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
