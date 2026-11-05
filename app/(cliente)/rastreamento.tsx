import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Fonts, Radii } from '@/constants/theme';
import { Card, CardHeader } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { STATUS, VEI, CURRENT_USER, fdShort, ft } from '@/constants/data';

export default function RastreamentoScreen() {
  const insets = useSafeAreaInsets();
  const meus = VEI.filter(v => v.cliente === CURRENT_USER.n);

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
        <Text style={styles.phTitle}>Meus Veículos</Text>
        <Text style={styles.phSub}>Acompanhe cada etapa da fabricação</Text>
      </View>

      {meus.map(v => {
        const st = STATUS[v.etapa];
        const pct = Math.round((v.etapa + 1) / 9 * 100);

        return (
          <Card key={v.chassi} style={styles.mb16}>
            <View style={styles.heroCard}>
              <View>
                <Text style={styles.heroLabel}>Status atual</Text>
                <Text style={styles.heroStatus}>{st.l}</Text>
              </View>
              <Chip label={`Etapa ${v.etapa + 1}/9`} color="#A1A1AA" />
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleModel}>{v.modelo} 2024</Text>
              <Text style={styles.vehicleSub}>{v.cor} · Chassi {v.chassi}</Text>
            </View>

            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Progresso de fabricação</Text>
              <Text style={styles.progressPct}>{pct}%</Text>
            </View>
            <ProgressBar progress={pct} height={8} />

            <Text style={styles.stMsg}>{st.msg}</Text>

            <View style={styles.timeline}>
              {STATUS.map((s, i) => {
                const isDone = i < v.etapa;
                const isCurrent = i === v.etapa;
                return (
                  <View key={i} style={styles.tsRow}>
                    <View style={[
                      styles.tsDot,
                      isDone && { backgroundColor: Colors.ok, borderColor: Colors.ok },
                      isCurrent && { backgroundColor: Colors.red, borderColor: Colors.red },
                    ]} />
                    {i < STATUS.length - 1 && (
                      <View style={[
                        styles.tsLine,
                        isDone && { backgroundColor: Colors.ok },
                      ]} />
                    )}
                    <Text style={[
                      styles.tsLabel,
                      !isDone && !isCurrent && { color: Colors.muted },
                      isCurrent && { fontFamily: Fonts.bold, color: Colors.ink },
                    ]}>
                      {s.l}
                    </Text>
                    {(isDone || isCurrent) && v.hist[i] ? (
                      <Text style={styles.tsDate}>{fdShort(v.hist[i])} {ft(v.hist[i])}</Text>
                    ) : (
                      <Text style={styles.tsDateMuted}>Pendente</Text>
                    )}
                  </View>
                );
              })}
            </View>
          </Card>
        );
      })}
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

  heroCard: {
    backgroundColor: Colors.dark,
    borderRadius: Radii.lg,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    marginHorizontal: -4,
  },
  heroLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#A1A1AA',
    marginBottom: 4,
  },
  heroStatus: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    color: '#fff',
  },

  vehicleInfo: { marginBottom: 12 },
  vehicleModel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.ink,
  },
  vehicleSub: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.muted,
    marginTop: 2,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    color: Colors.ink,
  },
  progressPct: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.muted,
  },

  stMsg: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.muted,
    lineHeight: 19,
    marginTop: 12,
    marginBottom: 20,
  },

  timeline: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    paddingTop: 16,
  },
  tsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 18,
    gap: 12,
    position: 'relative',
  },
  tsDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.line,
    backgroundColor: Colors.surface,
    marginTop: 1,
    flexShrink: 0,
    zIndex: 1,
  },
  tsLine: {
    position: 'absolute',
    left: 9,
    top: 22,
    width: 2,
    bottom: 0,
    backgroundColor: Colors.line,
  },
  tsLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    color: Colors.ink,
    flex: 1,
  },
  tsDate: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.muted,
    textAlign: 'right',
  },
  tsDateMuted: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: Colors.line,
    textAlign: 'right',
  },
});
