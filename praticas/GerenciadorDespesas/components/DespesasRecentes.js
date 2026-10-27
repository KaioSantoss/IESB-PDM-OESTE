import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import DespesaSaida from './DespesaSaida';
import FiltroCategoria from './FiltroCategoria';

export default function DespesasRecentes({ despesas, onEditar, onExcluir }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasRecentes = useMemo(() => {
    const dataAtual = new Date();
    const dataLimite = new Date(dataAtual);
    dataLimite.setDate(dataAtual.getDate() - 7);

    return [...despesas]
      .filter(despesa => new Date(`${despesa.data}T00:00:00`) >= dataLimite)
      .sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [despesas]);

  const despesasFiltradas =
    categoriaSelecionada === 'Todas'
      ? despesasRecentes
      : despesasRecentes.filter(despesa => despesa.categoria === categoriaSelecionada);

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
