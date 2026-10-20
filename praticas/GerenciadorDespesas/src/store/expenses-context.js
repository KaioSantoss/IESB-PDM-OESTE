import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

export const ExpensesContext = createContext(null);

const STORAGE_KEY = '@expenses';

const normalizeExpense = expense => {
  const normalized = {
    ...expense,
    id: expense.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    description: String(expense.description ?? '').trim(),
    amount: Number(expense.amount ?? 0),
    category: String(expense.category ?? '').trim(),
    date:
      expense.date instanceof Date
        ? expense.date.toISOString()
        : String(expense.date ?? new Date().toISOString()),
  };

  return normalized;
};

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      return [...state, normalizeExpense(action.payload)];
    }
    case 'UPDATE': {
      return state.map(expense =>
        expense.id === action.payload.id
          ? { ...normalizeExpense(action.payload), id: action.payload.id }
          : expense
      );
    }
    case 'DELETE': {
      return state.filter(expense => expense.id !== action.payload.id);
    }
    case 'SET': {
      if (!Array.isArray(action.payload)) {
        return state;
      }

      return action.payload.map(normalizeExpense);
    }
    default: {
      throw new Error(`Ação desconhecida: ${action.type}`);
    }
  }
};

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadExpenses = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem(STORAGE_KEY);

        if (!savedExpenses) {
          if (isMounted) {
            setIsLoaded(true);
          }
          return;
        }

        const parsedExpenses = JSON.parse(savedExpenses);

        if (Array.isArray(parsedExpenses)) {
          dispatch({ type: 'SET', payload: parsedExpenses });
        }
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    loadExpenses();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const persistExpenses = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Erro ao salvar despesas:', error);
      }
    };

    persistExpenses();
  }, [expenses, isLoaded]);

  const addExpense = expense => {
    dispatch({ type: 'ADD', payload: expense });
  };

  const updateExpense = (id, expense) => {
    dispatch({ type: 'UPDATE', payload: { ...expense, id } });
  };

  const deleteExpense = id => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  const value = useMemo(
    () => ({
      expenses,
      isLoaded,
      addExpense,
      updateExpense,
      deleteExpense,
    }),
    [expenses, isLoaded]
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider');
  }

  return context;
}
