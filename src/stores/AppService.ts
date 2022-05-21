import { ADDRESS, MOVIE_ENDPOINT } from '../settings';
import { Movie } from './AppStore';
import restGet from '../lib/restGet';
import restPost from '../lib/restPost';

declare global {
    interface Window {
        ethereum: any;
    }
}

/**
 * AppService - abstractor class to interact with Ethereum chain via Infura API.
 * Can be deployed to server backend without requiring users to install FE wallets like Metamask
 *
 * Reference for connecting to endpoint with ethers:
 * https://blog.infura.io/ethereum-javascript-libraries-web3-js-vs-ethers-js-part-ii/#section-6-ethers
 *
 */
class AppService {
    async updateWalletAsset() {
        if (
            typeof window == 'undefined' ||
            typeof window.ethereum == 'undefined'
        ) {
            return;
        }
        try {
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: ADDRESS,
                        symbol: 'MOV',
                        decimals: 0,
                        image: 'https://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-drives/256/Movies-icon.png',
                    },
                },
            });
            console.log('MOV token updated in wallet!');
        } catch (err) {
            console.error(err);
        }
    }

    getMovieListAsync(): Promise<Movie[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await restGet({
                    endpoint: MOVIE_ENDPOINT,
                });
                const movieList: Movie[] | null =
                    'data' in response ? response.data : null;
                if (!movieList) throw Error('missing data!');
                // console.log(movieList);
                resolve(movieList);
            } catch (err) {
                reject(`Error in getMovieListAsync: ${err}`);
            }
        });
    }

    addMovieAsync(movie: Movie): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await restPost({
                    endpoint: MOVIE_ENDPOINT,
                    data: movie,
                });
                const result = 'data' in response ? response.data : null;
                if (!result) throw Error('missing data!');
                resolve(result);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(`Error in addMovieAsync: ${err.message}`);
                    reject(`Error in addMovieAsync: ${err.message}`);
                }
            }
        });
    }
}

export default AppService;
