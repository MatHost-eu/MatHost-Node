import { fetch } from 'undici';

import { PteroServer } from './PteroServer';
import { APIException } from '../types/Exceptions';

export class PteroSettingsManager {
  pteroServer: PteroServer;
  #apiKey: string;

  constructor(pteroServer: PteroServer) {
    this.pteroServer = pteroServer;
  }

  authorize(apiKey: string): Boolean {
    this.#apiKey = apiKey;
    return true;
  }

  unAuthorize(): Boolean {
    this.#apiKey = '';
    return true;
  }

  async renameServer(name: string): Promise<boolean | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/server/${this.pteroServer.serverId}/settings/rename`, {
      method: 'POST',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        'Authorization': `Bearer ${this.#apiKey}`
      },
      body: JSON.stringify({
        name: name
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
        let apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  async reinstallServer(): Promise<boolean | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/server/${this.pteroServer.serverId}/settings/reinstall`, {
      method: 'POST',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        'Authorization': `Bearer ${this.#apiKey}`
      },
      body: null
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
        let apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  async setDocketImage(dockerImage: string): Promise<boolean | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/server/${this.pteroServer.serverId}/settings/docker-image`, {
      method: 'POST',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        'Authorization': `Bearer ${this.#apiKey}`
      },
      body: JSON.stringify({
        docker_image: dockerImage
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
        let apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }
}