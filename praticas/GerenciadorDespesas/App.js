import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import DespesasRecentes from './components/DespesasRecentes';
import GerenciarDespesa from './components/GerenciarDespesa';
import TodasDespesas from './components/TodasDespesas';

const gerarId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const criarDespesaInicial = (descricao, valor, diasAtras, categoria) => {
  const data = new Date();
  data.setDate(data.getDate() - diasAtras);

  return {
    id: gerarId(),
    descricao,
    valor,
    data: `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`,
    categoria,
  };
};

const despesasIniciais = [
  criarDespesaInicial('Mercado', 180.5, 1, 'Alimentação'),
  criarDespesaInicial('Uber para trabalho', 42.0, 2, 'Transporte'),
  criarDespesaInicial('Cinema', 38.9, 6, 'Lazer'),
  criarDespesaInicial('Internet', 89.9, 9, 'Contas'),
  criarDespesaInicial('Padaria', 25.0, 12, 'Alimentação'),
];

export default function App() {
  const [despesas, setDespesas] = useState(despesasIniciais);
  const [abaAtiva, setAbaAtiva] = useState('recentes');
  const [despesaEditando, setDespesaEditando] = useState(null);

  const contagemTotal = useMemo(
    () => despesas.reduce((total, despesa) => total + despesa.valor, 0),
    [despesas]
  );

  const salvarDespesa = payload => {
    if (despesaEditando) {
      setDespesas(prev =>
        prev.map(item =>
          item.id === despesaEditando.id ? { ...item, ...payload } : item
        )
      );
    } else {
      setDespesas(prev => [{ id: gerarId(), ...payload }, ...prev]);
    }

    setAbaAtiva('recentes');
    setDespesaEditando(null);
  };

  const excluirDespesa = id => {
    Alert.alert('Excluir despesa', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setDespesas(prev => prev.filter(item => item.id !== id));
          if (despesaEditando && despesaEditando.id === id) {
            setDespesaEditando(null);
          }
        },
      },
    ]);
  };

  const abrirFormularioEdicao = despesa => {
    setDespesaEditando(despesa);
    setAbaAtiva('formulario');
  };

  const voltarParaListagem = () => {
    setAbaAtiva('recentes');
    setDespesaEditando(null);
  };

  const renderConteudo = () => {
    if (abaAtiva === 'formulario') {
      return (
        <GerenciarDespesa
          despesaEditando={despesaEditando}
          onSalvar={salvarDespesa}
          onCancelar={voltarParaListagem}
        />
      );
    }

    if (abaAtiva === 'todas') {
      return (
        <TodasDespesas
          despesas={despesas}
          onEditar={abrirFormularioEdicao}
          onExcluir={excluirDespesa}
        />
      );
    }

    return (
      <DespesasRecentes
        despesas={despesas}
        onEditar={abrirFormularioEdicao}
        onExcluir={excluirDespesa}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.emoji}>💸</Text>
        <View style={styles.headerText}>
          <Text style={styles.titulo}>Minhas Despesas</Text>
          <Text style={styles.subtitulo}>
            Total geral: {contagemTotal.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => setAbaAtiva('recentes')}
          style={[styles.tab, abaAtiva === 'recentes' && styles.tabAtiva]}
        >
          <Text style={[styles.tabTexto, abaAtiva === 'recentes' && styles.tabTextoAtivo]}>
            Recentes
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setAbaAtiva('todas')}
          style={[styles.tab, abaAtiva === 'todas' && styles.tabAtiva]}
        >
          <Text style={[styles.tabTexto, abaAtiva === 'todas' && styles.tabTextoAtivo]}>
            Todas
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setDespesaEditando(null);
            setAbaAtiva('formulario');
          }}
          style={[styles.tab, abaAtiva === 'formulario' && styles.tabAtiva, styles.tabNovo]}
        >
          <Text style={[styles.tabTexto, abaAtiva === 'formulario' && styles.tabTextoAtivo]}>
            + Novo
          </Text>
        </Pressable>
      </View>

      {renderConteudo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4ff',
  },
  header: {
    backgroundColor: '#1d4ed8',
    paddingTop: 54,
    paddingBottom: 22,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 15,
    color: '#dbeafe',
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8fbff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dfeafc',
    gap: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: '#eaf1ff',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  tabAtiva: {
    backgroundColor: '#dbeafe',
    borderColor: '#bfdbfe',
  },
  tabNovo: {
    backgroundColor: '#dff9eb',
    borderColor: '#bbf7d0',
  },
  tabTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  tabTextoAtivo: {
    color: '#1d4ed8',
  },
});
