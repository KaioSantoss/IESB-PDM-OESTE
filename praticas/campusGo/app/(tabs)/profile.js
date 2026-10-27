import { useEffect, useState } from 'react';
import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, takePhoto } from '../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const saved = await AsyncStorage.getItem(PHOTO_KEY);
        if (saved) {
          setPhotoUri(saved);
        }
      } catch (error) {
        console.log('Erro ao carregar foto:', error);
      }
    };

    loadPhoto();
  }, []);

  const savePhoto = async uri => {
    if (!uri) {
      return;
    }

    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
      setPhotoUri(uri);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar sua foto.');
    }
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      await savePhoto(uri);
    }
  };

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) {
      await savePhoto(uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>

      <Pressable onPress={handlePickImage} style={styles.avatarButton}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={52} color="#fff" />
          </View>
        )}
      </Pressable>

      <Text style={styles.name}>Kaio Daniel</Text>
      <Text style={styles.role}>Estudante de PDM</Text>

      <View style={styles.buttonGroup}>
        <Button title="Escolher foto da galeria" onPress={handlePickImage} />
        <View style={styles.spacing} />
        <Button title="Tirar foto" onPress={handleTakePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f2',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1b3d2d',
    marginBottom: 18,
  },
  avatarButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 18,
    backgroundColor: '#dfe9e1',
    borderWidth: 3,
    borderColor: '#1f7a4d',
  },
  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: '#1f7a4d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#163a2a',
  },
  role: {
    fontSize: 16,
    color: '#5c7067',
    marginBottom: 18,
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 360,
  },
  spacing: {
    height: 12,
  },
});
