import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

export default function NewTaskScreen() {
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const trimmed = title.trim();

    if (!trimmed) {
      Alert.alert('Informe uma tarefa', 'O nome da tarefa não pode ficar vazio.');
      return;
    }

    const createdTask = {
      id: String(Date.now()),
      title: trimmed,
    };

    if (globalThis.__CAMPUSGO_TASKS__) {
      globalThis.__CAMPUSGO_TASKS__.push(createdTask);
    }

    Alert.alert('Sucesso', `Tarefa "${trimmed}" criada.`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da tarefa"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Salvar tarefa" onPress={handleCreate} />
      <View style={styles.closeWrap}>
        <Button title="Fechar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f7f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1c3d2d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d5e5d8',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
  },
  closeWrap: {
    marginTop: 16,
  },
});
