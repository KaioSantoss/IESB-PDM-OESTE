import React from 'react';
import { Platform, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../constants/theme';

const formatDate = date => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Data inválida';
  }

  return new Intl.DateTimeFormat('pt-BR').format(parsedDate);
};

const formatCurrency = amount =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(amount || 0));

export default function DespesaItem({ despesa }) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: despesa.id })}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: currentTheme.card,
          borderColor: currentTheme.border,
          opacity: pressed ? 0.9 : 1,
          shadowColor: currentTheme.text,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.textContainer}>
          <Text style={[styles.description, { color: currentTheme.text }]}>{despesa.description}</Text>
          <Text style={[styles.dateText, { color: currentTheme.textSecondary }]}>{formatDate(despesa.date)}</Text>
        </View>
        <Text style={[styles.amount, { color: currentTheme.primary }]}>{formatCurrency(despesa.amount)}</Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={[styles.categoryBadge, { backgroundColor: currentTheme.accent, borderColor: currentTheme.border }]}>
          <Text style={[styles.categoryText, { color: currentTheme.text }]}>{despesa.category}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  description: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
  },
  amount: {
    fontSize: 17,
    fontWeight: '800',
  },
  bottomRow: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  categoryBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
