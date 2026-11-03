/**
 * Catálogo de Produtos
 * TODO: Implementar — ver HTML original: função cCat()
 */
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

export default function CatalogoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Catálogo · em breve</Text>
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
