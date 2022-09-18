import { fetch } from 'undici';

import { APIServerData, ServerData, ServerDataAccount } from '../types/ServerData';
import { APIStatusData, StatusData } from '../types/StatusData';
import { APIException } from '../types/Exceptions';
import { APIGameData, GameDataException, MinecraftGameData, SCPSLGameData } from '../types/GameData';
import { APISocketData, SocketData } from '../types/SocketData';
import { ActivityData } from '../types/ActivityData';

export class PteroServer {
  serverId: string;
  #apiKey: string;

  constructor(serverId: string) {
    this.serverId = serverId;
  }

  authorize(apiKey: string): boolean {
    this.#apiKey = apiKey;
    return true;
  }

  unAuthorize(): boolean {
    this.#apiKey = '';
    return true;
  }

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