import { fetch } from 'undici';

import { PteroServer } from './PteroServer';
import { APIException } from '../types';

/**
 * Class for managing server settings.
 * @class PteroSettingsManager
 * @example
 * const settings = new PteroSettingsManager(server);
 * @param {PteroServer} pteroServer Server whose settings are to be managed
 * @property {PteroServer} pteroServer Server whose settings are to be managed
 */
export class PteroSettingsManager {
  pteroServer: PteroServer;
  #apiKey: string;

  constructor(pteroServer: PteroServer) {
    this.pteroServer = pteroServer;
  }

  /**
   * Authorizes with an API key
   * @function
   * @example
   * const settings = new PteroSettingsManager(server);
   * settings.authorize('API_KEY');
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
   * const settings = new PteroSettingsManager(server);
   * settings.unAuthorize();
   * @return boolean
   */
  unAuthorize(): boolean {
    this.#apiKey = '';
    return true;
  }

  /**
   * Changes the server name
   * @function
   * @example
   * const settings = new PteroSettingsManager(server);
   * settings.renameServer('Minecraft Server');
   * @param {string} name New server name
   * @return {Promise<boolean>}
   */
  async renameServer(name: string): Promise<boolean> {
    const apiResponse = await fetch(
      `https://ptero.mathost.eu/api/client/servers/${this.pteroServer.serverId}/settings/rename`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.#apiKey}`,
        },
        body: JSON.stringify({
          name,
        }),
      },
    );

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
   * Reinstalls the server
   * @function
   * @example
   * const settings = new PteroSettingsManager(server);
   * settings.reinstallServer();
   * @return {Promise<boolean>}
   */
  async reinstallServer(): Promise<boolean> {
    const apiResponse = await fetch(
      `https://ptero.mathost.eu/api/client/servers/${this.pteroServer.serverId}/settings/reinstall`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.#apiKey}`,
        },
        body: null,
      },
    );

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
   * Changes the server's Docker image
   * @function
   * @example
   * const settings = new PteroSettingsManager(server);
   * settings.changeDockerImage('ghcr.io/parkervcp/yolks:nodejs_16');
   * @param {string} dockerImage New Docker image
   * @return {Promise<boolean>}
   */
  async setDocketImage(dockerImage: string): Promise<boolean> {
    const apiResponse = await fetch(
      `https://ptero.mathost.eu/api/client/servers/${this.pteroServer.serverId}/settings/docker-image`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.#apiKey}`,
        },
        body: JSON.stringify({
          docker_image: dockerImage,
        }),
      },
    );

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
