import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import DespesaSaida from './DespesaSaida';
import FiltroCategoria from './FiltroCategoria';

export default function TodasDespesas({ despesas, onEditar, onExcluir }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasFiltradas =
    categoriaSelecionada === 'Todas'
      ? despesas
      : despesas.filter(despesa => despesa.categoria === categoriaSelecionada);

  return (
    <View style={styles.container}>
      <FiltroCategoria
        categoriaSelecionada={categoriaSelecionada}
        onSelecionarCategoria={setCategoriaSelecionada}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        onEditar={onEditar}
        onExcluir={onExcluir}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
