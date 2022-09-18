import { PteroServer } from './PteroServer';
import { SocketData } from '../types/SocketData';
import WebSocket from 'ws';
import { EventEmitter } from 'node:events'
import { APIException } from '../types/Exceptions';

export class PteroSocket extends EventEmitter {
  pteroServer: PteroServer;
  socket: WebSocket;
  socketUrl: string;
  #socketToken: string;

  constructor(pteroServer: PteroServer) {
    super();

    this.pteroServer = pteroServer;
  }

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

  send(data: any): void {
    this.socket.send(JSON.stringify(data));
  }

  async regenToken(): Promise<void | APIException> {
    const newSocketData = await this.pteroServer.getSocketData();
    if (newSocketData as APIException) return newSocketData as APIException;

    this.#socketToken = (newSocketData as SocketData).token;

    this.sendAuth();
  }

  sendAuth(): void {
    this.send(JSON.stringify({
      event: 'auth',
      args: this.#socketToken
    }))
  }

  sendCommand(command: string): void {
    this.send(JSON.stringify({
      event: 'send command',
      args: command
    }));
  }

  sendPowerAction(action: "start" | "stop" | "restart" | "kill"): void {
    this.send(JSON.stringify({
      event: 'set state',
      args: action
    }));
  }

  close(): void {
    this.socket.close();
    this.socket = undefined;
    this.emit('close', "Connection closed by user");
  }
}