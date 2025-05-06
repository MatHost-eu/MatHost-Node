import { fetch } from 'undici';

import {
	AccountData,
	APIAccountData,
	APIException,
	APITwoFactorCodes,
	APITwoFactorData, TwoFactorCodes,
	TwoFactorData,
} from '../types';

/**
 * Class for retrieving account information from the MatHost.eu API
 * @class PteroAccount
 * @example
 * const account = new PteroAccount();
 */
export class PteroAccount {
	#apiKey: string;

	constructor() {
		this.#apiKey = '';
	}

	/**
   * Authorizes with an API key
   * @function
   * @example
   * const account = new PteroAccount();
   * account.authorize('API_KEY');
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
   * const account = new PteroAccount();
   * account.unAuthorize();
   * @return boolean
   */
	unAuthorize(): boolean {
		this.#apiKey = '';
		return true;
	}

	/**
   * Retrieves account data
   * @function
   * @example
   * const account = new PteroAccount();
   * const accountData = await account.getAccountData();
   * @return {Promise<AccountData>}
   */
	async getAccountData(): Promise<AccountData> {
		const apiResponse = await fetch('https://ptero.mathost.eu/api/client/account', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
		});

		switch (apiResponse.status) {
		case 200: {
			const apiAccountData = await apiResponse.json();
			return (apiAccountData as APIAccountData).attributes;
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
	 * Generates a QR code for enabling two-factor authentication
	 * @function
	 * @example
	 * const account = new PteroAccount();
	 * const qrCode = await account.generateTwoFactorQR();
	 * @return {Promise<TwoFactorData>}
	 */
	async generateTwoFactorQR(): Promise<TwoFactorData> {
		const apiResponse = await fetch('https://ptero.mathost.eu/api/client/account/two-factor', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
		});

		switch (apiResponse.status) {
		case 200: {
			const apiTwoFactorData = await apiResponse.json();
			return (apiTwoFactorData as APITwoFactorData).data;
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
	 * Enables two-factor authentication for the account
	 * @function
	 * @example
	 * const account = new PteroAccount();
	 * account.enableTwoFactor('123456');
	 * @return {Promise<TwoFactorCodes>}
	 */
	async enableTwoFactor(code: string): Promise<TwoFactorCodes> {
		const apiResponse = await fetch('https://ptero.mathost.eu/api/client/account/two-factor', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
			body: JSON.stringify({
				code: code,
			}),
		});

		switch (apiResponse.status) {
		case 200: {
			const apiTwoFactorCodes = await apiResponse.json();
			return (apiTwoFactorCodes as APITwoFactorCodes).attributes;
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
	 * Disables two-factor authentication for the account
	 * @function
	 * @example
	 * const account = new PteroAccount();
	 * account.disableTwoFactor('password');
	 * @return {Promise<boolean>}
	 */
	async disableTwoFactor(password: string): Promise<boolean> {
		const apiResponse = await fetch('https://ptero.mathost.eu/api/client/account/two-factor', {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.#apiKey}`,
			},
			body: JSON.stringify({
				password: password,
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