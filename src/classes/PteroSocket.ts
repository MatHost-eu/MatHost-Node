import { EventEmitter } from 'node:events';
import WebSocket from 'ws';

import { PteroServer } from './PteroServer';
import { SocketData } from '../types';

/**
 * Class for interacting with the WebSocket API of the MatHost.eu server panel
 * @class PteroSocket
 * @extends EventEmitter
 * @example
 * const socket = new PteroSocket(server);
 * @param {PteroServer} pteroServer Server from which data is retrieved
 * @property {PteroServer} pteroServer Server from which data is retrieved
 * @property {WebSocket} socket WebSocket
 * @property {string} socketUrl WebSocket URL
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
	 * Connects to the server panel WebSocket
	 * @function
	 * @example
	 * const socket = new PteroSocket(server);
	 * socket.connect();
	 * @return {Promise<void>}
	 */
	async connect(): Promise<void> {
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve) => {
			const socketData = await this.pteroServer.getSocketData();

			if (this.socket) {
				this.close();
			}

			const { token, socket } = socketData as SocketData;
			this.socketUrl = socket;
			this.#socketToken = token;

			this.socket = new WebSocket(this.socketUrl, {
				origin: 'https://ptero.mathost.eu',
			});

			this.socket.on('open', () => {
				this.sendAuth();
				resolve();
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
		});
	}

	/**
	 * Reads a message from the WebSocket
	 * @function
	 * @param data Data received from the WebSocket
	 * @private
	 * @return {Promise<void>}
	 */
	async #readMessage(data: any): Promise<void> {
		const { event, args } = JSON.parse(data.toString());

		switch (event) {
		case 'stats':
			if (args[0].startsWith('{')) {
				this.emit('stats', JSON.parse(args[0]));
			}
			break;
		case 'token expiring':
			await this.regenToken();

			this.sendAuth();

			this.emit(event.replace(' ', '_'));
			break;
		default:
			if (args) {this.emit(event.replace(' ', '_'), args[0]);}
			else {this.emit(event.replace(' ', '_'));}
		}
	}

	/**
	 * Regenerates the WebSocket authorization token
	 * @function
	 * @example
	 * const socket = new PteroSocket(server);
	 * socket.regenToken();
	 * socket.connect();
	 * @return {Promise<SocketData>}
	 */
	async regenToken(): Promise<void> {
		const newSocketData = await this.pteroServer.getSocketData();

		this.#socketToken = (newSocketData as SocketData).token;
	}

	/**
	 * Sends a message to the WebSocket
	 * @function
	 * @example
	 * const socket = new PteroSocket(server);
	 * socket.connect();
	 *
	 * socket.send({
	 *   event: 'send command',
	 *   args: 'say Hello World!'
	 * })
	 * @param {Record<string, any>} data Data to be sent
	 * @return {void}
	 */
	send(data: Record<string, any>): void {
		this.socket.send(JSON.stringify(data));
	}

	/**
	 * Sends a message with the authorization token
	 * @function
	 * @example
	 * const socket = new PteroSocket(server);
	 * socket.connect();
	 *
	 * // This method is called automatically, so using it is not necessary
	 * socket.sendAuth();
	 * @return {void}
	 */
	sendAuth(): void {
		this.send({
			event: 'auth',
			args: [ this.#socketToken ],
		});
	}

	/**
	 * Sends a command to the server console
	 * @function
	 * @example
	 * const socket = new PteroSocket(server);
	 * socket.connect();
	 *
	 * socket.sendCommand('say Hello World!');
	 * @param {string} command Command to be executed on the server
	 * @return {void}
	 */
	sendCommand(command: string): void {
		this.send({
			event: 'send command',
			args: [ command ],
		});
	}

	/**
	 * Performs an action on the server
	 * @function
	 * @example
	 * const socket = new PteroSocket(server);
	 * socket.connect();
	 *
	 * socket.sendPowerAction('start');
	 * @param {"start" | "stop" | "restart" | "kill"} action Action to be performed on the server
	 * @return {void}
	 */
	sendPowerAction(action: 'start' | 'stop' | 'restart' | 'kill'): void {
		this.send({
			event: 'set state',
			args: [ action ],
		});
	}

	/**
	 * Closes the WebSocket connection
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
		this.emit('close', 'Connection closed by user');
	}
}