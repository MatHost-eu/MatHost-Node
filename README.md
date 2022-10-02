# MatHost-Node
Moduł NPM służący do komunikowania się z API MatHost

## Instalacja
```
npm i mathost-node
```

## Użycie
```js
import { PteroServer } from 'mathost-node';

const server = new PteroServer('ID Serwera');
server.authorize('Klucz API');
```

W celu uzyskania informacji o serwerze, należy użyć funkcji `getServerData()`(Informacje ogólne), `getStatusData()`(Informacje o statusie serwera i zużywanych zasobach) bądź `getGameData()`(Informacje o serwerze gier)[Tylko dla serwerów gier].
```js
const serverData = await server.getServerData();
const statusData = await server.getStatusData();
const gameData = await server.getGameData();
```

Aby stworzyć WebSocket z konsolą serwera, należy użyć klasy `PteroServer`.
```js
const socket = new PteroSocket(server);
socket.connect()

socket.on('auth_success', () => {
  // Kod wykonywany po otrzymaniu informacji o prawidłowej autoryzacji
});
```

## Kontakt
Pomoc z modułem MatHost-Node można uzyskać na [serwerze discord hostingu MatHost](https://dc.mathost.eu).
