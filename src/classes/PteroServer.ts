import { fetch } from 'undici';

import {
	APIServerData, APIStatusData,
	ServerData, StatusData, ServerDataAccount,
	ActivityData,
	APIGameData, GameDataException, MinecraftGameData, SCPSLGameData,
	APISocketData, SocketData,
	APIException,
} from '../types';

/**
 * Class for retrieving server information from the MatHost.eu API
 * @class PteroServer
 * @example
 * const server = new PteroServer('12345678');
 * @param {string} serverId Server ID
 * @property {string} serverId Server ID
 */
export class PteroServer {
	serverId: string;
	#apiKey: string;

	constructor(serverId: string) {
		this.serverId = serverId;
		this.#apiKey = '';
	}

	/**
	 * Authorizes with an API key
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * server.authorize('API_KEY');
	 * @param {string} apiKey API key
	 * @return boolean
	 */
	authorize(apiKey: string): boolean {
		this.#apiKey = apiKey;
		return true;
	}

	/**
	 * Revokes authorization
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * server.unAuthorize();
	 * @return boolean
	 */
	unAuthorize(): boolean {
		this.#apiKey = '';
		return true;
	}

	/**
	 * Retrieves server data
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * const serverData = await server.getServerData();
	 * @return {Promise<ServerData>}
	 */
	async getServerData(): Promise<ServerData> {
		const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
		});

		switch (apiResponse.status) {
		case 200: {
			const apiServerData = await apiResponse.json();
			return (apiServerData as APIServerData).attributes;
		}
		case 404: {
			throw new Error('The requested resource could not be found.');
		}
		case 500: {
			throw new Error('An internal server error occurred.');
		}
		default: {
			const apiException = (await apiResponse.json()) as APIException;
			throw new Error(apiException.errors[0].detail);
		}
		}
	}

	/**
	 * Retrieves account permissions data for the server
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * const serverAccountData = await server.getAccountData();
	 * @return {Promise<ServerDataAccount>}
	 */
	async getAccountData(): Promise<ServerDataAccount> {
		const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
		});

		switch (apiResponse.status) {
		case 200: {
			const apiServerData = await apiResponse.json();
			return (apiServerData as APIServerData).meta;
		}
		case 404: {
			throw new Error('The requested resource could not be found.');
		}
		case 500: {
			throw new Error('An internal server error occurred.');
		}
		default: {
			const apiException = (await apiResponse.json()) as APIException;
			throw new Error(apiException.errors[0].detail);
		}
		}
	}

	/**
	 * Retrieves server status data
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * const statusData = await server.getStatusData();
	 * @return {Promise<StatusData>}
	 */
	async getStatusData(): Promise<StatusData> {
		const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/resources`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
		});

		switch (apiResponse.status) {
		case 200: {
			const apiStatusData = await apiResponse.json();
			return (apiStatusData as APIStatusData).attributes;
		}
		case 404: {
			throw new Error('The requested resource could not be found.');
		}
		case 500: {
			throw new Error('An internal server error occurred.');
		}
		default: {
			const apiException = (await apiResponse.json()) as APIException;
			throw new Error(apiException.errors[0].detail);
		}
		}
	}

	/**
	 * Retrieves game data
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * const gameData = await server.getGameData();
	 * @return {Promise<MinecraftGameData | SCPSLGameData>}
	 */
	async getGameData(): Promise<APIGameData | MinecraftGameData | SCPSLGameData> {
		const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/players`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
		});

		switch (apiResponse.status) {
		case 200: {
			const apiGameData = (await apiResponse.json()) as APIGameData;
			if (apiGameData?.success) {
				return (apiGameData.data as MinecraftGameData | SCPSLGameData);
			}
			else {
				throw new Error((apiGameData.data as GameDataException)?.error || 'An unknown error occurred.');
			}
		}
		case 404: {
			throw new Error('The requested resource could not be found.');
		}
		case 500: {
			throw new Error('An internal server error occurred.');
		}
		default: {
			const apiException = (await apiResponse.json()) as APIException;
			throw new Error(apiException.errors[0].detail);
		}
		}
	}

	/**
	 * Retrieves WebSocket data for the server
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * const websocketData = await server.getSocketData();
	 * @return {Promise<SocketData>}
	 */
	async getSocketData(): Promise<SocketData> {
		const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/websocket`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
		});

		switch (apiResponse.status) {
		case 200: {
			const apiSocketData = await apiResponse.json();
			return (apiSocketData as APISocketData).data;
		}
		case 404: {
			throw new Error('The requested resource could not be found.');
		}
		case 500: {
			throw new Error('An internal server error occurred.');
		}
		default: {
			const apiException = (await apiResponse.json()) as APIException;
			throw new Error(apiException.errors[0].detail);
		}
		}
	}

	/**
	 * Retrieves server activity data
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * const activityData = await server.getActivityData();
	 * @return {Promise<ActivityData>}
	 */
	async getActivityData(): Promise<ActivityData> {
		const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/activity`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
		});

		switch (apiResponse.status) {
		case 200: {
			const apiActivityData = await apiResponse.json();
			return apiActivityData as ActivityData;
		}
		case 404: {
			throw new Error('The requested resource could not be found.');
		}
		case 500: {
			throw new Error('An internal server error occurred.');
		}
		default: {
			const apiException = (await apiResponse.json()) as APIException;
			throw new Error(apiException.errors[0].detail);
		}
		}
	}

	/**
	 * Sends a command to the server
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * await server.sendCommand('say Hello World!');
	 * @param {string} command Command to send to the server
	 * @return Promise<boolean>
	 */
	async sendCommand(command: string): Promise<boolean> {
		const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/command`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
			body: JSON.stringify({
				command,
			}),
		});

		switch (apiResponse.status) {
		case 204: {
			return true;
		}
		case 404: {
			throw new Error('The requested resource could not be found.');
		}
		case 500: {
			throw new Error('An internal server error occurred.');
		}
		default: {
			const apiException = (await apiResponse.json()) as APIException;
			throw new Error(apiException.errors[0].detail);
		}
		}
	}

	/**
	 * Executes an action on the server
	 * @function
	 * @example
	 * const server = new PteroServer('12345678');
	 * await server.changeState('start');
	 * @param {string} state Action to perform on the server
	 * @return {Promise<boolean>}
	 */
	async changeState(state: 'start' | 'stop' | 'restart' | 'kill'): Promise<boolean> {
		const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/power`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
			body: JSON.stringify({
				signal: state,
			}),
		});

		switch (apiResponse.status) {
		case 204: {
			return true;
		}
		case 404: {
			throw new Error('The requested resource could not be found.');
		}
		case 500: {
			throw new Error('An internal server error occurred.');
		}
		default: {
			const apiException = (await apiResponse.json()) as APIException;
			throw new Error(apiException.errors[0].detail);
		}
		}
	}
}