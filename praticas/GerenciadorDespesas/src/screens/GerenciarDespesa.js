import React, { useEffect, useMemo, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { theme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';

const CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

const createEmptyForm = () => ({
  description: '',
  amount: '',
  date: new Date(),
  category: '',
});

const getDateValue = value => {
  if (!value) {
    return new Date();
  }

  const parsedDate = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};

const normalizeAmount = value => {
  if (typeof value === 'number') {
    return value;
  }

  return Number(String(value).replace(',', '.').trim());
};

export function validate(values) {
  const errors = {};

  if (!values.description || values.description.trim().length < 3) {
    errors.description = 'Informe uma descrição com pelo menos 3 caracteres.';
  }

  const numericAmount = normalizeAmount(values.amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    errors.amount = 'Informe um valor maior que zero.';
  }

  const selectedDate = getDateValue(values.date);
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (Number.isNaN(selectedDate.getTime()) || selectedDate > startOfToday) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category || !CATEGORIES.includes(values.category)) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa() {
  const navigation = useNavigation();
  const route = useRoute();
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const [form, setForm] = useState(createEmptyForm());
  const [dateInput, setDateInput] = useState('');
  const [errors, setErrors] = useState({});
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentExpense = useMemo(
    () => expenses.find(expense => expense.id === expenseId) || null,
    [expenses, expenseId]
  );

  const formatDateForInput = date => {
    const selectedDate = getDateValue(date);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDateFromInput = value => {
    if (!value) {
      return new Date();
    }

    const [year, month, day] = value.split('-').map(Number);

    if (!year || !month || !day) {
      return new Date();
    }

    const parsedDate = new Date(year, month - 1, day);
    return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  };

  const handleDateInputChange = value => {
    const sanitizedValue = value.replace(/[^\d-]/g, '').slice(0, 10);
    setDateInput(sanitizedValue);

    if (sanitizedValue.length !== 10) {
      return;
    }

    const [year, month, day] = sanitizedValue.split('-').map(Number);
    if (!year || !month || !day) {
      return;
    }

    const parsedDate = new Date(year, month - 1, day);
    if (Number.isNaN(parsedDate.getTime())) {
      return;
    }

    handleChange('date', parsedDate);
  };

  useEffect(() => {
    if (!isEditing) {
      setForm(createEmptyForm());
      setDateInput(formatDateForInput(new Date()));
      setErrors({});
      return;
    }

    if (!currentExpense) {
      Alert.alert('Despesa não encontrada', 'A despesa informada não existe mais.');
      navigation.goBack();
      return;
    }

    const nextDate = getDateValue(currentExpense.date);
    setForm({
      description: currentExpense.description,
      amount: String(currentExpense.amount),
      date: nextDate,
      category: currentExpense.category,
    });
    setDateInput(formatDateForInput(nextDate));
    setErrors({});
  }, [currentExpense, isEditing, navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [isEditing, navigation]);

  const handleChange = (field, value) => {
    setForm(currentForm => ({
      ...currentForm,
      [field]: value,
    }));

    setErrors(currentErrors => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleAmountChange = value => {
    const pattern = /^\d*\.?\d{0,2}$/;
    const normalizedInput = value.replace(',', '.');

    if (!pattern.test(normalizedInput)) {
      return;
    }

    handleChange('amount', normalizedInput);
  };

  const submitForm = () => {
    const currentValues = {
      ...form,
      description: form.description.trim(),
      amount: form.amount,
      category: form.category,
    };

    const nextErrors = validate(currentValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload = {
      id: isEditing ? expenseId : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      description: currentValues.description,
      amount: Number(normalizeAmount(currentValues.amount)),
      date: getDateValue(currentValues.date).toISOString(),
      category: currentValues.category,
    };

    if (isEditing) {
      updateExpense(expenseId, payload);
    } else {
      addExpense(payload);
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (!expenseId) {
      return;
    }

    Alert.alert('Excluir despesa', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: currentTheme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        <View style={styles.formCard}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Descrição</Text>
          <TextInput
            value={form.description}
            onChangeText={value => handleChange('description', value)}
            placeholder="Ex: Supermercado"
            placeholderTextColor={currentTheme.textSecondary}
            style={[
              styles.input,
              {
                backgroundColor: currentTheme.inputBackground,
                color: currentTheme.text,
                borderColor: errors.description ? currentTheme.error : currentTheme.border,
              },
            ]}
            autoCapitalize="sentences"
          />
          {errors.description ? <Text style={[styles.errorText, { color: currentTheme.error }]}>{errors.description}</Text> : null}

          <Text style={[styles.label, { color: currentTheme.text }]}>Valor</Text>
          <TextInput
            value={form.amount}
            onChangeText={handleAmountChange}
            placeholder="0.00"
            placeholderTextColor={currentTheme.textSecondary}
            keyboardType="decimal-pad"
            style={[
              styles.input,
              {
                backgroundColor: currentTheme.inputBackground,
                color: currentTheme.text,
                borderColor: errors.amount ? currentTheme.error : currentTheme.border,
              },
            ]}
          />
          {errors.amount ? <Text style={[styles.errorText, { color: currentTheme.error }]}>{errors.amount}</Text> : null}

          <Text style={[styles.label, { color: currentTheme.text }]}>Data</Text>
          {Platform.OS === 'web' ? (
            <TextInput
              value={dateInput}
              onChangeText={handleDateInputChange}
              placeholder="AAAA-MM-DD"
              placeholderTextColor={currentTheme.textSecondary}
              keyboardType="numeric"
              style={[
                styles.input,
                {
                  backgroundColor: currentTheme.inputBackground,
                  color: currentTheme.text,
                  borderColor: errors.date ? currentTheme.error : currentTheme.border,
                },
              ]}
            />
          ) : (
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={[
                styles.input,
                styles.dateButton,
                {
                  backgroundColor: currentTheme.inputBackground,
                  borderColor: errors.date ? currentTheme.error : currentTheme.border,
                },
              ]}
            >
              <Text style={[styles.dateText, { color: currentTheme.text }]}
              >
                {form.date ? form.date.toLocaleDateString('pt-BR') : 'Selecione a data'}
              </Text>
            </Pressable>
          )}
          {errors.date ? <Text style={[styles.errorText, { color: currentTheme.error }]}>{errors.date}</Text> : null}

          {showDatePicker ? (
            <DateTimePicker
              value={getDateValue(form.date)}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  handleChange('date', selectedDate);
                }
              }}
            />
          ) : null}

          <Text style={[styles.label, { color: currentTheme.text }]}>Categoria</Text>
          <Pressable
            onPress={() => setShowCategoryModal(true)}
            style={[
              styles.input,
              styles.categoryButton,
              {
                backgroundColor: currentTheme.inputBackground,
                borderColor: errors.category ? currentTheme.error : currentTheme.border,
              },
            ]}
          >
            <Text style={[styles.categoryText, { color: form.category ? currentTheme.text : currentTheme.textSecondary }]}>
              {form.category || 'Selecione uma categoria'}
            </Text>
          </Pressable>
          {errors.category ? <Text style={[styles.errorText, { color: currentTheme.error }]}>{errors.category}</Text> : null}

          <View style={styles.actionsRow}>
            {isEditing ? (
              <Pressable onPress={handleDelete} style={[styles.deleteButton, { backgroundColor: currentTheme.error }]}>
                <Text style={styles.primaryButtonText}>Excluir</Text>
              </Pressable>
            ) : null}
            <Pressable onPress={submitForm} style={[styles.saveButton, { backgroundColor: currentTheme.primary }]}>
              <Text style={styles.primaryButtonText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal transparent animationType="slide" visible={showCategoryModal} onRequestClose={() => setShowCategoryModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: currentTheme.surface, borderColor: currentTheme.border }]}>
            <Text style={[styles.modalTitle, { color: currentTheme.text }]}>Selecione a categoria</Text>
            {CATEGORIES.map(category => (
              <Pressable
                key={category}
                onPress={() => {
                  handleChange('category', category);
                  setShowCategoryModal(false);
                }}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: form.category === category ? currentTheme.accent : currentTheme.inputBackground,
                    borderColor: currentTheme.border,
                  },
                ]}
              >
                <Text style={[styles.optionText, { color: currentTheme.text }]}>{category}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setShowCategoryModal(false)} style={styles.cancelButton}>
              <Text style={[styles.cancelText, { color: currentTheme.error }]}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 36,
  },
  formCard: {
    borderRadius: 18,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 6,
  },
  dateButton: {
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 15,
  },
  categoryButton: {
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 12,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 12,
  },
  saveButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  optionButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
