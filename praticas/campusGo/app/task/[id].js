import { useLocalSearchParams, router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefa número {id}</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#1c3d2d',
  },
});
