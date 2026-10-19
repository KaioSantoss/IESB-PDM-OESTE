import React from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function CompromissoList({
  itens,
  onDelete,
  onToggle,
  tituloLista,
  listaVazia,
}) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Pressable
          style={({ pressed }) => [
            styles.itemContent,
            pressed && styles.itemPressed,
          ]}
          onPress={() => onToggle(item.id)}
          android_ripple={{ color: '#dddddd' }}
        >
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.itemText,
                item.concluido && styles.itemConcluido,
              ]}
            >
              {item.texto}
            </Text>

            <Text style={styles.dateText}>
              Criado em: {item.criadoEm}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onDelete(item.id)}
          android_ripple={{ color: '#ffffff55' }}
        >
          <Text style={styles.deleteText}>Excluir</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {listaVazia}
          </Text>
        }
        contentContainerStyle={
          itens.length === 0 ? styles.emptyContainer : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 12,
    elevation: 2,
  },

  itemContent: {
    flex: 1,
    borderRadius: 8,
  },

  itemPressed: {
    opacity: 0.6,
  },

  textContainer: {
    paddingVertical: 5,
  },

  itemText: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
  },

  itemConcluido: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },

  dateText: {
    fontSize: 12,
    color: '#888888',
    marginTop: 5,
  },

  deleteButton: {
    backgroundColor: '#555555',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },

  buttonPressed: {
    opacity: 0.6,
  },

  deleteText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: '#777777',
    fontSize: 15,
  },
});