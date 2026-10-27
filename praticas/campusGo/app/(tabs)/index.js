import React from 'react';
import { ActivityIndicator, Button, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1f7a4d" />
        <Text style={styles.loadingText}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Não foi possível carregar os avisos</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Avisos</Text>
      <FlatList
        data={notices}
        keyExtractor={item => `${item.id ?? 'notice'}-${item.title ?? 'card'}`}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reload} tintColor="#1f7a4d" />}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum aviso disponível no momento.</Text>}
        renderItem={({ item }) => (
          <FadeIn>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.body}</Text>
            </View>
          </FadeIn>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f2',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f4f7f2',
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1b3d2d',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dfe9e1',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#163a2a',
    marginBottom: 8,
  },
  cardBody: {
    color: '#445d52',
    lineHeight: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#1b3d2d',
    fontSize: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1b3d2d',
    marginBottom: 8,
  },
  errorText: {
    color: '#5a665f',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    color: '#53655d',
    textAlign: 'center',
    marginTop: 20,
  },
});
