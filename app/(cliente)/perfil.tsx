/**
 * Perfil do Cliente
 * TODO: Implementar — ver HTML original: função cPerfil()
 */
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil · em breve</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.muted,
  },
});
