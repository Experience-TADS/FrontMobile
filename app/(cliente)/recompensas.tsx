import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors, Fonts, Radii, Shadow } from '@/constants/theme';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuizModal } from '@/components/ui/QuizModal';
import {
  STATUS, VEI, LV, EXT, MIS, REW, VOU,
  CURRENT_USER, fmtN, fd,
  saldo, lifetime, lvIdx, lvPct, lvNext,
  qzMax, qzOpen, QPT,
} from '@/constants/data';

type TabKey = 'quiz' | 'missoes' | 'cat' | 'vou';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'quiz', label: 'Quizzes' },
  { key: 'missoes', label: 'Missões' },
  { key: 'cat', label: 'Catálogo\nde bônus' },
  { key: 'vou', label: 'Meus\nresgates' },
];

const CAT_FILTERS = ['Todos', 'Serviços', 'Brindes', 'Acessórios'];

function StarIcon({ size = 22, color = Colors.red }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
    </Svg>
  );
}

function GearIcon({ size = 22, color = Colors.muted }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={12} r={3} />
      <Path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </Svg>
  );
}

function ChipInline({ label, color, dot }: { label: string; color: string; dot?: boolean }) {
  return (
    <View style={[styles.chip, { backgroundColor: color + '22' }]}>
      {dot && <View style={[styles.chipDot, { backgroundColor: color }]} />}
      <Text style={[styles.chipText, { color }]}>{label}</Text>
    </View>
  );
}

export default function RecompensasScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<TabKey>('quiz');
  const [catFilter, setCatFilter] = useState('Todos');
  const [activeQuizKey, setActiveQuizKey] = useState<string | null>(null);

  const bal = saldo();
  const lt = lifetime();
  const lvi = lvIdx();
  const lv = LV[lvi];
  const etapaAtual = VEI.find(v => v.cliente === CURRENT_USER.n)?.etapa ?? 0;
  const doneMissions = MIS.filter(m => m.st === 'feita').length;

  return (
    <>
      <QuizModal
        visible={!!activeQuizKey}
        statusKey={activeQuizKey ?? ''}
        onClose={() => setActiveQuizKey(null)}
      />

      <ScrollView
        style={styles.root}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.phTitle}>Recompensas</Text>
          <Text style={styles.phSub}>Responda quizzes, cumpra missões e troque pontos por bônus</Text>
          <View style={styles.phDivider} />
        </View>

        <View style={styles.stack}>

          {/* ── Card de saldo ── */}
          <View style={styles.card}>
            <View style={styles.sum}>
              <View style={{ flex: 1.3 }}>
                <Text style={styles.smT}>Saldo de pontos</Text>
                <Text style={styles.big}>
                  {fmtN(bal)}
                  <Text style={styles.bigMuted}> pts</Text>
                </Text>
                <View style={{ marginTop: 8 }}>
                  <ChipInline label={`Nível ${lv.n}`} color={lv.c} dot />
                </View>
              </View>
              <View style={styles.sumR}>
                <Text style={styles.smT}>Próximo nível</Text>
                <View style={{ marginVertical: 10 }}>
                  <ProgressBar progress={lvPct()} height={8} />
                </View>
                <Text style={styles.smT}>{lvNext()}</Text>
              </View>
            </View>
            <View style={styles.metrics}>
              <View style={styles.m}>
                <Text style={styles.mLab}>Pontos acumulados</Text>
                <Text style={styles.mVal}>{fmtN(lt)}</Text>
                <Text style={[styles.mTag, { color: Colors.muted }]}>Desde o cadastro</Text>
              </View>
              <View style={styles.m}>
                <Text style={styles.mLab}>Missões feitas</Text>
                <Text style={styles.mVal}>{doneMissions}/{MIS.length}</Text>
                <Text style={[styles.mTag, { color: Colors.ok }]}>Continue assim</Text>
              </View>
              <View style={styles.m}>
                <Text style={styles.mLab}>Quizzes feitos</Text>
                <Text style={styles.mVal}>0/{STATUS.length}</Text>
                <Text style={[styles.mTag, { color: Colors.muted }]}>Por etapa</Text>
              </View>
            </View>
          </View>

          {/* ── Tabs ── */}
          <View style={styles.tabsRow}>
            {TABS.map(t => (
              <TouchableOpacity key={t.key} style={styles.tabBtn} onPress={() => setTab(t.key)} activeOpacity={0.7}>
                <Text style={[styles.tabLabel, tab === t.key && styles.tabLabelOn]}>{t.label}</Text>
                <View style={[styles.tabLine, tab === t.key && styles.tabLineOn]} />
              </TouchableOpacity>
            ))}
          </View>

          {/* ══ QUIZZES ══ */}
          {tab === 'quiz' && (
            <View style={styles.card}>
              <View style={styles.cardH}>
                <Text style={styles.cardTitle}>Quiz por etapa</Text>
                <Text style={styles.smT}>0/{STATUS.length} concluídos</Text>
              </View>
              <Text style={[styles.smT, { marginBottom: 20, lineHeight: 20 }]}>
                Cada etapa da fabricação tem um quiz de até 3 perguntas. Você ganha {QPT} pts por acerto e mais {QPT} pts se acertar todas. Cada quiz vale uma vez e é liberado quando o seu veículo chega à etapa.
              </Text>
              <View style={styles.qzGrid}>
                {STATUS.map((s, idx) => {
                  const open = qzOpen(s.k, etapaAtual);
                  const isCurrent = idx === etapaAtual;
                  const maxPts = qzMax(s.k);
                  const perguntas = require('@/constants/data').QZ[s.k]?.length ?? 0;
                  return (
                    <View key={s.k} style={styles.pcard}>
                      <View style={styles.pcardBody}>
                        <View style={styles.pcardTopRow}>
                          <View style={[styles.icoBox, { backgroundColor: open ? Colors.redTint : Colors.soft }]}>
                            {open ? <StarIcon size={22} color={Colors.red} /> : <GearIcon size={22} />}
                          </View>
                          <ChipInline
                            label={open ? (isCurrent ? 'Etapa atual' : 'Disponível') : 'Bloqueado'}
                            color={open ? Colors.info : Colors.muted}
                            dot
                          />
                        </View>
                        <Text style={styles.pcardTitle}>{s.l}</Text>
                        <Text style={styles.pcardSub}>
                          {perguntas} pergunta{perguntas !== 1 ? 's' : ''} · até {maxPts} pts
                        </Text>
                        {open ? (
                          <TouchableOpacity style={styles.btnPrimary} onPress={() => setActiveQuizKey(s.k)} activeOpacity={0.85}>
                            <Text style={styles.btnPrimaryText}>Fazer quiz</Text>
                          </TouchableOpacity>
                        ) : (
                          <Text style={styles.bloqueadoText}>Libera na etapa {idx + 1}</Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* ══ MISSÕES ══ */}
          {tab === 'missoes' && (
            <View style={styles.card}>
              <View style={styles.cardH}>
                <Text style={styles.cardTitle}>Missões</Text>
                <Text style={styles.smT}>Complete para ganhar pontos</Text>
              </View>
              {MIS.map((m, i) => (
                <View key={m.id} style={[styles.misRow, i === 0 && { borderTopWidth: 0 }]}>
                  <View style={[styles.icoBox, { backgroundColor: Colors.redTint }]}>
                    <StarIcon size={22} color={Colors.red} />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.misTitle}>{m.t}</Text>
                    <Text style={styles.smT}>{m.d}</Text>
                    {m.st === 'aberta' && m.pr && (
                      <View style={styles.misProgress}>
                        <View style={{ flex: 1, maxWidth: 180 }}>
                          <ProgressBar progress={(m.pr[0] / m.pr[1]) * 100} height={6} />
                        </View>
                        <Text style={styles.smT}>{m.pr[0]}/{m.pr[1]}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.misRight}>
                    <Text style={styles.misPts}>+{m.pts} pts</Text>
                    {m.st === 'feita' ? (
                      <ChipInline label="Concluída" color={Colors.ok} dot />
                    ) : m.st === 'pronta' ? (
                      <TouchableOpacity style={styles.btnSmPrimary} activeOpacity={0.85}>
                        <Text style={styles.btnSmText}>Resgatar pontos</Text>
                      </TouchableOpacity>
                    ) : (
                      <ChipInline label="Em andamento" color={Colors.warn} dot />
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ══ CATÁLOGO ══ */}
          {tab === 'cat' && (
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style={styles.fchipsScroll} contentContainerStyle={styles.fchipsContent}>
                {CAT_FILTERS.map(f => (
                  <TouchableOpacity key={f} style={[styles.fchip, catFilter === f && styles.fchipOn]}
                    onPress={() => setCatFilter(f)} activeOpacity={0.7}>
                    <Text style={[styles.fchipText, catFilter === f && styles.fchipTextOn]}>{f}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.qzGrid}>
                {REW.filter(r => catFilter === 'Todos' || r.k === catFilter).map(r => {
                  const locked = lvi < r.lv;
                  const falta = r.c - bal;
                  return (
                    <View key={r.id} style={styles.pcard}>
                      <View style={[styles.pcardImg, { backgroundColor: Colors.soft }]}>
                        <View style={[styles.icoBox, { width: 56, height: 56, borderRadius: 16, backgroundColor: Colors.surface }]}>
                          <StarIcon size={28} color={Colors.red} />
                        </View>
                      </View>
                      <View style={styles.pcardBody}>
                        <ChipInline label={r.k} color={Colors.muted} />
                        <Text style={styles.pcardTitle}>{r.n}</Text>
                        <Text style={styles.smT}>{r.d}</Text>
                        <Text style={styles.pcardPrice}>{fmtN(r.c)} pts</Text>
                        {locked ? (
                          <View style={[styles.btnGhost, { opacity: 0.6 }]}>
                            <Text style={styles.btnGhostText}>Disponível no nível {LV[r.lv].n}</Text>
                          </View>
                        ) : falta > 0 ? (
                          <View style={[styles.btnGhost, { opacity: 0.6 }]}>
                            <Text style={styles.btnGhostText}>Faltam {fmtN(falta)} pts</Text>
                          </View>
                        ) : (
                          <TouchableOpacity style={styles.btnSmPrimary} activeOpacity={0.85}>
                            <Text style={styles.btnSmText}>Trocar por bônus</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* ══ RESGATES ══ */}
          {tab === 'vou' && (
            <View style={styles.card}>
              <View style={styles.cardH}>
                <Text style={styles.cardTitle}>Meus resgates</Text>
                <Text style={styles.smT}>Apresente o código na concessionária</Text>
              </View>
              {VOU.length === 0 ? (
                <Text style={styles.smT}>Você ainda não trocou pontos por bônus.</Text>
              ) : (
                VOU.map((v, i) => {
                  const expiry = new Date(v.dt);
                  expiry.setDate(expiry.getDate() + 90);
                  return (
                    <View key={i} style={styles.voucher}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.voucherName}>{v.n}</Text>
                        <Text style={styles.smT}>Resgatado em {fd(v.dt)} · válido até {fd(expiry.toISOString())}</Text>
                      </View>
                      <View style={styles.voucherRight}>
                        <Text style={styles.voucherCode}>{v.code}</Text>
                        {v.used
                          ? <ChipInline label="Utilizado" color={Colors.muted} dot />
                          : <ChipInline label="Disponível" color={Colors.ok} dot />}
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          )}

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  pageHeader: { paddingHorizontal: 20, paddingTop: 20 },
  phTitle: { fontFamily: Fonts.extraBold, fontSize: 28, letterSpacing: -0.56, color: Colors.ink },
  phSub: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.muted, marginTop: 4, lineHeight: 20 },
  phDivider: { height: 3, backgroundColor: Colors.red, borderRadius: 2, marginTop: 16 },
  stack: { paddingHorizontal: 20, paddingTop: 24, gap: 24 },

  card: { backgroundColor: Colors.surface, borderRadius: Radii.lg, borderWidth: 1, borderColor: Colors.line, padding: 24, ...Shadow.card },
  cardH: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontFamily: Fonts.bold, fontSize: 16, color: Colors.ink },

  smT: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.muted },
  big: { fontFamily: Fonts.extraBold, fontSize: 30, letterSpacing: -0.6, color: Colors.ink, lineHeight: 36 },
  bigMuted: { fontFamily: Fonts.regular, fontSize: 18, color: Colors.muted },

  sum: { flexDirection: 'row', gap: 24 },
  sumR: { flex: 1, borderLeftWidth: 1, borderLeftColor: Colors.line, paddingLeft: 24 },
  metrics: { flexDirection: 'row', gap: 16, marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: Colors.line },
  m: { flex: 1, gap: 2 },
  mLab: { fontFamily: Fonts.semiBold, fontSize: 12, color: Colors.muted },
  mVal: { fontFamily: Fonts.bold, fontSize: 20, color: Colors.ink, marginVertical: 2 },
  mTag: { fontFamily: Fonts.bold, fontSize: 12 },

  tabsRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.line, marginTop: -8 },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 4, position: 'relative' },
  tabLabel: { fontFamily: Fonts.bold, fontSize: 12, color: Colors.muted, textAlign: 'center', lineHeight: 16 },
  tabLabelOn: { color: Colors.red },
  tabLine: { position: 'absolute', bottom: -1, left: 4, right: 4, height: 3, borderRadius: 2, backgroundColor: 'transparent' },
  tabLineOn: { backgroundColor: Colors.red },

  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: Radii.full, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start' },
  chipDot: { width: 6, height: 6, borderRadius: 3 },
  chipText: { fontFamily: Fonts.bold, fontSize: 12 },

  qzGrid: { gap: 16 },
  pcard: { backgroundColor: Colors.surface, borderRadius: Radii.lg, borderWidth: 1, borderColor: Colors.line, overflow: 'hidden', ...Shadow.card },
  pcardImg: { height: 100, alignItems: 'center', justifyContent: 'center' },
  pcardBody: { padding: 20, gap: 8 },
  pcardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  icoBox: { width: 44, height: 44, borderRadius: Radii.lg, alignItems: 'center', justifyContent: 'center' },
  pcardTitle: { fontFamily: Fonts.extraBold, fontSize: 18, color: Colors.ink },
  pcardSub: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.muted },
  pcardPrice: { fontFamily: Fonts.bold, fontSize: 20, color: Colors.ink, letterSpacing: -0.3, marginVertical: 4 },
  bloqueadoText: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.muted },

  btnPrimary: { height: 44, borderRadius: Radii.md, backgroundColor: Colors.red, alignItems: 'center', justifyContent: 'center' },
  btnPrimaryText: { fontFamily: Fonts.bold, fontSize: 14, color: '#fff' },
  btnSmPrimary: { height: 34, paddingHorizontal: 14, borderRadius: Radii.md, backgroundColor: Colors.red, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
  btnSmText: { fontFamily: Fonts.bold, fontSize: 13, color: '#fff' },
  btnGhost: { height: 34, paddingHorizontal: 14, borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.line, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
  btnGhostText: { fontFamily: Fonts.bold, fontSize: 13, color: Colors.muted },

  misRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, paddingVertical: 18, borderTopWidth: 1, borderTopColor: Colors.line },
  misTitle: { fontFamily: Fonts.bold, fontSize: 14, color: Colors.ink, marginBottom: 2 },
  misProgress: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  misRight: { alignItems: 'flex-end', gap: 8, flexShrink: 0 },
  misPts: { fontFamily: Fonts.bold, fontSize: 13, color: Colors.ok },

  fchipsScroll: { marginBottom: 16 },
  fchipsContent: { gap: 8, paddingVertical: 2 },
  fchip: { borderWidth: 1, borderColor: Colors.line, backgroundColor: Colors.surface, borderRadius: Radii.full, paddingHorizontal: 18, paddingVertical: 8 },
  fchipOn: { backgroundColor: Colors.red, borderColor: Colors.red },
  fchipText: { fontFamily: Fonts.semiBold, fontSize: 13, color: Colors.ink },
  fchipTextOn: { color: '#fff' },

  voucher: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', borderWidth: 1.5, borderColor: Colors.red, borderStyle: 'dashed', borderRadius: Radii.lg, padding: 16, marginTop: 12 },
  voucherName: { fontFamily: Fonts.bold, fontSize: 14, color: Colors.ink, marginBottom: 2 },
  voucherRight: { alignItems: 'flex-end', gap: 6 },
  voucherCode: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.ink, letterSpacing: 1 },
});
