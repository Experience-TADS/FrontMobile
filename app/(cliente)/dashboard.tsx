import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';import { Colors, Fonts, Radii, Shadow } from '@/constants/theme';
import { Card, CardHeader } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ChevronIcon } from '@/components/icons/ChevronIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import {
  STATUS, TIPO, AST, VEI, PED, AG, LV,
  CURRENT_USER, brl, fmtN, fdShort, ft, hoje,
  saldo, lvIdx, lvPct, lvNext, nextAg, daysSince,
} from '@/constants/data';

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
      contentContainerStyle={[
        styles.content,
        { paddingTop: 20, paddingBottom: insets.bottom + 96 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.phTitle}>Olá, Ana!</Text>
          <Text style={styles.phSub}>{hoje()}</Text>
        </View>
        <TouchableOpacity
          style={styles.phBtn}
          onPress={() => router.push('/(cliente)/rastreamento')}
          activeOpacity={0.85}
        >
          <Text style={styles.phBtnText}>Acompanhar fabricação</Text>
          <ChevronIcon size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <Card style={styles.mb24}>
        <CardHeader title="Resumo do pedido" action={<Text style={styles.smT}>Pedido #{p.id}</Text>} />
        <View style={styles.sumRow}>
          <View style={{ flex: 1.3 }}>
            <Text style={styles.smT}>Valor total</Text>
            <Text style={styles.bigNum}>{brl(p.valor)}</Text>
            <Text style={styles.sumDesc}>{p.modelo} {p.versao} {p.ano} · {p.cor}</Text>
          </View>
          <View style={styles.sumRight}>
            <Text style={styles.smT}>Etapa de fabricação</Text>
            <Text style={styles.bigNum}>
              {v.etapa + 1}
              <Text style={styles.bigNumMuted}>/9</Text>
            </Text>
            <Chip label={st.l} color={st.c} />
          </View>
        </View>
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Text style={styles.metricLab}>Progresso</Text>
            <Text style={styles.metricVal}>{pct}%</Text>
            <Text style={[styles.metricTag, { color: Colors.ok }]}>No prazo</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLab}>Dias em produção</Text>
            <Text style={styles.metricVal}>{daysSince(v.hist[0])}</Text>
            <Text style={[styles.metricTag, { color: Colors.ok }]}>Ótimo</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLab}>Chassi</Text>
            <Text style={styles.metricVal}>{v.chassi}</Text>
            <Text style={[styles.metricTag, { color: Colors.muted }]}>Identificação</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.mb24}>
        <CardHeader
          title="Status do veículo"
          action={
            <TouchableOpacity onPress={() => router.push('/(cliente)/rastreamento')}>
              <Text style={styles.link}>Ver detalhes</Text>
            </TouchableOpacity>
          }
        />
        <View style={styles.statusRow}>
          <Text style={styles.statusName}>{st.l}</Text>
          <Text style={styles.smT}>Etapa {v.etapa + 1} de 9</Text>
        </View>
        <ProgressBar progress={pct} height={8} />
        <Text style={styles.statusMsg}>{st.msg}</Text>
      </Card>

      <Card style={styles.mb24}>
        <CardHeader title="Próximo agendamento" />
        {ag ? (
          <View style={{ gap: 8 }}>
            <Text style={styles.agWhen}>{fdShort(ag.dt)} · {ft(ag.dt)}</Text>
            <View style={styles.chipRow}>
              <Chip label={TIPO[ag.tipo].l} color={TIPO[ag.tipo].c} />
              <Chip label={AST[ag.status].l} color={AST[ag.status].c} dot />
            </View>
            <Text style={styles.smT}>Vendedor: {ag.vend}</Text>
          </View>
        ) : (
          <Text style={styles.smT}>Nenhum agendamento futuro.</Text>
        )}
      </Card>

      <Card style={styles.mb24}>
        <CardHeader
          title="Recompensas"
          action={
            <TouchableOpacity onPress={() => router.push('/(cliente)/recompensas')}>
              <Text style={styles.link}>Ver bônus</Text>
            </TouchableOpacity>
          }
        />
        <Text style={styles.bigNum}>
          {fmtN(saldo())}
          <Text style={styles.bigNumMuted}> pts</Text>
        </Text>
        <View style={{ marginVertical: 8 }}>
          <Chip label={`Nível ${lv.n}`} color={lv.c} dot />
        </View>
        <ProgressBar progress={lvPct()} height={8} />
        <Text style={styles.smTmt}>{lvNext()}</Text>
      </Card>

      <Card style={styles.mb24}>
        <CardHeader title="Pedidos e acompanhamento" />
        <TouchableOpacity
          style={styles.listRow}
          onPress={() => router.push('/(cliente)/meus-pedidos')}
          activeOpacity={0.7}
        >
          <Text style={styles.listLabel}>Pedidos ativos</Text>
          <Text style={styles.listCount}>{pedidosAtivos}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listRow}
          onPress={() => router.push('/(cliente)/rastreamento')}
          activeOpacity={0.7}
        >
          <Text style={styles.listLabel}>Veículos em fabricação</Text>
          <Text style={styles.listCount}>{veiculosFab}</Text>
        </TouchableOpacity>
        <View style={styles.listRow}>
          <Text style={styles.listLabel}>Agendamentos pendentes</Text>
          <Text style={styles.listCount}>{agendPend}</Text>
        </View>
      </Card>

      <TouchableOpacity
        style={styles.qaBtn}
        onPress={() => router.push('/(cliente)/agendamentos')}
        activeOpacity={0.7}
      >
        <View style={styles.qaIcon}>
          <CalendarIcon size={22} color={Colors.red} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.qaTitle}>Meus agendamentos</Text>
          <Text style={styles.qaSub}>Visitas, test drives e entregas</Text>
        </View>
        <ChevronIcon size={18} color={Colors.muted} />
      </TouchableOpacity>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Seu Toyota está sendo fabricado com precisão.
        </Text>
        <TouchableOpacity onPress={() => router.push('/(cliente)/rastreamento')} activeOpacity={0.7}>
          <Text style={styles.bannerLink}>Acompanhar fabricação</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  content: { paddingHorizontal: 20 },
  mb24: { marginBottom: 24 },

  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
    flexWrap: 'wrap',
    paddingBottom: 16,
    marginBottom: 28,
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
  phBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: Radii.md,
    backgroundColor: Colors.red,
  },
  phBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: '#fff',
  },

  bigNum: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    letterSpacing: -0.4,
    color: Colors.ink,
    lineHeight: 26,
  },
  bigNumMuted: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
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

  sumRow: { flexDirection: 'row', gap: 24 },
  sumRight: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: Colors.line,
    paddingLeft: 24,
    gap: 4,
  },
  sumDesc: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.muted,
    marginTop: 2,
  },

  metrics: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  metric: { flex: 1, gap: 2 },
  metricLab: {
    fontFamily: Fonts.semiBold,
    fontSize: 11,
    color: Colors.muted,
  },
  metricVal: {
    fontFamily: Fonts.bold,
    fontSize: 17,
    color: Colors.ink,
    marginVertical: 2,
  },
  metricTag: {
    fontFamily: Fonts.bold,
    fontSize: 11,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusName: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.ink,
  },
  statusMsg: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
    marginTop: 14,
    lineHeight: 20,
  },

  agWhen: {
    fontFamily: Fonts.extraBold,
    fontSize: 15,
    color: Colors.ink,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },

  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  listLabel: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.ink,
  },
  listCount: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.ink,
  },

  qaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    ...Shadow.card,
  },
  qaIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
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
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
  },

  banner: {
    backgroundColor: Colors.dark,
    borderRadius: 12,
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
    fontSize: 16,
    color: '#fff',
    flex: 1,
    flexWrap: 'wrap',
  },
  bannerLink: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: '#FF5A68',
  },
});
