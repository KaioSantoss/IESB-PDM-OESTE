import React from 'react';
import { StyleSheet, View } from 'react-native';

import DespesaLista from './DespesaLista';

export default function DespesaSaida({ despesas = [], emptyMessage, onSelectExpense }) {
  return (
    <View style={styles.container}>
      <DespesaLista
        despesas={despesas}
        emptyMessage={emptyMessage}
        onEditar={expense => onSelectExpense(expense)}
        onExcluir={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
