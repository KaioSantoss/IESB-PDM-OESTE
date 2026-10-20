import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DespesaSaida from '../components/despesa/DespesaSaida';
import { useThemeMode } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';

export default function TodasDespesas() {
  const navigation = useNavigation();
  const { currentTheme } = useThemeMode();
  const { expenses } = useExpenses();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const filteredExpenses = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return expenses;
    }

    return expenses.filter(expense =>
      expense.description.toLowerCase().includes(normalizedQuery)
    );
  }, [expenses, debouncedQuery]);

  const emptyMessage =
    debouncedQuery.trim().length > 0
      ? 'Nenhuma despesa corresponde à sua busca.'
      : 'Nenhuma despesa cadastrada. Toque em + para adicionar a primeira despesa.';

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.searchBox, { backgroundColor: currentTheme.surface, borderColor: currentTheme.border }]}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por descrição"
          placeholderTextColor={currentTheme.textSecondary}
          style={[styles.input, { color: currentTheme.text, backgroundColor: currentTheme.inputBackground }]}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <Pressable
        style={[styles.addButton, { backgroundColor: currentTheme.primary }]}
        onPress={() => navigation.navigate('GerenciarDespesa')}
      >
        <Text style={styles.addButtonText}>+ Nova despesa</Text>
      </Pressable>

      <DespesaSaida
        despesas={filteredExpenses}
        emptyMessage={emptyMessage}
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
  searchBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 4,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  addButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
