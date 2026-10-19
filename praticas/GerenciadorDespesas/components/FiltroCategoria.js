import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const categorias = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function FiltroCategoria({ categoriaSelecionada, onSelecionarCategoria }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Filtrar por categoria</Text>
      <View style={styles.filtros}>
        {categorias.map(categoria => {
          const selecionada = categoria === categoriaSelecionada;

          return (
            <Pressable
              key={categoria}
              onPress={() => onSelecionarCategoria(categoria)}
              style={[
                styles.botaoCategoria,
                selecionada && styles.botaoCategoriaAtivo,
              ]}
            >
              <Text
                style={[
                  styles.textoCategoria,
                  selecionada && styles.textoCategoriaAtivo,
                ]}
              >
                {categoria}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e6edf9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  titulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  botaoCategoria: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#edf2ff',
    borderWidth: 1,
    borderColor: '#dfe8ff',
    marginRight: 6,
    marginBottom: 6,
  },
  botaoCategoriaAtivo: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  textoCategoria: {
    color: '#1f2937',
    fontWeight: '700',
    fontSize: 12,
  },
  textoCategoriaAtivo: {
    color: '#ffffff',
  },
});
