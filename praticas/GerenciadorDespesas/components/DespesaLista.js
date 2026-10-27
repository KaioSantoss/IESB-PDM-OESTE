import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas, onEditar, onExcluir }) {
  const despesasOrdenadas = [...despesas].sort(
    (a, b) => new Date(b.data) - new Date(a.data)
  );

  return (
    <View style={styles.container}>
      {despesasOrdenadas.length === 0 ? (
        <View style={styles.vazioContainer}>
          <Text style={styles.vazioTexto}>Nenhuma despesa encontrada.</Text>
        </View>
      ) : (
        <FlatList
          data={despesasOrdenadas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DespesaItem
              despesa={item}
              onEditar={onEditar}
              onExcluir={onExcluir}
            />
          )}
          contentContainerStyle={styles.listaContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listaContent: {
    paddingBottom: 24,
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  vazioTexto: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});
