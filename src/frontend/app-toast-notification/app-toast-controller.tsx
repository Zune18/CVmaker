import React from 'react';
import {createToastComponent, LoadingToast} from "./toasts";
import {Bounce, Flip, toast} from 'react-toastify';
import {v4 as uuidv4} from 'uuid'
import _ from 'lodash'

const APP_TOAST_LIMIT = 4;
export const APP_TOAST_TIME = 2000;
const APP_TOAST_KEY = "CVMAKER_APP_TOAST_KEY"

export const AppToastController = {
	showToast: (message: string, id?: string): string => {
		const toastElement = createToastComponent(
			<>
				<p>{message}</p>
			</>
		);

		const toastId = id || uuidv4();
		saveToastId(toastId)
		toast(toastElement, {
			autoClose: APP_TOAST_TIME,
			toastId,
			transition: Bounce
		});
		return toastId;
	},

	hideToast: (toastId: string): void => {
		let data = getToastListIds();
		removeToast(toastId);
		data = data.filter((id) => id !== toastId);
		saveList(data);
	},

	loadingToast: (toastId: string, message: string) => {
		const toastElement = createToastComponent(
			<>
				<LoadingToast>
					<p>{message}</p>
				</LoadingToast>
			</>
		);

		saveToastId(toastId)
		toast(toastElement, {
			toastId,
			autoClose: false
		});
		return toastId;
	},

	completeToast: (toastId: string, message: string) => {
		const toastElement = createToastComponent(
			<>
				<p>{message}</p>
			</>
		);

		saveToastId(toastId)
		if (hasToastIdActive(toastId)) {
			toast.update(toastId, {
				autoClose: APP_TOAST_TIME,
				render: toastElement,
				transition: Flip
			});
		}
		return toastId;
	}
}

function hasToastIdActive(toastId: string): boolean {
	const data = getToastListIds();
	return _.includes(data, toastId) && toast.isActive(toastId);
}

function getToastListIds(): string[] {
	const data = sessionStorage.getItem(APP_TOAST_KEY);
	let list = [];
	if (data) {
		list = JSON.parse(data);
	}
	return list;
}

function saveList(data: string[]): void {
	sessionStorage.setItem(APP_TOAST_KEY, JSON.stringify(data));
}

function saveToastId(toastId: any): void {
	let currentList = getToastListIds();
	currentList = _.difference(currentList, [toastId])
	let removeToastId;
	if (currentList.length >= APP_TOAST_LIMIT) {
		removeToastId = currentList.pop();
	}
	removeToast(removeToastId);
	currentList.unshift(toastId);
	saveList(currentList);
}

function removeToast(toastId?: string): void {
	if (toastId) {
		toast.dismiss(toastId);
	}
}
