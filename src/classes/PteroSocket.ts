import { PteroServer } from './PteroServer';
import { SocketData } from '../types/SocketData';
import WebSocket from 'ws';
import { EventEmitter } from 'node:events'
import { APIException } from '../types/Exceptions';

/**
 * Klasa służąca do interakcji z API WebSocketa panelu serwera MatHost.eu
 * @class PteroSocket
 * @extends EventEmitter
 * @example
 * const socket = new PteroSocket(server);
 * @param {PteroServer} pteroServer Serwer, z którego pobierane są dane
 * @property {PteroServer} pteroServer Serwer, z którego pobierane są dane
 * @property {WebSocket} socket WebSocket
 * @property {string} socketUrl Adres URL WebSocketa
 * @property {string} #socketToken Token WebSocketa
 */
export class PteroSocket extends EventEmitter {
  pteroServer: PteroServer;
  socket: WebSocket;
  socketUrl: string;
  #socketToken: string;

  constructor(pteroServer: PteroServer) {
    super();

    this.pteroServer = pteroServer;
    this.socketUrl = '';
    this.#socketToken = '';
  }

  /**
   * Łączy się z WebSocketem panelu serwera
   * @function
   * @example
   * const socket = new PteroSocket(server);
   * socket.connect();
   * @return {Promise<void | APIException>}
   */
  async connect(): Promise<void | APIException> {
    const socketData = await this.pteroServer.getSocketData();

    if (socketData as APIException) return socketData as APIException;

    if (this.socket) {
      this.close();
    }

    const {token, socket} = socketData as SocketData;
    this.socketUrl = socket;
    this.#socketToken = token;

    this.socket = new WebSocket(this.socketUrl, {
      origin: 'https://ptero.mathost.eu'
    });

    this.socket.on('open', () => {
      this.sendAuth();
    });
    this.socket.on('message', (data) => {
      this.#readMessage(data);
    });
    this.socket.on('error', (error) => {
      this.emit('error', error);
    });
    this.socket.on('close', (data) => {
      this.emit('close', data);
      this.socket = undefined;
    });
  }

  /**
   * Odczytuje wiadomość z WebSocketa
   * @function
   * @param data - Dane otrzymane od WebSocketa
   * @private
   * @return {Promise<void | APIException>}
   */
  async #readMessage(data: any): Promise<void | APIException> {
    const { event, args } = JSON.parse(data.toString());
    switch (event) {
      case 'stats':
        if (args[0].startsWith("{"))
          this.emit('stats', JSON.parse(args[0]));
        break;
      case 'token expiring':
        const apiResponse = await this.regenToken();
        if (apiResponse as APIException) return apiResponse as APIException;

        this.sendAuth();

        this.emit(event.replace(" ", "_"));
        break;
      default:
        if (args)
          this.emit(event.replace(" ", "_"), args[0]);
        else
          this.emit(event.replace(" ", "_"));
    }
  }

  /**
   * Regeneruje token autorizacyjny WebSocketa
   * @function
   * @example
   * const socket = new PteroSocket(server);
   * socket.regenToken();
   * socket.connect();
   * @return {Promise<SocketData | APIException>}
   */
  async regenToken(): Promise<void | APIException> {
    const newSocketData = await this.pteroServer.getSocketData();
    if (newSocketData as APIException) return newSocketData as APIException;

    this.#socketToken = (newSocketData as SocketData).token;
  }

  /**
   * Wysyła wiadomość do WebSocketa
   * @function
   * @example
   * const socket = new PteroSocket(server);
   * socket.connect();
   *
   * socket.send({
   *   event: 'send command',
   *   args: 'say Hello World!'
   * })
   * @param {Record<string, any>} data - Dane, które mają zostać wysłane
   * @return {void}
   */
  send(data: Record<string, any>): void {
    this.socket.send(JSON.stringify(data));
  }

  /**
   * Wysyła wiadomość z tokenem autoryzacyjnym
   * @function
   * @example
   * const socket = new PteroSocket(server);
   * socket.connect();
   *
   * // Ta metoda jest wywoływana automatycznie, więc używanie jej nie jest konieczne
   * socket.sendAuth();
   * @return {void}
   */
  sendAuth(): void {
    this.send({
      event: 'auth',
      args: this.#socketToken
    });
  }

  /**
   * Wysyła komendę do konsoli serwera
   * @function
   * @example
   * const socket = new PteroSocket(server);
   * socket.connect();
   *
   * socket.sendCommand('say Hello World!');
   * @param {string} command - Komenda, która ma zostać uruchomiona na serwerze
   * @return {void}
   */
  sendCommand(command: string): void {
    this.send({
      event: 'send command',
      args: command
    });
  }

  /**
   * Wykonuje akcje na serwerze
   * @function
   * @example
   * const socket = new PteroSocket(server);
   * socket.connect();
   *
   * socket.sendPowerAction('start');
   * @param {"start" | "stop" | "restart" | "kill"} action - Akcja, która ma zostać wykonana na serwerze
   * @return {void}
   */
  sendPowerAction(action: "start" | "stop" | "restart" | "kill"): void {
    this.send({
      event: 'set state',
      args: action
    });
  }

  /**
   * Zamyka połączenie z WebSocketem
   * @function
   * @example
   * const socket = new PteroSocket(server);
   * socket.connect();
   *
   * socket.close();
   * @return {void}
   */
  close(): void {
    this.socket.close();
    this.socket = undefined;
    this.emit('close', "Connection closed by user");
  }
}