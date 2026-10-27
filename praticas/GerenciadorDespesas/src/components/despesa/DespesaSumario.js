import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

import { theme } from '../../constants/theme';

const formatCurrency = value =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export default function DespesaSumario({ despesas = [] }) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

  const total = despesas.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const quantidade = despesas.length;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.surface, borderColor: currentTheme.border }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: currentTheme.textSecondary }]}>Quantidade</Text>
        <Text style={[styles.value, { color: currentTheme.text }]}>{quantidade}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: currentTheme.textSecondary }]}>Total</Text>
        <Text style={[styles.total, { color: currentTheme.primary }]}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  total: {
    fontSize: 20,
    fontWeight: '800',
  },
});
