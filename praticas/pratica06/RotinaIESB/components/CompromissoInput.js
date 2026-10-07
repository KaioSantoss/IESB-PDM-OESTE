import React from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
}) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={labels.placeholderCompromisso}
        placeholderTextColor="#888"
        maxLength={100}
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onAdd}
        android_ripple={{ color: '#ffffff55' }}
      >
        <Text style={styles.buttonText}>
          {labels.botaoAdicionar}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    marginRight: 10,
  },

  button: {
    width: '28%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});