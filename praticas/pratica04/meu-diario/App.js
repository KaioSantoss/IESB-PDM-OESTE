import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  ADD_BUTTON,
  LIST_TITLE,
} from './labels';

export default function App() {
  const [disciplina, setDisciplina] = useState('');

  const disciplinas = [
    'Programação para Dispositivos Móveis',
    'Engenharia de Software',
    'Banco de Dados',
    'Inteligência Artificial',
  ];

  function handleAdd() {
    if (disciplina.trim() === '') {
      return;
    }

    console.log('Disciplina cadastrada:', disciplina);

    setDisciplina('');
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>{APP_TITLE}</Text>
        <Text style={styles.subtitle}>
          Organize suas disciplinas do semestre
        </Text>
      </View>

      {/* 
        Row coloca o input e o botão lado a lado.
        alignItems centraliza os elementos verticalmente.
      */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={INPUT_PLACEHOLDER}
          placeholderTextColor="#777"
          value={disciplina}
          onChangeText={setDisciplina}
        />

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleAdd}
        >
          <Text style={styles.addButtonText}>
            {ADD_BUTTON}
          </Text>
        </Pressable>
      </View>

      {/* Lista */}
      <Text style={styles.listTitle}>{LIST_TITLE}</Text>

      <View style={styles.list}>
        {disciplinas.map((item, index) => (
          <View style={styles.item} key={index}>
            <View style={styles.number}>
              <Text style={styles.numberText}>
                {index + 1}
              </Text>
            </View>

            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 22,
    paddingTop: 45,
    paddingBottom: 22,
  },

  header: {
    marginBottom: 30,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
  },

  subtitle: {
    color: '#777',
    fontSize: 14,
    marginTop: 6,
  },

  inputRow: {
    flexDirection: 'row',

    // Centraliza input e botão verticalmente.
    alignItems: 'center',

    marginBottom: 30,
  },

  input: {
    width: '72%',
    height: 52,

    backgroundColor: '#151515',

    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,

    paddingHorizontal: 15,

    color: '#fff',
    fontSize: 15,
  },

  addButton: {
    width: '25%',
    height: 52,

    marginLeft: '3%',

    backgroundColor: '#fff',
    borderRadius: 12,

    // Centraliza o texto horizontal e verticalmente.
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },

  addButtonText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
  },

  listTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },

  list: {
    flex: 1,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 12,
    padding: 15,

    backgroundColor: '#151515',

    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 14,
  },

  number: {
    width: 38,
    height: 38,

    borderRadius: 10,
    backgroundColor: '#242424',

    // Centraliza o número dentro do quadrado.
    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  numberText: {
    color: '#aaa',
    fontWeight: '700',
  },

  itemText: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },
});