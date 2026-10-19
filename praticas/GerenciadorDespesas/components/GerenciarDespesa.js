import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const categorias = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

const formatarDataISO = data => {
  const dataObj = new Date(data);
  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const dia = String(dataObj.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

const formatarValorInput = valor => {
  if (valor === null || valor === undefined || valor === '') {
    return '';
  }

  return Number(valor).toFixed(2).replace('.', ',');
};

export default function GerenciarDespesa({ despesaEditando, onSalvar, onCancelar }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [categoria, setCategoria] = useState('');
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  useEffect(() => {
    if (despesaEditando) {
      setDescricao(despesaEditando.descricao || '');
      setValor(formatarValorInput(despesaEditando.valor));
      setDataSelecionada(new Date(`${despesaEditando.data}T00:00:00`));
      setCategoria(despesaEditando.categoria || '');
    } else {
      setDescricao('');
      setValor('');
      setDataSelecionada(new Date());
      setCategoria('');
    }
  }, [despesaEditando]);

  const tratarValor = texto => {
    const valorNormalizado = texto.replace(',', '.');

    if (valorNormalizado === '' || /^\d*\.?\d{0,2}$/.test(valorNormalizado)) {
      setValor(valorNormalizado);
    }
  };

  const validarFormulario = () => {
    if (!descricao.trim()) {
      Alert.alert('Validação', 'A descrição da despesa é obrigatória.');
      return false;
    }

    const valorNumerico = Number.parseFloat(valor.replace(',', '.'));

    if (!valorNumerico || valorNumerico <= 0) {
      Alert.alert('Validação', 'O valor deve ser um número maior que zero.');
      return false;
    }

    if (!dataSelecionada || Number.isNaN(new Date(dataSelecionada).getTime())) {
      Alert.alert('Validação', 'Selecione uma data válida.');
      return false;
    }

    if (!categoria) {
      Alert.alert('Validação', 'Selecione uma categoria.');
      return false;
    }

    return true;
  };

  const enviarFormulario = () => {
    if (!validarFormulario()) {
      return;
    }

    const valorNumerico = Number.parseFloat(valor.replace(',', '.'));
    const payload = {
      descricao: descricao.trim(),
      valor: valorNumerico,
      data: formatarDataISO(dataSelecionada),
      categoria,
    };

    onSalvar(payload);
  };

  const onDateChange = (event, data) => {
    if (Platform.OS === 'android') {
      setMostrarDatePicker(false);
    }

    if (data) {
      setDataSelecionada(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {despesaEditando ? 'Editar despesa' : 'Nova despesa'}
      </Text>

      <View style={styles.formulario}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex.: Mercado"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={tratarValor}
          placeholder="0,00"
          keyboardType="decimal-pad"
          inputMode="decimal"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.label}>Data</Text>
        <Pressable style={styles.inputData} onPress={() => setMostrarDatePicker(true)}>
          <Text style={styles.textoData}>{formatarDataISO(dataSelecionada)}</Text>
        </Pressable>

        {mostrarDatePicker && (
          <DateTimePicker
            value={dataSelecionada}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoriasContainer}>
          {categorias.map(itemCategoria => (
            <Pressable
              key={itemCategoria}
              onPress={() => setCategoria(itemCategoria)}
              style={[
                styles.categoriaBotao,
                categoria === itemCategoria && styles.categoriaBotaoAtiva,
              ]}
            >
              <Text
                style={[
                  styles.categoriaTexto,
                  categoria === itemCategoria && styles.categoriaTextoAtiva,
                ]}
              >
                {itemCategoria}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.acoes}>
          <Pressable style={styles.botaoCancelar} onPress={onCancelar}>
            <Text style={styles.botaoTextoCancelar}>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.botaoSalvar} onPress={enviarFormulario}>
            <Text style={styles.botaoTextoSalvar}>Salvar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f7ff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 18,
    textAlign: 'center',
  },
  formulario: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e7edf8',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d7e3f5',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: '#f8fbff',
    color: '#0f172a',
  },
  inputData: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d7e3f5',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: '#f8fbff',
    justifyContent: 'center',
  },
  textoData: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '600',
  },
  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoriaBotao: {
    backgroundColor: '#edf2ff',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#dfe8ff',
    marginRight: 6,
    marginBottom: 6,
  },
  categoriaBotaoAtiva: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  categoriaTexto: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '700',
  },
  categoriaTextoAtiva: {
    color: '#ffffff',
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#edf2ff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  botaoSalvar: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1d4ed8',
  },
  botaoTextoCancelar: {
    color: '#1e3a8a',
    fontWeight: '700',
    fontSize: 15,
  },
  botaoTextoSalvar: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});
