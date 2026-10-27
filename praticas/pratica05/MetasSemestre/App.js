import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);

  // CARREGAR METAS AO ABRIR O APLICATIVO
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);

        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar suas metas.'
        );
      }
    }

    carregarMetas();
  }, []);

  // SALVAR METAS SEMPRE QUE A LISTA FOR ALTERADA
  useEffect(() => {
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(metas)
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar suas metas.'
        );
      }
    }

    salvarMetas();
  }, [metas]);

  function adicionarMeta() {
    const textoLimpo = texto.trim();

    if (textoLimpo === '') {
      Alert.alert(
        'Atenção',
        'Digite uma meta antes de adicionar.'
      );
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toLocaleDateString('pt-BR'),
    };

    setMetas((metasAtuais) => [
      ...metasAtuais,
      novaMeta,
    ]);

    setTexto('');
  }

  function excluirMeta(id) {
    Alert.alert(
      'Excluir meta',
      'Deseja realmente excluir esta meta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setMetas((metasAtuais) =>
              metasAtuais.filter((meta) => meta.id !== id)
            );
          },
        },
      ]
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          <View style={styles.header}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
            />

            <View>
              <Text style={styles.title}>
                MetasSemestre
              </Text>

              <Text style={styles.subtitle}>
                Organize seus objetivos acadêmicos
              </Text>
            </View>
          </View>

          <MetaInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarMeta}
          />

          <Text style={styles.listTitle}>
            Minhas metas
          </Text>

          <MetaList
            metas={metas}
            onDelete={excluirMeta}
          />

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#141414',
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    width: 55,
    height: 55,
    marginRight: 12,
    borderRadius: 12,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0099ff',
  },

  subtitle: {
    marginTop: 3,
    color: '#b3b3b3',
    fontSize: 13,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0099ff',
  },
});