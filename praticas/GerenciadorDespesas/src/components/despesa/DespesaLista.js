import React from 'react';
import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { theme } from '../../constants/theme';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';

export default function DespesaLista({
  despesas = [],
  onEditar,
  onExcluir,
  emptyMessage = 'Nenhuma despesa encontrada.',
}) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

  const despesasOrdenadas = [...despesas].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <FlatList
      data={despesasOrdenadas}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <DespesaItem despesa={item} onEditar={onEditar} onExcluir={onExcluir} />
      )}
      ListHeaderComponent={despesasOrdenadas.length > 0 ? <DespesaSumario despesas={despesasOrdenadas} /> : null}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyIcon, { color: currentTheme.primary }]}>📋</Text>
          <Text style={[styles.emptyText, { color: currentTheme.text }]}>{emptyMessage}</Text>
          <Text style={[styles.emptyHint, { color: currentTheme.textSecondary }]}>Toque em + para adicionar uma nova despesa.</Text>
        </View>
      }
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={styles.footerSpace} />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    textAlign: 'center',
  },
  footerSpace: {
    height: 18,
  },
});
