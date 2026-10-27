import { Alert, Button, StyleSheet, Text, View, Share } from 'react-native';
import { useExpenses } from '../store/expenses-context';

export default function WalletScreen() {
  const { expenses } = useExpenses();

  const total = Array.isArray(expenses)
    ? expenses.reduce((sum, expense) => {
        const amount = Number(expense?.amount);
        return Number.isFinite(amount) ? sum + amount : sum;
      }, 0)
    : 0;

  const totalText = total.toFixed(2).replace('.', ',');

  const handleShare = async () => {
    const message = `Gastei R$ ${total.toFixed(2).replace('.', ',')} neste semestre.`;
    try {
      await Share.share({ message });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o resumo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bolso</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Total gasto</Text>
        <Text style={styles.total}>R$ {totalText}</Text>
        <Text style={styles.muted}>{expenses.length} despesas registradas</Text>
      </View>
      <Button title="Compartilhar resumo" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f2',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
    color: '#1b3d2d',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: '#dfe9e1',
    marginBottom: 18,
  },
  label: {
    color: '#5d6d66',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  total: {
    marginTop: 12,
    fontSize: 34,
    fontWeight: '800',
    color: '#163a2a',
  },
  muted: {
    marginTop: 8,
    color: '#53655d',
  },
});
