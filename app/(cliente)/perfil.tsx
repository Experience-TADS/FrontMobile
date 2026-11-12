import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { Colors, Fonts, Radii, Shadow } from '@/constants/theme';
import { CURRENT_USER, ini } from '@/constants/data';
import { clearAuthToken, getApiErrorMessage } from '@/services/api';

type TabKey = 'senha' | 'end' | 'tel';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'senha', label: 'Senha' },
  { key: 'end', label: 'Endereços' },
  { key: 'tel', label: 'Telefones' },
];

const ENDERECOS = [
  { cep: '18035-000', log: 'Rua das Acácias', n: '120', bairro: 'Jardim Europa', cidade: 'Sorocaba', uf: 'SP' },
];

const TELEFONES = ['(15) 99876-5432'];

function PlusIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

function LogoutIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke={Colors.red} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9 21H5V3h4" />
      <Path d="M16 17l5-5-5-5M21 12H9" />
    </Svg>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

function Field({ label, value, secureTextEntry, keyboardType, placeholder }: {
  label: string;
  value?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  placeholder?: string;
}) {
  const [val, setVal] = useState(value ?? '');
  return (
    <View style={styles.field}>
      <FieldLabel>{label}</FieldLabel>
      <TextInput
        style={styles.input}
        value={val}
        onChangeText={setVal}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ?? 'default'}
        placeholder={placeholder}
        placeholderTextColor={Colors.muted}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>('senha');
  const [logoutError, setLogoutError] = useState('');
  const me = CURRENT_USER;

  async function handleSignOut() {
    setLogoutError('');
    try {
      await clearAuthToken();
      router.replace('/');
    } catch (error) {
      setLogoutError(getApiErrorMessage(error));
    }
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* ── Page header ── */}
      <View style={styles.pageHeader}>
        <Text style={styles.phTitle}>Perfil</Text>
        <View style={styles.phDivider} />
      </View>

      <View style={styles.stack}>

        {/* ── Avatar + nome + chip ── */}
        <View style={styles.avatarRow}>
          <View style={styles.av}>
            <Text style={styles.avText}>{ini(me.n)}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.avName}>{me.n}</Text>
            <Text style={styles.avEmail}>{me.e}</Text>
            <View style={{ marginTop: 6 }}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>CLIENTE</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Tabs ── */}
        <View style={styles.tabsRow}>
          {TABS.map(t => (
            <TouchableOpacity
              key={t.key}
              style={styles.tabBtn}
              onPress={() => setTab(t.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabLabel, tab === t.key && styles.tabLabelOn]}>
                {t.label}
              </Text>
              <View style={[styles.tabLine, tab === t.key && styles.tabLineOn]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* ══════════ TAB: SENHA ══════════ */}
        {tab === 'senha' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Alterar senha</Text>
            <View style={styles.fgrid}>
              <View style={styles.fgridCol}>
                <Field label="Senha atual" secureTextEntry />
              </View>
              <View style={styles.fgridCol}>
                <Field label="Nova senha" secureTextEntry />
              </View>
              <View style={styles.fgridCol}>
                <Field label="Confirmar nova senha" secureTextEntry />
              </View>
            </View>
            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85}>
              <Text style={styles.btnPrimaryText}>Salvar nova senha</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ══════════ TAB: ENDEREÇOS ══════════ */}
        {tab === 'end' && (
          <View style={{ gap: 16 }}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Endereços cadastrados</Text>
              {ENDERECOS.map((e, i) => (
                <View key={i} style={[styles.row, i === 0 && { borderTopWidth: 0 }]}>
                  <View>
                    <Text style={styles.rowTitle}>{e.log}, {e.n}</Text>
                    <Text style={styles.smT}>{e.bairro} · {e.cidade}/{e.uf} · CEP {e.cep}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Adicionar endereço</Text>
              <View style={styles.fgrid}>
                <View style={styles.fgridCol}>
                  <Field label="CEP" placeholder="00000-000" keyboardType="numeric" />
                </View>
                <View style={styles.fgridCol}>
                  <Field label="Logradouro" />
                </View>
                <View style={styles.fgridCol}>
                  <Field label="Nº" />
                </View>
                <View style={styles.fgridCol}>
                  <Field label="Bairro" />
                </View>
                <View style={styles.fgridCol}>
                  <Field label="Cidade" />
                </View>
                <View style={styles.fgridCol}>
                  <Field label="Estado" placeholder="SP" />
                </View>
              </View>
              <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85}>
                <PlusIcon />
                <Text style={styles.btnPrimaryText}>Adicionar endereço</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ══════════ TAB: TELEFONES ══════════ */}
        {tab === 'tel' && (
          <View style={{ gap: 16 }}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Telefones</Text>
              {TELEFONES.map((tel, i) => (
                <View key={i} style={[styles.row, i === 0 && { borderTopWidth: 0 }]}>
                  <Text style={styles.telMono}>{tel}</Text>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Adicionar telefone</Text>
              <Field
                label="Telefone"
                placeholder="(00) 00000-0000"
                keyboardType="phone-pad"
              />
              <TouchableOpacity style={[styles.btnPrimary, { marginTop: 24 }]} activeOpacity={0.85}>
                <PlusIcon />
                <Text style={styles.btnPrimaryText}>Adicionar telefone</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── Botão sair ── */}
        <TouchableOpacity
          style={styles.btnOut}
          onPress={handleSignOut}
          activeOpacity={0.85}
        >
          <LogoutIcon />
          <Text style={styles.btnOutText}>Sair da conta</Text>
        </TouchableOpacity>
        {logoutError ? <Text style={styles.errorText}>{logoutError}</Text> : null}

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
  phDivider: {
    height: 3,
    backgroundColor: Colors.red,
    borderRadius: 2,
    marginTop: 16,
  },

  stack: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 24,
  },

  /* ── Avatar ── */
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
  av: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avText: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    color: '#fff',
  },
  avName: {
    fontFamily: Fonts.extraBold,
    fontSize: 22,
    color: Colors.ink,
  },
  avEmail: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
    marginTop: 2,
  },
  chip: {
    backgroundColor: Colors.info + '22',
    borderRadius: Radii.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.info,
  },

  /* ── Tabs ── */
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    marginTop: -8,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    position: 'relative',
  },
  tabLabel: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
  },
  tabLabelOn: { color: Colors.red },
  tabLine: {
    position: 'absolute',
    bottom: -1,
    left: 4,
    right: 4,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  tabLineOn: { backgroundColor: Colors.red },

  /* ── Card genérico ── */
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

  /* ── Form grid ── */
  fgrid: {
    gap: 16,
    marginBottom: 24,
  },
  fgridCol: {
    width: '100%',
  },
  field: { gap: 6 },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    color: Colors.ink,
  },
  input: {
    height: 44,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: Colors.line,
    borderRadius: Radii.md,
    backgroundColor: Colors.surface,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.ink,
  },
  smT: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
  },

  /* ── Rows (endereços/telefones) ── */
  row: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  rowTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.ink,
  },
  telMono: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.ink,
  },

  /* ── Botões ── */
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
    borderRadius: Radii.md,
    backgroundColor: Colors.red,
  },
  btnPrimaryText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#fff',
  },
  btnOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.red,
    backgroundColor: 'transparent',
  },
  btnOutText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.red,
  },
  errorText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.err,
  },
});
