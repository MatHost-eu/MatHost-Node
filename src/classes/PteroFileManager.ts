import { fetch } from 'undici';
import { PteroServer } from './PteroServer';
import { APIException } from '../types';
import { APIFile, APIFileList } from 'types/FileData';

/**
 * Class for managing server files.
 * @class PteroFileManager
 * @example
 * const files = new PteroFileManager(server);
 * @param {PteroServer} pteroServer Server whose files are to be managed
 * @property {PteroServer} pteroServer Server whose files are to be managed
 */
export class PteroFileManager {
  pteroServer: PteroServer;
  #apiKey: string;

  constructor(pteroServer: PteroServer) {
    this.pteroServer = pteroServer;
  }

  /**
   * Authorizes with an API key
   * @function
   * @example
   * const files = new PteroFileManager(server);
   * files.authorize('API_KEY');
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
   * const files = new PteroFileManager(server);
   * files.unAuthorize();
   * @return boolean
   */
  unAuthorize(): boolean {
    this.#apiKey = '';
    return true;
  }

  /**
   * Returns a list of files in a directory
   * @function
   * @example
   * const files = new PteroFileManager(server);
   * files.getFiles('/');
   * @param {string} directory Directory to search
   * @return {Promise<APIFile[]>}
   */
  async getFiles(directory?: string): Promise<APIFile[]> {
    if (directory) directory = encodeURIComponent(directory);
    const apiResponse = await fetch(
      `https://ptero.mathost.eu/api/client/servers/${this.pteroServer.serverId}/files/list${
        directory ? `?directory=${directory}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.#apiKey}`,
        },
      },
    );

    switch (apiResponse.status) {
      case 200: {
        const fileList = await apiResponse.json();
        return (fileList as APIFileList).data;
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
   * Returns the content of a specified file
   * @function
   * @example
   * const files = new PteroFileManager(server);
   * files.getFile('package.json');
   * @param {string} file Path to the file
   * @return {Promise<string>}
   */
  async getFile(file: string): Promise<string> {
    file = encodeURIComponent(file);
    const apiResponse = await fetch(
      `https://ptero.mathost.eu/api/client/servers/${this.pteroServer.serverId}/files/contents${
        file ? `?file=${file}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.#apiKey}`,
        },
      },
    );

    switch (apiResponse.status) {
      case 200: {
        const fileContent = await apiResponse.json();
        return fileContent as string;
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
   * Creates/Overwrites the specified file
   * @function
   * @example
   * const files = new PteroFileManager(server);
   * files.writeFile('test.txt', 'Hello World!');
   * @param {string} file Path to the file
   * @param {string} content New content of the file
   * @return {Promise<boolean>}
   */
  async writeFile(file: string, content?: string): Promise<boolean> {
    file = encodeURIComponent(file);
    const apiResponse = await fetch(
      `https://ptero.mathost.eu/api/client/servers/${this.pteroServer.serverId}/files/write${
        file ? `?file=${file}` : ''
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.#apiKey}`,
        },
        body: content,
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
