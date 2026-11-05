import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Radii } from '@/constants/theme';

export default function EsqueciSenhaScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    if (!email.trim()) {
      setEmailError('Informe seu e-mail');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('E-mail inválido');
      return false;
    }
    setEmailError('');
    return true;
  }

  async function handleEnviar() {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push({
      pathname: '/verificar-codigo',
      params: { email: email.trim() },
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Toyota Experience</Text>
      </View>

      <View
        style={[
          styles.body,
          { paddingBottom: Math.max(insets.bottom + 32, 48) },
        ]}
      >
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Esqueci minha senha</Text>
          <Text style={styles.subtitle}>
            Informe o e-mail cadastrado e enviaremos um código de verificação.
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (emailError) setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            placeholder="seu@email.com"
            placeholderTextColor={Colors.muted}
            returnKeyType="send"
            onSubmitEditing={handleEnviar}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.btnPrimary, loading && styles.btnDisabled]}
          onPress={handleEnviar}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text style={styles.btnPrimaryText}>
            {loading ? 'Enviando...' : 'Enviar código'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.backText}>
          Lembrou a senha?{' '}
          <Text style={styles.backLink} onPress={() => router.back()}>
            Entrar
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 24,
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 22,
  },
  headerTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 18,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#fff',
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 36,
    gap: 20,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  titleBlock: { gap: 8, marginBottom: 4 },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 26,
    letterSpacing: -0.5,
    color: Colors.ink,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
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
  inputError: { borderColor: Colors.err },
  errorText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.err,
  },
  btnPrimary: {
    height: 48,
    borderRadius: Radii.md,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: '#fff',
  },
  backText: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
  },
  backLink: {
    fontFamily: Fonts.bold,
    color: Colors.red,
  },
});
