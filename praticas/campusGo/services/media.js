import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

export async function pickImage() {
  try {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'É preciso permitir o acesso à galeria para escolher uma foto.', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]);
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) {
      return null;
    }

    return result.assets?.[0]?.uri ?? null;
  } catch (error) {
    console.log('Erro ao selecionar imagem:', error);
    Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    return null;
  }
}

export async function takePhoto() {
  try {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão da câmera negada', 'Para tirar uma foto, permita o acesso à câmera.', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]);
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) {
      return null;
    }

    return result.assets?.[0]?.uri ?? null;
  } catch (error) {
    console.log('Erro ao abrir câmera:', error);
    Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    return null;
  }
}
