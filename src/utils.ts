import { APIException } from './types';

export function isError(data: any): data is APIException {
	return !!(data as APIException).errors;
}