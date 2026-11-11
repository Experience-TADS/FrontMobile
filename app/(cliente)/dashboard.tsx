import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { Colors, Fonts, Radii, Shadow } from '@/constants/theme';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { ChevronIcon } from '@/components/icons/ChevronIcon';
import {
  STATUS, TIPO, AST, VEI, PED, AG, LV, CAR_IMAGES,
  CURRENT_USER, brl, fmtN, fdShort, ft, hoje,
  saldo, lvIdx, lvPct, lvNext, nextAg, daysSince,
} from '@/constants/data';

function ChipInline({ label, color, dot }: { label: string; color: string; dot?: boolean }) {
  const bg = color + '22';
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      {dot && <View style={[styles.chipDot, { backgroundColor: color }]} />}
      <Text style={[styles.chipText, { color }]}>{label}</Text>
    </View>
  );
}

function ChevRight() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke={Colors.red} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const v = VEI[0];
  const p = PED.find(x => x.id === '001')!;
  const st = STATUS[v.etapa];
  const pct = Math.round((v.etapa + 1) / 9 * 100);
  const ag = nextAg(CURRENT_USER.n);
  const lv = LV[lvIdx()];

  const pedidosAtivos = PED.filter(x => x.cliente === CURRENT_USER.n).length;
  const veiculosFab = VEI.filter(x => x.cliente === CURRENT_USER.n).length;
  const agendPend = AG.filter(
    a => a.cliente === CURRENT_USER.n && a.status === 'PENDENTE',
  ).length;

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        {/* título + subtítulo */}
        <View style={styles.phTexts}>
          <Text style={styles.phTitle}>Olá, Ana!</Text>
          <Text style={styles.phSub}>{hoje()}</Text>
        </View>
        {/* botão vermelho largura total */}
        <TouchableOpacity
          style={styles.phBtn}
          onPress={() => router.push('/(cliente)/rastreamento')}
          activeOpacity={0.85}
        >
          <Text style={styles.phBtnText}>Acompanhar fabricação</Text>
          <ChevRight />
        </TouchableOpacity>
        {/* divisor vermelho 3px */}
        <View style={styles.phDivider} />
      </View>

      <View style={styles.stack}>

        {/* ── Resumo do pedido ── */}
        <View style={styles.card}>
          <View style={styles.cardH}>
            <Text style={styles.cardTitle}>Meu pedido</Text>
            <Text style={styles.smT}>#{p.id}</Text>
          </View>

          {/* Foto do carro */}
          {CAR_IMAGES[p.modelo] ? (
            <Image
              source={{ uri: CAR_IMAGES[p.modelo] }}
              style={styles.carImage}
              resizeMode="cover"
            />
          ) : null}

          <View style={styles.sum}>
            <View style={{ flex: 1.3 }}>
              <Text style={styles.smT}>Valor total</Text>
              <Text style={styles.big}>{brl(p.valor)}</Text>
              <Text style={styles.delta}>{p.modelo} {p.versao} · {p.cor}</Text>
            </View>
            <View style={styles.sumR}>
              <Text style={styles.smT}>Etapa</Text>
              <Text style={styles.big}>
                {v.etapa + 1}
                <Text style={styles.bigMuted}>/9</Text>
              </Text>
              <ChipInline label={st.l} color={st.c} />
            </View>
          </View>
          <View style={styles.metrics}>
            <View style={styles.m}>
              <Text style={styles.mLab}>Progresso</Text>
              <Text style={styles.mVal}>{pct}%</Text>
              <Text style={[styles.mTag, { color: Colors.ok }]}>No prazo</Text>
            </View>
            <View style={styles.m}>
              <Text style={styles.mLab}>Dias em prod.</Text>
              <Text style={styles.mVal}>{daysSince(v.hist[0])}</Text>
              <Text style={[styles.mTag, { color: Colors.ok }]}>Ótimo</Text>
            </View>
            <View style={styles.m}>
              <Text style={styles.mLab}>Chassi</Text>
              <Text style={styles.mVal}>{v.chassi}</Text>
              <Text style={[styles.mTag, { color: Colors.muted }]}>ID</Text>
            </View>
          </View>
        </View>

        {/* ── Status do veículo ── */}
        <View style={styles.card}>
          <View style={styles.cardH}>
            <Text style={styles.cardTitle}>Status do veículo</Text>
            <TouchableOpacity onPress={() => router.push('/(cliente)/rastreamento')}>
              <Text style={styles.link}>Ver detalhes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusName}>{st.l}</Text>
            <Text style={styles.smT}>Etapa {v.etapa + 1} de 9</Text>
          </View>
          <ProgressBar progress={pct} height={8} />
          <Text style={styles.statusMsg}>{st.msg}</Text>
        </View>

        {/* ── Próximo agendamento ── */}
        <View style={styles.card}>
          <View style={styles.cardH}>
            <Text style={styles.cardTitle}>Próximo agendamento</Text>
          </View>
          {ag ? (
            <View style={{ gap: 8 }}>
              <Text style={styles.agWhen}>{fdShort(ag.dt)} · {ft(ag.dt)}</Text>
              <View style={styles.chipRow}>
                <ChipInline label={TIPO[ag.tipo].l} color={TIPO[ag.tipo].c} />
                <ChipInline label={AST[ag.status].l} color={AST[ag.status].c} dot />
              </View>
              <Text style={styles.smT}>Vendedor: {ag.vend}</Text>
            </View>
          ) : (
            <Text style={styles.smT}>Nenhum agendamento futuro.</Text>
          )}
        </View>

        {/* ── Recompensas ── */}
        <View style={styles.card}>
          <View style={styles.cardH}>
            <Text style={styles.cardTitle}>Recompensas</Text>
            <TouchableOpacity onPress={() => router.push('/(cliente)/recompensas')}>
              <Text style={styles.link}>Ver bônus</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.big}>
            {fmtN(saldo())}
            <Text style={styles.bigMuted}> pts</Text>
          </Text>
          <View style={{ marginTop: 8, marginBottom: 14 }}>
            <ChipInline label={`Nível ${lv.n}`} color={lv.c} dot />
          </View>
          <ProgressBar progress={lvPct()} height={8} />
          <Text style={styles.smTmt}>{lvNext()}</Text>
        </View>

        {/* ── Pedidos e acompanhamento ── */}
        <View style={styles.card}>
          <View style={styles.cardH}>
            <Text style={styles.cardTitle}>Meus números</Text>
          </View>
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push('/(cliente)/meus-pedidos')}
            activeOpacity={0.7}
          >
            <Text style={styles.rowLabel}>Pedidos ativos</Text>
            <Text style={styles.rowCount}>{pedidosAtivos}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push('/(cliente)/rastreamento')}
            activeOpacity={0.7}
          >
            <Text style={styles.rowLabel}>Veículos em fabricação</Text>
            <Text style={styles.rowCount}>{veiculosFab}</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Agendamentos pendentes</Text>
            <Text style={styles.rowCount}>{agendPend}</Text>
          </View>
        </View>

        {/* ── Quick action — Meus agendamentos ── */}
        <TouchableOpacity
          style={styles.qa}
          onPress={() => router.push('/(cliente)/agendamentos')}
          activeOpacity={0.7}
        >
          <View style={styles.qaIco}>
            <CalendarIcon size={22} color={Colors.red} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.qaTitle}>Meus agendamentos</Text>
            <Text style={styles.qaSub}>Visitas e test drives</Text>
          </View>
          <ChevronIcon size={18} color={Colors.muted} />
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },

  /* ── Page header ── */
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  phTexts: {
    marginBottom: 16,
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
  phBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
    borderRadius: Radii.md,
    backgroundColor: Colors.red,
    marginBottom: 16,
  },
  phBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#fff',
  },
  phDivider: {
    height: 3,
    backgroundColor: Colors.red,
    borderRadius: 2,
    marginBottom: 0,
  },

  /* ── Stack ── */
  stack: {
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 24,
  },

  /* ── Card genérico ── */
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: 24,
    ...Shadow.card,
  },
  cardH: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.ink,
  },

  /* ── Tipografia compartilhada ── */
  big: {
    fontFamily: Fonts.extraBold,
    fontSize: 30,
    letterSpacing: -0.6,
    color: Colors.ink,
    lineHeight: 36,
  },
  bigMuted: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    color: Colors.muted,
    letterSpacing: 0,
  },
  delta: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.muted,
    marginTop: 4,
  },
  smT: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.muted,
  },
  smTmt: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.muted,
    marginTop: 8,
  },
  link: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.red,
  },

  carImage: {
    width: '100%',
    height: 160,
    borderRadius: Radii.md,
    marginBottom: 16,
    backgroundColor: Colors.soft,
  },

  /* ── Sum (Resumo do pedido) ── */
  sum: { flexDirection: 'row', gap: 0 },
  sumR: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: Colors.line,
    paddingLeft: 24,
    gap: 4,
  },

  /* ── Chip inline ── */
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: Radii.full,
    paddingHorizontal: 11,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  chipText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
  },

  /* ── Metrics ── */
  metrics: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  m: { flex: 1, gap: 2 },
  mLab: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: Colors.muted,
  },
  mVal: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.ink,
    marginVertical: 2,
  },
  mTag: {
    fontFamily: Fonts.bold,
    fontSize: 12,
  },

  /* ── Status do veículo ── */
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusName: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.ink,
  },
  statusMsg: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
    marginTop: 14,
  },

  /* ── Agendamento ── */
  agWhen: {
    fontFamily: Fonts.extraBold,
    fontSize: 18,
    color: Colors.ink,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },

  /* ── Rows (pedidos e acompanhamento) ── */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  rowLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.ink,
  },
  rowCount: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.ink,
  },

  /* ── Quick action .qa ── */
  qa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: Radii.lg,
    padding: 20,
    paddingHorizontal: 24,
    ...Shadow.card,
  },
  qaIco: {
    width: 44,
    height: 44,
    borderRadius: Radii.lg,
    backgroundColor: Colors.redTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.ink,
  },
  qaSub: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.muted,
    marginTop: 2,
  },

  /* ── Banner ── */
  banner: {
    backgroundColor: Colors.dark,
    borderRadius: Radii.lg,
    paddingHorizontal: 32,
    paddingVertical: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
    ...Shadow.card,
  },
  bannerTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    color: '#fff',
    flex: 1,
    lineHeight: 26,
  },
  bannerLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bannerLink: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#FF5A68',
  },
});
