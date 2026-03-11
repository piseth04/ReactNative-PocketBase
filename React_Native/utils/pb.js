import { Platform } from 'react-native';
import Constants from 'expo-constants';
import PocketBase from 'pocketbase';

const getPocketBaseHost = () => {
	const hostUri =
		Constants.expoConfig?.hostUri ||
		Constants.manifest2?.extra?.expoClient?.hostUri ||
		Constants.manifest?.debuggerHost;

	if (hostUri) {
		return hostUri.split(':')[0];
	}

	return Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
};

export const pbBaseUrl = `http://${getPocketBaseHost()}:8090`;

const pb = new PocketBase(pbBaseUrl);

export default pb;