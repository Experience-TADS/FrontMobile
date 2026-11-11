import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Fonts, Radii, Shadow } from '@/constants/theme';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuizModal } from '@/components/ui/QuizModal';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { STATUS, VEI, CURRENT_USER, fdShort, ft, fdt, QZ, qzMax } from '@/constants/data';

export default function RastreamentoScreen() {
  const insets = useSafeAreaInsets();
  const [quizOpen, setQuizOpen] = useState(false);

  const v = VEI.find(x => x.cliente === CURRENT_USER.n) ?? VEI[0];
  const st = STATUS[v.etapa];
  const pct = Math.round((v.etapa + 1) / 9 * 100);
  const title = v.etapa >= 7 ? 'Seu Toyota chegou' : 'Seu Toyota está a caminho';
  const statusKey = st.k;
  const perguntas = (QZ[statusKey] ?? []).length;
  const maxPts = qzMax(statusKey);

  const histReversed = v.hist.map((d, i) => ({ d, i })).reverse();

  return (
    <>
      <QuizModal
        visible={quizOpen}
        statusKey={statusKey}
        onClose={() => setQuizOpen(false)}
      />

      <ScrollView
        style={styles.root}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page header ── */}
        <View style={styles.pageHeader}>
          <Text style={styles.phTitle}>{title}</Text>
          <Text style={styles.phSub}>
            {v.modelo} 2024 — {v.cor}
            {'  '}|{'  '}Chassi: <Text style={styles.phMono}>{v.chassi}</Text>
          </Text>
          <View style={styles.phDivider} />
        </View>

        <View style={styles.stack}>

          {/* ── Hero status escuro ── */}
          <View style={styles.heroSt}>
            <Text style={styles.heroK}>STATUS ATUAL</Text>
            <Text style={styles.heroH2}>{st.l}</Text>
            <Text style={styles.heroMsg}>{st.msg}</Text>
            <View style={styles.heroTip}>
              <Text style={styles.heroTipText}>
                <Text style={styles.heroTipBold}>Você sabia? </Text>
                {st.tip}
              </Text>
            </View>
          </View>

          {/* ── Barra de progresso ── */}
          <View style={styles.card}>
            <View style={styles.barRow}>
              <Text style={styles.barLabel}>Etapa {v.etapa + 1} de 9</Text>
              <Text style={styles.barPct}>{pct}%</Text>
            </View>
            <ProgressBar progress={pct} height={8} />
            {/* Stepper visual */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
              <View style={styles.stepperRow}>
                {STATUS.map((s, i) => {
                  const done = i < v.etapa;
                  const current = i === v.etapa;
                  return (
                    <View key={i} style={styles.stepperItem}>
                      <View style={[
                        styles.stepperDot,
                        done && { backgroundColor: Colors.ok, borderColor: Colors.ok },
                        current && { backgroundColor: Colors.red, borderColor: Colors.red },
                      ]}>
                        <Text style={[styles.stepperNum, (done || current) && { color: '#fff' }]}>{i + 1}</Text>
                      </View>
                      {i < STATUS.length - 1 && (
                        <View style={[styles.stepperLine, done && { backgroundColor: Colors.ok }]} />
                      )}
                      <Text style={[
                        styles.stepperLabel,
                        current && { color: Colors.red, fontFamily: Fonts.bold },
                        !done && !current && { color: Colors.muted },
                      ]} numberOfLines={2}>
                        {s.l}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* ── Quiz desta etapa ── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quiz desta etapa</Text>
            <View style={styles.quizRow}>
              <Text style={[styles.cardSub, { flex: 1 }]}>
                Responda {perguntas} pergunta{perguntas !== 1 ? 's' : ''} sobre{' '}
                {st.l.toLowerCase()} e ganhe até{' '}
                <Text style={styles.cardSubBold}>{maxPts} pontos</Text> para trocar por bônus.
              </Text>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => setQuizOpen(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.btnPrimaryText}>Fazer quiz</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Linha do tempo ── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Linha do tempo</Text>
            <View style={styles.timeline}>
              {STATUS.map((s, i) => {
                const isDone = i < v.etapa;
                const isCurrent = i === v.etapa;
                const isPending = i > v.etapa;
                return (
                  <View key={i} style={styles.tsRow}>
                    {i < STATUS.length - 1 && (
                      <View style={[styles.tsLine, isDone && { backgroundColor: Colors.ok }]} />
                    )}
                    <View style={[
                      styles.tsDot,
                      isDone && styles.tsDotDone,
                      isCurrent && styles.tsDotCurrent,
                    ]}>
                      {isDone && <CheckIcon size={12} color="#fff" />}
                    </View>
                    <View style={styles.tsContent}>
                      <Text style={[
                        styles.tsLabel,
                        isPending && { color: Colors.muted, fontFamily: Fonts.regular },
                        isCurrent && { fontFamily: Fonts.bold },
                      ]}>
                        {s.l}
                      </Text>
                      {(isDone || isCurrent) && v.hist[i] ? (
                        <Text style={styles.tsDate}>{fdt(v.hist[i])}</Text>
                      ) : (
                        <Text style={styles.tsPending}>Pendente</Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* ── Histórico completo ── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Histórico completo</Text>
            <View style={styles.tableHead}>
              <Text style={[styles.thText, { flex: 1 }]}>STATUS</Text>
              <Text style={[styles.thText, { textAlign: 'right' }]}>DATA/HORA</Text>
            </View>
            {histReversed.map(({ d, i }) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.chipWrapper}>
                  <View style={[styles.chipInline, { backgroundColor: `${STATUS[i].c}22` }]}>
                    <Text style={[styles.chipText, { color: STATUS[i].c }]}>{STATUS[i].l}</Text>
                  </View>
                </View>
                <Text style={styles.tdMono}>{fdt(d)}</Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },

  pageHeader: { paddingHorizontal: 20, paddingTop: 20 },
  phTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 26,
    letterSpacing: -0.5,
    color: Colors.ink,
    marginBottom: 6,
  },
  phSub: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.muted, lineHeight: 20 },
  phMono: { fontFamily: Fonts.bold, color: Colors.ink },
  phDivider: { marginTop: 16, height: 3, backgroundColor: Colors.red, borderRadius: 2 },

  stack: { paddingHorizontal: 20, paddingTop: 24, gap: 20 },

  heroSt: {
    backgroundColor: Colors.dark,
    borderRadius: Radii.lg,
    padding: 24,
    gap: 10,
    ...Shadow.card,
  },
  heroK: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: '#A1A1AA',
  },
  heroH2: { fontFamily: Fonts.extraBold, fontSize: 24, letterSpacing: -0.4, color: '#fff' },
  heroMsg: { fontFamily: Fonts.regular, fontSize: 14, color: '#D4D4D8', lineHeight: 20 },
  heroTip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: Radii.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  heroTipText: { fontFamily: Fonts.regular, fontSize: 13, color: '#E4E4E7', lineHeight: 19 },
  heroTipBold: { fontFamily: Fonts.bold, color: '#E4E4E7' },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: 20,
    ...Shadow.card,
  },
  barRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  barLabel: { fontFamily: Fonts.bold, fontSize: 14, color: Colors.ink },
  barPct: { fontFamily: Fonts.bold, fontSize: 13, color: Colors.muted },

  stepperRow: { flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 4 },
  stepperItem: { alignItems: 'center', width: 72 },
  stepperDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.line,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperNum: { fontFamily: Fonts.bold, fontSize: 12, color: Colors.muted },
  stepperLine: {
    position: 'absolute',
    left: 52,
    top: 15,
    width: 20,
    height: 2,
    backgroundColor: Colors.line,
  },
  stepperLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
    color: Colors.ink,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 68,
  },

  cardTitle: { fontFamily: Fonts.bold, fontSize: 16, color: Colors.ink, marginBottom: 12 },
  quizRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  cardSub: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.muted, lineHeight: 20 },
  cardSubBold: { fontFamily: Fonts.bold, color: Colors.ink },

  btnPrimary: {
    height: 44,
    borderRadius: Radii.md,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexShrink: 0,
  },
  btnPrimaryText: { fontFamily: Fonts.bold, fontSize: 14, color: '#fff' },

  timeline: { gap: 0 },
  tsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
    position: 'relative',
  },
  tsLine: {
    position: 'absolute',
    left: 11,
    top: 24,
    bottom: 0,
    width: 2,
    backgroundColor: Colors.line,
    zIndex: 0,
  },
  tsDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.line,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
    zIndex: 1,
  },
  tsDotDone: { backgroundColor: Colors.ok, borderColor: Colors.ok },
  tsDotCurrent: { backgroundColor: Colors.red, borderColor: Colors.red },
  tsContent: { flex: 1, paddingLeft: 16 },
  tsLabel: { fontFamily: Fonts.semiBold, fontSize: 14, color: Colors.ink },
  tsDate: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.muted, marginTop: 2 },
  tsPending: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.muted, marginTop: 2 },

  tableHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    marginBottom: 4,
  },
  thText: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: Colors.muted,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  chipWrapper: { flex: 1 },
  chipInline: {
    alignSelf: 'flex-start',
    borderRadius: Radii.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  chipText: { fontFamily: Fonts.bold, fontSize: 12 },
  tdMono: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.muted, textAlign: 'right' },
});
