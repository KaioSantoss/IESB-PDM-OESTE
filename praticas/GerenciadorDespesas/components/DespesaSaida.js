import React from 'react';
import { StyleSheet, View } from 'react-native';

import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

export default function DespesaSaida({ despesas, onEditar, onExcluir }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} />
      <DespesaLista
        despesas={despesas}
        onEditar={onEditar}
        onExcluir={onExcluir}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
