import { fetch } from 'undici';
import { PteroServer } from './PteroServer';
import { APIException } from '../types';
import { APIFile, APIFileList } from 'types/FileData';

/**
 * Klasa służąca do zarządzania plikami serwera.
 * @class PteroFileManager
 * @example
 * const files = new PteroFileManager(server);
 * @param {PteroServer} pteroServer Serwer, którego pliki mają być zarządzane
 * @property {PteroServer} pteroServer Serwer, którego pliki mają być zarządzane
 */
export class PteroFileManager {
  pteroServer: PteroServer;
  #apiKey: string;

  constructor(pteroServer: PteroServer) {
    this.pteroServer = pteroServer;
  }

  /**
   * Autoryzuje się kluczem API
   * @function
   * @example
   * const files = new PteroFileManager(server);
   * files.authorize('API_KEY');
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
   * const files = new PteroFileManager(server);
   * files.unAuthorize();
   * @return boolean
   */
  unAuthorize(): boolean {
    this.#apiKey = '';
    return true;
  }

  /**
   * Zwraca listę plików w katalogu
   * @function
   * @example
   * const files = new PteroFileManager(server);
   * files.getFiles('/');
   * @param {string} directory Folder do przeszukania
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
   * Zwraca zawartość określonego pliku
   * @function
   * @example
   * const files = new PteroFileManager(server);
   * files.getFile('package.json');
   * @param {string} file Ścieżka do pliku
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
   * Tworzy/Nadpisuje podany plik
   * @function
   * @example
   * const files = new PteroFileManager(server);
   * files.writeFile('test.txt', 'Hello World!');
   * @param {string} file Ścieżka do pliku
   * @param {string} content Nowa zawartość pliku
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
