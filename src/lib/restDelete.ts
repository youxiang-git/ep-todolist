import axios from 'axios';
import { RestOptions } from './types';

type DeleteRequest = {
    endpoint: string;
    _id?: string;
    credentials?: {
        accessToken: string;
        idToken?: string;
        apiKey?: string;
    };
};

const restDelete = ({ endpoint, _id, credentials }: DeleteRequest) => {
    let options: RestOptions = {};
    if (credentials) {
        options['headers'] = {
            Authorization: `Bearer ${credentials.accessToken}`,
            // 'x-api-key': credentials.apiKey,
        };
    }

    console.log('options are: ' + `${options}`);
    return axios.delete(`${endpoint}/${_id}`, options);
};

export default restDelete;
