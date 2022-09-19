import { fetch } from 'undici';

import { PteroServer } from './PteroServer';
import { APIException } from '../types/Exceptions';

/**
 * Klasa służąca do zarządzania ustawieniami serwera.
 * @class PteroSettingsManager
 * @example
 * const settings = new PteroSettingsManager(server);
 * @param {PteroServer} pteroServer Serwer, którego ustawienia mają być zarządzane
 * @property {PteroServer} pteroServer Serwer, którego ustawienia mają być zarządzane
 * @property {string} #apiKey Klucz API
 */
export class PteroSettingsManager {
  pteroServer: PteroServer;
  #apiKey: string;

  constructor(pteroServer: PteroServer) {
    this.pteroServer = pteroServer;
  }

  /**
   * Autoryzuje się kluczem API
   * @function
   * @example
   * const settings = new PteroSettingsManager(server);
   * settings.authorize('API_KEY');
   * @param {string} apiKey Klucz API
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
   * const settings = new PteroSettingsManager(server);
   * settings.unAuthorize();
   * @return boolean
   */
  unAuthorize(): boolean {
    this.#apiKey = '';
    return true;
  }

  /**
   * Zmienia nazwę serwera
   * @function
   * @example
   * const settings = new PteroSettingsManager(server);
   * settings.renameServer('Serwer Minecraft');
   * @param {string} name Nowa nazwa serwera
   * @return {Promise<boolean | APIException>}
   */
  async renameServer(name: string): Promise<boolean | APIException> {
    const apiResponse = await fetch(`https://ptero.mathost.eu/server/${this.pteroServer.serverId}/settings/rename`, {
      method: 'POST',
      headers: {
        "Accept": `application/json`,
        "Content-Type": `application/json`,
        'Authorization': `Bearer ${this.#apiKey}`
      },
      body: JSON.stringify({
        name
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
   * Przeprowadza ponowną instalację serwera
   * @function
   * @example
   * const settings = new PteroSettingsManager(server);
   * settings.reinstallServer();
   * @return {Promise<boolean | APIException>}
   */
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
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }

  /**
   * Zmienia obraz dockera serwera
   * @function
   * @example
   * const settings = new PteroSettingsManager(server);
   * settings.changeDockerImage('ghcr.io/parkervcp/yolks:nodejs_16');
   * @param {string} dockerImage Nowy obraz dockera
   * @return {Promise<boolean | APIException>}
   */
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
        const apiException = await apiResponse.json();
        return apiException as APIException;
      }
    }
  }
}