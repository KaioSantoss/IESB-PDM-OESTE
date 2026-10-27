import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const formatarData = data => {
  const dataObj = new Date(`${data}T00:00:00`);
  return new Intl.DateTimeFormat('pt-BR').format(dataObj);
};

const formatarMoeda = valor =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);

export default function DespesaItem({ despesa, onEditar, onExcluir }) {
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <View style={styles.detalhes}>
          <Text style={styles.descricao}>{despesa.descricao}</Text>
          <Text style={styles.data}>{formatarData(despesa.data)}</Text>
        </View>
        <Text style={styles.valor}>{formatarMoeda(despesa.valor)}</Text>
      </View>

      <View style={styles.rodape}>
        <View style={styles.categoriaContainer}>
          <Text style={styles.categoria}>{despesa.categoria}</Text>
        </View>

        <View style={styles.acoes}>
          <Pressable style={styles.botaoEditar} onPress={() => onEditar(despesa)}>
            <Text style={styles.textoBotao}>Editar</Text>
          </Pressable>
          <Pressable style={styles.botaoExcluir} onPress={() => onExcluir(despesa.id)}>
            <Text style={styles.textoBotaoExcluir}>Excluir</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#edf2ff',
    shadowColor: '#1f2a44',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detalhes: {
    flex: 1,
    marginRight: 16,
  },
  descricao: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 5,
  },
  data: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  valor: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  rodape: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriaContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoria: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  acoes: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoEditar: {
    backgroundColor: '#dbeafe',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  botaoExcluir: {
    backgroundColor: '#fee2e2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  textoBotao: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  textoBotaoExcluir: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
  },
});
