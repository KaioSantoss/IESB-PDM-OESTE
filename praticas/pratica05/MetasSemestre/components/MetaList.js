import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.empty}>
          Nenhuma meta cadastrada ainda.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Text style={styles.metaText}>{item.texto}</Text>

            <Text style={styles.date}>
              Criada em: {item.criadaEm}
            </Text>
          </View>

          <Pressable
            onPress={() => onDelete(item.id)}
            android_ripple={{ color: '#ffffff55' }}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  textContainer: {
    flex: 1,
    marginRight: 10,
  },

  metaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  date: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },

  deleteButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  pressed: {
    opacity: 0.7,
  },
});