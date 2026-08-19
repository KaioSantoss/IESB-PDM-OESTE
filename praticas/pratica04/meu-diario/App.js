import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleAdd() {
    if (taskText.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskText.trim(),
    };

    setTasks([...tasks, newTask]);
    setTaskText('');
  }

  function handleDelete(id) {
    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá! 👋</Text>
            <Text style={styles.title}>Meu Diário</Text>
            <Text style={styles.subtitle}>
              Organize suas tarefas do dia
            </Text>
          </View>

          <View style={styles.counter}>
            <Text style={styles.counterNumber}>{tasks.length}</Text>
            <Text style={styles.counterText}>tarefas</Text>
          </View>
        </View>

        {/* Campo de adicionar */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="O que você precisa fazer?"
            placeholderTextColor="#777"
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={handleAdd}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdd}
            activeOpacity={0.7}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Título da lista */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Minhas tarefas</Text>

          {tasks.length > 0 && (
            <Text style={styles.sectionCount}>
              {tasks.length} {tasks.length === 1 ? 'item' : 'itens'}
            </Text>
          )}
        </View>

        {/* Lista vazia */}
        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyEmoji}>✓</Text>
            </View>

            <Text style={styles.emptyTitle}>
              Tudo tranquilo por aqui!
            </Text>

            <Text style={styles.emptyText}>
              Adicione sua primeira tarefa usando o campo acima.
            </Text>
          </View>
        ) : (
          /* Lista de tarefas */
          <View style={styles.taskList}>
            {tasks.map((item, index) => (
              <View style={styles.card} key={item.id}>

                <View style={styles.numberContainer}>
                  <Text style={styles.number}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </View>

                <Text style={styles.taskText}>
                  {item.title}
                </Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.deleteText}>×</Text>
                </TouchableOpacity>

              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },

  content: {
    padding: 22,
    paddingBottom: 40,
  },

  /* CABEÇALHO */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },

  greeting: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },

  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },

  subtitle: {
    color: '#777',
    fontSize: 14,
    marginTop: 5,
  },

  counter: {
    width: 68,
    height: 68,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterNumber: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '800',
  },

  counterText: {
    color: '#777',
    fontSize: 11,
    marginTop: 1,
  },

  /* INPUT */

  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },

  input: {
    flex: 1,
    height: 58,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 17,
    paddingHorizontal: 18,
    color: '#fff',
    fontSize: 15,
  },

  addButton: {
    width: 58,
    height: 58,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: '#000',
    fontSize: 32,
    fontWeight: '300',
    marginTop: -2,
  },

  /* TÍTULO DA LISTA */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
  },

  sectionCount: {
    color: '#666',
    fontSize: 13,
  },

  /* LISTA VAZIA */

  emptyContainer: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 22,
    padding: 35,
    alignItems: 'center',
    marginTop: 5,
  },

  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#1d1d1d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  emptyEmoji: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
  },

  emptyTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },

  emptyText: {
    color: '#666',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },

  /* CARDS */

  taskList: {
    gap: 12,
  },

  card: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 18,
    padding: 12,
  },

  numberContainer: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  number: {
    color: '#777',
    fontSize: 12,
    fontWeight: '700',
  },

  taskText: {
    flex: 1,
    color: '#f2f2f2',
    fontSize: 15,
    lineHeight: 21,
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  deleteText: {
    color: '#999',
    fontSize: 25,
    fontWeight: '300',
    marginTop: -2,
  },
});