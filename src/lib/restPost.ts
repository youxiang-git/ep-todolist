/*
  Implemented for Dependency Inversion Principle:
    A. High-level modules should not depend upon low-level modules. Both should depend upon abstractions.
    B. Abstractions should not depend on details. Details should depend upon abstractions.

  In short, low-level axios can be easily replaced by other http get libraries or SDK. Furthermore, we can implement our own mock Axios.
*/

import axios from 'axios';
import { RestOptions } from './types';

type PostRequest = {
    endpoint: string;
    data?: any;
    credentials?: {
        accessToken: string;
        apiKey?: string;
    };
};

const restPost = ({
    endpoint,
    data = {},
    credentials = undefined,
}: PostRequest) => {
    let options: RestOptions = {};
    if (credentials) {
        options['headers'] = {
            Authorization: `Bearer ${credentials.accessToken}`,
            // 'x-api-key': credentials.apiKey,
        };
    }

    return axios.post(endpoint, data, options);
};

export default restPost;
