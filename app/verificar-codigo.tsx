import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, Fonts, Radii } from '@/constants/theme';

const CODE_LENGTH = 6;

export default function VerificarCodigoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [codeError, setCodeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleDigit = useCallback(
    (text: string, index: number) => {
      const digit = text.replace(/\D/g, '').slice(-1);
      const next = [...digits];
      next[index] = digit;
      setDigits(next);
      if (codeError) setCodeError('');
      if (digit && index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [digits, codeError],
  );

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  async function handleVerificar() {
    const code = digits.join('');
    if (code.length < CODE_LENGTH) {
      setCodeError('Insira os 6 dígitos do código');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    router.replace('/(cliente)/dashboard');
  }

  async function handleReenviar() {
    if (resendCooldown > 0) return;
    await new Promise((r) => setTimeout(r, 500));
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const emailMasked = email
    ? email.replace(/(.{2}).+(@.+)/, '$1••••$2')
    : '••••@••••.com';

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
          <Text style={styles.title}>Verifique seu e-mail</Text>
          <Text style={styles.subtitle}>
            Enviamos um código de 6 dígitos para{' '}
            <Text style={styles.emailHighlight}>{emailMasked}</Text>
          </Text>
        </View>

        <View style={styles.codeRow}>
          {digits.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => { inputRefs.current[i] = ref; }}
              style={[
                styles.codeInput,
                digit ? styles.codeInputFilled : null,
                codeError ? styles.codeInputError : null,
              ]}
              value={digit}
              onChangeText={(t) => handleDigit(t, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
              accessibilityLabel={`Dígito ${i + 1}`}
            />
          ))}
        </View>
        {codeError ? <Text style={styles.errorText}>{codeError}</Text> : null}

        <TouchableOpacity
          style={[styles.btnPrimary, loading && styles.btnDisabled]}
          onPress={handleVerificar}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text style={styles.btnPrimaryText}>
            {loading ? 'Verificando...' : 'Verificar código'}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Não recebeu? </Text>
          {resendCooldown > 0 ? (
            <Text style={styles.resendCooldown}>Reenviar em {resendCooldown}s</Text>
          ) : (
            <Text style={styles.resendLink} onPress={handleReenviar}>Reenviar código</Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
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
  backArrow: { color: '#fff', fontSize: 18, lineHeight: 22 },
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
  emailHighlight: {
    fontFamily: Fonts.semiBold,
    color: Colors.ink,
  },
  codeRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  codeInput: {
    flex: 1,
    maxWidth: 52,
    height: 56,
    borderWidth: 1.5,
    borderColor: Colors.line,
    borderRadius: Radii.md,
    backgroundColor: Colors.soft,
    fontFamily: Fonts.extraBold,
    fontSize: 22,
    color: Colors.ink,
  },
  codeInputFilled: {
    borderColor: Colors.red,
    backgroundColor: Colors.redTint,
  },
  codeInputError: { borderColor: Colors.err },
  errorText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.err,
    textAlign: 'center',
    marginTop: -8,
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
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
  },
  resendLink: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.red,
  },
  resendCooldown: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.muted,
  },
});
