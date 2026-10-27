import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../services/location';
import { scheduleReminder } from '../services/notifications';

const initialTasks = [
  { id: '1', title: 'Revisar conteúdo da aula' },
  { id: '2', title: 'Entregar tarefa de laboratório' },
  { id: '3', title: 'Estudar para a prova' },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState(initialTasks);
  const [locationMessage, setLocationMessage] = useState('');

  useEffect(() => {
    const liveTasks = globalThis.__CAMPUSGO_TASKS__ || [];
    if (liveTasks.length) {
      setTasks(prev => {
        const ids = new Set(prev.map(task => task.id));
        const merged = [...prev];
        liveTasks.forEach(task => {
          if (!ids.has(task.id)) {
            merged.push(task);
          }
        });
        return merged;
      });
    }
  }, []);

  const handleCheckIn = async () => {
    const place = await getCurrentPlace();

    if (!place) {
      Alert.alert('Permissão necessária', 'A permissão de localização é necessária para registrar o seu check-in.');
      return;
    }

    const message = place.label || 'Você está em um local registrado.';
    setLocationMessage(message);
    Alert.alert('Estudei aqui', message);
  };

  const handleReminder = async () => {
    const result = await scheduleReminder('CampusGo', 10);
    Alert.alert(result.success ? 'Lembrete agendado' : 'Problema no lembrete', result.message);
  };

  const handleComplete = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.log('Haptics indisponível:', error);
    } finally {
      Alert.alert('Tarefa concluída');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas tarefas</Text>

      <View style={styles.actionsRow}>
        <Button title="Nova tarefa" onPress={() => router.push('/new-task')} />
        <Button title="Abrir /task/42" onPress={() => router.push('/task/42')} />
      </View>

      <View style={styles.actionButtons}>
        <Pressable style={styles.primaryButton} onPress={handleCheckIn}>
          <Text style={styles.primaryButtonText}>Estudei aqui</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={handleReminder}>
          <Text style={styles.secondaryButtonText}>Lembrar em 10 s</Text>
        </Pressable>
        <Pressable style={styles.successButton} onPress={handleComplete}>
          <Text style={styles.successButtonText}>Concluir</Text>
        </Pressable>
      </View>

      {locationMessage ? (
        <View style={styles.locationCard}>
          <Text style={styles.locationText}>{locationMessage}</Text>
        </View>
      ) : null}

      <FlatList
        data={tasks}
        keyExtractor={item => `task-${item.id}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/task/[id]', params: { id: item.id } }} asChild>
            <Pressable style={styles.taskItem}>
              <Text style={styles.taskText}>{item.title}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f2',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1b3d2d',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  actionButtons: {
    gap: 10,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#1f7a4d',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#dfe9e1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1b3d2d',
    fontWeight: '700',
  },
  successButton: {
    backgroundColor: '#2e8b57',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  successButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  locationCard: {
    backgroundColor: '#e9f5ef',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  locationText: {
    color: '#1d4d3a',
    fontWeight: '600',
  },
  list: {
    paddingTop: 8,
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderColor: '#dfe9e1',
    borderWidth: 1,
  },
  taskText: {
    color: '#163a2a',
    fontWeight: '600',
  },
});
