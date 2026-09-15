import React, { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

import {
  tituloApp,
  placeholderCompromisso,
  botaoAdicionar,
  tituloLista,
  listaVazia,
  contadorPendentes,
} from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);

  /*
   * AULA 06
   * Carregamento dos compromissos salvos.
   *
   * Esse useEffect executa uma vez quando o aplicativo
   * é iniciado.
   */
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);

        if (dados !== null) {
          const listaSalva = JSON.parse(dados);
          setCompromissos(listaSalva);
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar os compromissos salvos.'
        );
      }
    }

    carregarCompromissos();
  }, []);

  /*
   * AULA 06
   * Salvamento automático da lista.
   *
   * Sempre que compromissos mudar, o array é convertido
   * para JSON e salvo no AsyncStorage.
   */
  useEffect(() => {
    async function salvarCompromissos() {
      try {
        const dados = JSON.stringify(compromissos);

        await AsyncStorage.setItem(
          STORAGE_KEY,
          dados
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar os compromissos.'
        );
      }
    }

    salvarCompromissos();
  }, [compromissos]);

  const adicionarCompromisso = () => {
    const textoLimpo = texto.trim();

    if (textoLimpo === '') {
      Alert.alert(
        'Atenção',
        'Digite um compromisso antes de adicionar.'
      );
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toLocaleString('pt-BR'),
      concluido: false,
    };

    setCompromissos((listaAtual) => [
      ...listaAtual,
      novoCompromisso,
    ]);

    setTexto('');
  };

  const removerCompromisso = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id)
    );
  };

  const alternarConcluido = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id
          ? {
              ...item,
              concluido: !item.concluido,
            }
          : item
      )
    );
  };

  const pendentes = compromissos.filter(
    (item) => !item.concluido
  ).length;

  const labels = {
    placeholderCompromisso,
    botaoAdicionar,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* CABEÇALHO */}
          <View style={styles.header}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
            />

            <View style={styles.headerText}>
              <Text style={styles.title}>
                {tituloApp}
              </Text>

              <Text style={styles.subtitle}>
                Organize sua rotina acadêmica
              </Text>

              <Text style={styles.counter}>
                {pendentes} {contadorPendentes}
              </Text>
            </View>
          </View>

          {/* FORMULÁRIO */}
          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarCompromisso}
            labels={labels}
          />

          {/* LISTA */}
          <CompromissoList
            itens={compromissos}
            onDelete={removerCompromisso}
            onToggle={alternarConcluido}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
          />

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 15,
    marginRight: 15,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222222',
  },

  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 3,
  },

  counter: {
    fontSize: 13,
    color: '#444444',
    marginTop: 5,
    fontWeight: 'bold',
  },
});