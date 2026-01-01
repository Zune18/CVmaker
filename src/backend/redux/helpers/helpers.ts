import {store} from "../store";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ReduxHelpers {
	static callReduxAction(action: any, payload: any) {
		return store.dispatch(action(payload))
	}
}