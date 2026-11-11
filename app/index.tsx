import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Radii } from '@/constants/theme';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { EyeOffIcon } from '@/components/icons/EyeOffIcon';
import { HeroBackground } from '@/components/login/HeroBackground';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [email, setEmail] = useState('ana.souza@email.com');
  const [password, setPassword] = useState('senha1234');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  function handleLogin() {
    if (!email.trim()) {
      setEmailError('Informe seu e-mail');
      return;
    }
    setEmailError('');
    router.replace('/(cliente)/dashboard');
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.hero}>
          <HeroBackground />
          <View style={styles.heroOverlay} />
          <View style={[styles.heroContent, { paddingTop: insets.top + 32 }]}>
            <Text style={styles.heroTitle}>Toyota Experience</Text>
            <Text style={styles.heroSub}>
              Do pedido à entrega, acompanhe cada etapa do seu Toyota.
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.form,
            { paddingBottom: Math.max(insets.bottom + 32, 48) },
          ]}
        >
          <View style={styles.formInner}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Bem-vindo</Text>
              <Text style={styles.formSub}>Faça login para continuar</Text>
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
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.pwWrapper}>
                <TextInput
                  style={[styles.input, styles.inputPw]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  placeholder="••••••••"
                  placeholderTextColor={Colors.muted}
                />
                <Pressable
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword((v) => !v)}
                  accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} color={Colors.muted} />
                  ) : (
                    <EyeIcon size={18} color={Colors.muted} />
                  )}
                </Pressable>
              </View>
            </View>

            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.btnPrimaryText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>
              <Text
                style={styles.registerLink}
                onPress={() => router.push('/esqueci-senha')}
              >
                Esqueci minha senha
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  hero: {
    minHeight: 260,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
    gap: 12,
  },
  heroTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
  },
  heroSub: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#D4D4D8',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },

  form: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  formInner: {
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
    gap: 20,
  },
  formHeader: { gap: 4 },
  formTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    letterSpacing: -0.5,
    color: Colors.ink,
  },
  formSub: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
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
  inputPw: { paddingRight: 46 },
  pwWrapper: { position: 'relative' },
  eyeBtn: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 32,
    height: 32,
    borderRadius: Radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  },
  btnPrimaryText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: '#fff',
  },

  registerText: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
  },
  registerLink: {
    fontFamily: Fonts.bold,
    color: Colors.red,
  },
});
