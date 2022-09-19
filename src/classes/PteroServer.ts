import { fetch } from 'undici';

import { APIServerData, ServerData, ServerDataAccount } from '../types/ServerData';
import { APIStatusData, StatusData } from '../types/StatusData';
import { APIException } from '../types/Exceptions';
import { APIGameData, GameDataException, MinecraftGameData, SCPSLGameData } from '../types/GameData';
import { APISocketData, SocketData } from '../types/SocketData';
import { ActivityData } from '../types/ActivityData';

/**
 * Klasa do pozystania informacji o serwerze z API MatHost.eu
 * @class PteroServer
 * @example
 * const server = new PteroServer('12345678');
 * @param {string} serverId - ID serwera
 * @property {string} serverId - ID serwera
 * @property {string} #apiKey - Klucz API
 */
export class PteroServer {
  serverId: string;
  #apiKey: string;

  constructor(serverId: string) {
    this.serverId = serverId;
    this.#apiKey = '';
  }

  /**
   * Autoryzuje się kluczem API
   * @function
   * @example
   * const server = new PteroServer('12345678');
   * server.authorize('KLUCZ_API');
   * @param {string} apiKey - Klucz API
   * @return boolean
   */
  authorize(apiKey: string): boolean {
    this.#apiKey = apiKey;
    return true;
  }

  /**
   * Przerywa autoryzację
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
   * Pobiera dane o serwerze
   * @function
   * @example
   * const server = new PteroServer('12345678');
   * const serverData = await server.getServerData();
   * @return {Promise<ServerData | APIException>}
   */
  async getServerData(): Promise<ServerData | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        const apiServerData = await apiResponse.json();
        return (apiServerData as APIServerData).attributes;
      }
      case 404: {
        return {
          errors: [
            {
              code: '404',
              status: 'Not Found',
              detail: 'The requested resource could not be found.'
            }
          ]
        } as APIException;
      }
      case 500: {
        return {
          errors: [
            {
              code: '500',
              status: 'Internal Server Error',
              detail: 'An internal server error occurred.'
            }
          ]
        } as APIException;
      }
      default: {
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  /**
   * Pobiera dane o uprawnieniach konta na serwerze
   * @function
   * @example
   * const server = new PteroServer('12345678');
   * const serverAccountData = await server.getAccountData();
   * @return {Promise<ServerDataAccount | APIException>}
   */
  async getAccountData(): Promise<ServerDataAccount | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        const apiServerData = await apiResponse.json();
        return (apiServerData as APIServerData).meta;
      }
      case 404: {
        return {
          errors: [
            {
              code: '404',
              status: 'Not Found',
              detail: 'The requested resource could not be found.'
            }
          ]
        } as APIException;
      }
      case 500: {
        return {
          errors: [
            {
              code: '500',
              status: 'Internal Server Error',
              detail: 'An internal server error occurred.'
            }
          ]
        } as APIException;
      }
      default: {
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  /**
   * Pobiera dane o statusie serwera
   * @function
   * @example
   * const server = new PteroServer('12345678');
   * const statusData = await server.getStatusData();
   * @return {Promise<StatusData | APIException>}
   */
  async getStatusData(): Promise<StatusData | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/resources`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        const apiStatusData = await apiResponse.json();
        return (apiStatusData as APIStatusData).attributes;
      }
      case 404: {
        return {
          errors: [
            {
              code: '404',
              status: 'Not Found',
              detail: 'The requested resource could not be found.'
            }
          ]
        } as APIException;
      }
      case 500: {
        return {
          errors: [
            {
              code: '500',
              status: 'Internal Server Error',
              detail: 'An internal server error occurred.'
            }
          ]
        } as APIException;
      }
      default: {
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  /**
   * Pobiera dane gry
   * @function
   * @example
   * const server = new PteroServer('12345678');
   * const gameData = await server.getGameData();
   * @return {Promise<MinecraftGameData | SCPSLGameData | GameDataException | APIException>}
   */
  async getGameData(): Promise<MinecraftGameData | SCPSLGameData | GameDataException | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/players`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        const apiGameData = await apiResponse.json();
        return (apiGameData as APIGameData).data;
      }
      case 404: {
        return {
          errors: [
            {
              code: '404',
              status: 'Not Found',
              detail: 'The requested resource could not be found.'
            }
          ]
        } as APIException;
      }
      case 500: {
        return {
          errors: [
            {
              code: '500',
              status: 'Internal Server Error',
              detail: 'An internal server error occurred.'
            }
          ]
        } as APIException;
      }
      default: {
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  /**
   * Pobiera informacje o danych do websocketa serwera
   * @function
   * @example
   * const server = new PteroServer('12345678');
   * const websocketData = await server.getSocketData();
   * @return {Promise<SocketData | APIException>}
   */
  async getSocketData(): Promise<SocketData | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/websocket`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        const apiSocketData = await apiResponse.json();
        return (apiSocketData as APISocketData).data;
      }
      case 404: {
        return {
          errors: [
            {
              code: '404',
              status: 'Not Found',
              detail: 'The requested resource could not be found.'
            }
          ]
        } as APIException;
      }
      case 500: {
        return {
          errors: [
            {
              code: '500',
              status: 'Internal Server Error',
              detail: 'An internal server error occurred.'
            }
          ]
        } as APIException;
      }
      default: {
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  /**
   * Pobiera informacje o aktywności na serwerze
   * @function
   * @example
   * const server = new PteroServer('12345678');
   * const activityData = await server.getActivityData();
   * @return {Promise<ActivityData | APIException>}
   */
  async getActivityData(): Promise<ActivityData | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/activity`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        const apiActivityData = await apiResponse.json();
        return apiActivityData as ActivityData;
      }
      case 404: {
        return {
          errors: [
            {
              code: '404',
              status: 'Not Found',
              detail: 'The requested resource could not be found.'
            }
          ]
        } as APIException;
      }
      case 500: {
        return {
          errors: [
            {
              code: '500',
              status: 'Internal Server Error',
              detail: 'An internal server error occurred.'
            }
          ]
        } as APIException;
      }
      default: {
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  /**
   * Wysyła komendę do serwera
   * @function
   * @example
   * const server = new PteroServer('12345678');
   * await server.sendCommand('say Hello World!');
   * @param {string} command - Komenda, która ma zostać wysłana do serwera
   */
  async sendCommand(command: string): Promise<boolean | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/command`, {
      method: 'POST',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      },
      body: JSON.stringify({
        command
      })
    });

    switch (apiResponse.status) {
      case 204: {
        return true;
      }
      case 404: {
        return {
          errors: [
            {
              code: '404',
              status: 'Not Found',
              detail: 'The requested resource could not be found.'
            }
          ]
        } as APIException;
      }
      case 500: {
        return {
          errors: [
            {
              code: '500',
              status: 'Internal Server Error',
              detail: 'An internal server error occurred.'
            }
          ]
        } as APIException;
      }
      default: {
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  /**
   * Wykonuje akcję na serwerze
   * @function
   * @example
   * const server = new PteroServer('12345678');
   * await server.changeState('start');
   * @param {string} state - Akcja, która ma zostać wykonana na serwerze
   */
  async changeState(state: "start" | "stop" | "restart" | "kill"): Promise<boolean | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/power`, {
      method: 'POST',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      },
      body: JSON.stringify({
        signal: state
      })
    });

    switch (apiResponse.status) {
      case 204: {
        return true;
      }
      case 404: {
        return {
          errors: [
            {
              code: '404',
              status: 'Not Found',
              detail: 'The requested resource could not be found.'
            }
          ]
        } as APIException;
      }
      case 500: {
        return {
          errors: [
            {
              code: '500',
              status: 'Internal Server Error',
              detail: 'An internal server error occurred.'
            }
          ]
        } as APIException;
      }
      default: {
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }
}