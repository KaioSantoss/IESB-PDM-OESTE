import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function scheduleReminder(title, seconds) {
  try {
    const settings = await Notifications.getPermissionsAsync();

    if (settings.status !== 'granted') {
      const permissionResult = await Notifications.requestPermissionsAsync();
      if (permissionResult.status !== 'granted') {
        return { success: false, message: 'Permissão de notificação negada.' };
      }
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('campusgo-reminders', {
        name: 'CampusGo Lembretes',
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: 'default',
      });
    }

    const trigger = {
      seconds,
      repeats: false,
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title || 'CampusGo',
        body: 'Lembre-se do seu compromisso.',
        sound: true,
      },
      trigger,
    });

    return { success: true, message: 'Lembrete agendado com sucesso.' };
  } catch (error) {
    console.log('Erro ao agendar lembrete:', error);
    return { success: false, message: 'Não foi possível agendar o lembrete.' };
  }
}
