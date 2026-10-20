import React, { useMemo } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DespesaSaida from '../components/despesa/DespesaSaida';
import { theme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';

export default function DespesasRecentes() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;
  const { expenses } = useExpenses();

  const despesasRecentes = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);

    return expenses.filter(expense => {
      const date = new Date(expense.date);
      if (Number.isNaN(date.getTime())) {
        return false;
      }

      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return dateOnly >= sevenDaysAgo && dateOnly <= now;
    });
  }, [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <DespesaSaida
        despesas={despesasRecentes}
        emptyMessage="Nenhuma despesa recente nos últimos 7 dias. Cadastre uma nova despesa para acompanhar seu orçamento."
        onSelectExpense={expense => navigation.navigate('GerenciarDespesa', { expenseId: expense.id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
});
