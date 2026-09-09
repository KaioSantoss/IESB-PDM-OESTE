import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
      <Text>Programação para Dispositivos Móveis</Text>
      <Text>Olá, Kaio Santos!</Text>
      <Text>Meu segundo passo com Expo e React Native</Text>
    </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0da6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
