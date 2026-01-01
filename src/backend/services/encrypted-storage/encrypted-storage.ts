import { AES, enc } from 'crypto-js';

function dec2hex(dec: any) {
	return dec.toString(16).padStart(2, '0');
}

function generateKey(len: number) {
	const arr = new Uint8Array((len || 40) / 2);
	window.crypto.getRandomValues(arr);
	return Array.from(arr, dec2hex).join('');
}

function encrypt(text: any) {
	const stringData = JSON.stringify(text);
	const key = generateKey(40);
	const encrypted = AES.encrypt(stringData, key);
	const formattedData = encrypted.toString().concat('.').concat(key);
	return formattedData;
}

function decrypt(text: any) {
	try {
		const split = text.split('.');
		const decipher = AES.decrypt(split[0], split[1]);
		const decrypted = decipher.toString(enc.Utf8);
		return JSON.parse(decrypted);
	} catch (e) {
		return null;
	}
}

const APP_ENCRYPTED_STORAGE_NAME = "cvmaker_app_"

function formattedKey(key: string) {
	return APP_ENCRYPTED_STORAGE_NAME.concat(key)
}

export enum EncryptedStorageKeys {
    sessionId = 'sessionId'
}

interface IEncryptedStorage {
    setItem: (key: EncryptedStorageKeys, data: any) => boolean;
    getItem: (key: EncryptedStorageKeys) => any;
    clearItem: (key: EncryptedStorageKeys) => boolean;
}

const EncryptedStorage: IEncryptedStorage = {
	setItem: (key, data) => {
		try {
			localStorage.setItem(formattedKey(key), encrypt(data));
			return true;
		} catch (e) {
			return false;
		}
	},
	getItem: (key) => {
		const encryptedData = localStorage.getItem(formattedKey(key));
		if (!encryptedData) {
			return null;
		}
		return decrypt(encryptedData);
	},
	clearItem: (key) => {
		try {
			localStorage.removeItem(formattedKey(key));
			return true;
		} catch (e) {
			return false;
		}
	}
};

export { encrypt, decrypt, EncryptedStorage };
