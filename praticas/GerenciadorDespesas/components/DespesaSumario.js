import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const formatarMoeda = valor =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);

export default function DespesaSumario({ despesas }) {
  const somaDespesas = despesas.reduce((acumulador, item) => {
    return acumulador + item.valor;
  }, 0);

  const totalVermelho = somaDespesas > 200;

  return (
    <View style={[styles.container, totalVermelho && styles.containerAlerta]}>
      <Text style={styles.label}>Total das despesas</Text>
      <Text style={[styles.valor, totalVermelho && styles.valorVermelho]}>
        {formatarMoeda(somaDespesas)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  containerAlerta: {
    borderColor: '#fecaca',
    backgroundColor: '#fff1f2',
  },
  label: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 6,
    fontWeight: '700',
  },
  valor: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  valorVermelho: {
    color: '#dc2626',
  },
});
