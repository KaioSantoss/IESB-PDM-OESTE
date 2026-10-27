# CampusGo

CampusGo é um aplicativo mobile acadêmico desenvolvido em React Native com Expo, pensado para ajudar estudantes a acompanhar tarefas, consultar avisos, controlar gastos e registrar presença em locais de estudo.

## Tecnologias

- React Native
- Expo
- Expo Router
- Expo Image Picker
- Expo Location
- Expo Notifications
- Expo Haptics
- AsyncStorage
- @expo/vector-icons

## Funcionalidades implementadas

- Navegação por abas com Expo Router
- Tela de tarefas com ações para criar, abrir detalhes e confirmar conclusão
- Modal de nova tarefa
- Contexto de despesas com persistência em AsyncStorage
- Cálculo de total do bolso em reais
- Compartilhamento do resumo financeiro
- Perfil com foto de avatar persistida no AsyncStorage
- Seleção de imagem da galeria e captura por câmera
- Check-in por localização atual
- Agendamento de lembrete local em 10 segundos
- Mural de avisos com consumo da API JSONPlaceholder
- Animação de entrada com FadeIn

## Estrutura principal

```text
campusGo/
  app/
    _layout.js
    new-task.js
    task/
      [id].js
    (tabs)/
      _layout.js
      index.js
      tasks.js
      wallet.js
      profile.js
  components/
    FadeIn.js
  hooks/
    useNotices.js
  services/
    api.js
    location.js
    media.js
    notifications.js
  store/
    expenses-context.js
  .env.example
  .gitignore
  app.json
  package.json
  README.md
```

## Pré-requisitos

- Node.js 22+ recomendado
- Expo CLI
- Expo Go no Android/iOS
- Emulador ou dispositivo físico compatível

## Instalação

```bash
cd praticas/campusGo
npm install
```

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

Exemplo disponível em `.env.example`.

## Iniciar o projeto

```bash
npx expo start
```

## Testar no Expo Go

1. Abra o aplicativo Expo Go no celular.
2. Escaneie o QR Code exibido no terminal.
3. Certifique-se de que o dispositivo e o computador estejam na mesma rede.

## Permissões e observações

- Câmera: para tirar fotos, o aplicativo solicita permissão da câmera.
- Localização: o botão `Estudei aqui` requer acesso à localização em primeiro plano.
- Notificações: o agendamento local funciona melhor em dispositivos reais ou em emuladores configurados. No Expo Go, algumas limitações podem ocorrer dependendo do ambiente.

## Limitações

- Notificações locais podem ter comportamentos diferentes no Expo Go ou em ambientes específicos.
- A API de avisos depende da disponibilidade do JSONPlaceholder.
