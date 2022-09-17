import { fetch } from 'undici';
import { APIServerData, ServerData } from '../types/ServerData';
import { APIStatusData, StatusData } from '../types/StatusData';
import { APIException } from '../types/Exceptions';
import { APIGameData, GameDataException, MinecraftGameData, SCPSLGameData } from '../types/GameData';
import { APISocketData, SocketData } from '../types/SocketData';

export class PteroServer {
  serverId: string;
  #apiKey: string;

  constructor(serverId: string) {
    this.serverId = serverId;
  }

  authorize(apiKey: string): Boolean {
    this.#apiKey = apiKey;
    return true;
  }

  unAuthorize(): Boolean {
    this.#apiKey = '';
    return true;
  }

  async getServerData(): Promise<ServerData | APIException> {
    let apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        let apiServerData = await apiResponse.json();
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
        let apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  async getStatusData(): Promise<StatusData | APIException> {
    let apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/resources`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        let apiStatusData = await apiResponse.json();
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
        let apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  async getGameData(): Promise<MinecraftGameData | SCPSLGameData | GameDataException | APIException> {
    let apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/players`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        let apiGameData = await apiResponse.json();
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
        let apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  async getSocketData(): Promise<SocketData | APIException> {
    let apiResponse = await fetch(`https://ptero.mathost.eu/api/client/servers/${this.serverId}/websocket`, {
      method: 'GET',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${this.#apiKey}`
      }
    });

    switch (apiResponse.status) {
      case 200: {
        let apiSocketData = await apiResponse.json();
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
        let apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }
}