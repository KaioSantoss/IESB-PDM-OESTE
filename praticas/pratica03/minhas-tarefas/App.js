import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.titulo}>Minhas Tarefas</Text>

      {/* adicionar tarefa */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
        />

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Tarefa 1 */}
      <View style={styles.card}>
        <Text style={styles.tarefa}>
          Fazer o trabalho de Programação para Dispositivos Móveis
        </Text>

        <Text style={styles.excluir}>X</Text>
      </View>

      {/* Tarefa 2 */}
      <View style={styles.card}>
        <Text style={styles.tarefa}>
          Estudar React Native e aprender mais sobre componentes
        </Text>

        <Text style={styles.excluir}>X</Text>
      </View>

      {/* Tarefa 3 */}
      <View style={styles.card}>
        <Text style={styles.tarefa}>
          Entregar atividade da faculdade até sexta-feira
        </Text>

        <Text style={styles.excluir}>X</Text>
      </View>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    padding: 20,
  },

  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 25,
    textAlign: 'center',
  },

  inputArea: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2f00ff',
    borderRadius: 8,
    padding: 12,
  },

  botao: {
    backgroundColor: '#2f00ff',
    width: 50,
    marginLeft: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 25,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  tarefa: {
    flex: 1,
    fontSize: 16,
  },

  excluir: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});