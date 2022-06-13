import { TODO_ENDPOINT } from '../settings';
// import { Movie } from './AppStore';
import restGet from '../lib/restGet';
import restPost from '../lib/restPost';
import { Todo } from './TodoAppStore';
import restDelete from '../lib/restDelete';
import restPut from '../lib/restPut';

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
class TodoAppService {
    getTodoTaskListAsync = (): Promise<Todo[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await restGet({
                    endpoint: TODO_ENDPOINT,
                });
                const todoList: Todo[] | null =
                    'data' in response ? response.data : null;
                if (!todoList) throw Error('Missing todo-list data!');
                console.log(todoList);
                resolve(todoList);
            } catch (err: any) {
                console.log(err.message);
                reject(err.message);
            }
        });
    };

    addTaskAsync(task: Todo): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await restPost({
                    endpoint: TODO_ENDPOINT,
                    data: task,
                });
                const result = 'data' in response ? response.data : null;
                if (!result) throw Error('Missing todo-list data!');
                console.log('addTaskAsync result: ' + result);
                resolve(result);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(`Error in addTaskAsync: ${err.message}`);
                    reject(`Error in addTaskAsync: ${err.message}`);
                }
            }
        });
    }

    delTaskAsync(_id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await restDelete({
                    endpoint: TODO_ENDPOINT,
                    _id: _id,
                });
                const result = 'data' in response ? response.data : null;
                if (!result) throw Error('Missing todo-list data!');
                console.log('delTaskAsync result: ' + result);
                resolve(result);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`Error in delTaskAsync: ${error.message}`);
                    reject(`Error in delTaskAsync: ${error.message}`);
                }
            }
        });
    }

    editTaskCompleteAsync(
        id: string,
        description: string,
        completed: boolean
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await restPut({
                    endpoint: TODO_ENDPOINT,
                    _id: id,
                    description: description,
                    completed: !completed,
                });
                const result = 'data' in response ? response.data : null;
                if (!result) throw Error('Missing todo-list data!');
                console.log('editTaskCompleteAsync result: ' + result);
                resolve(result);
            } catch (error) {
                if (error instanceof Error) {
                    console.log('Error in editTaskCompleteAsync');
                    reject('Error in editTaskCompleteAsync: ' + error.message);
                }
            }
        });
    }

    editTaskDescriptionAsync(
        id: string,
        description: string,
        completed: boolean
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await restPut({
                    endpoint: TODO_ENDPOINT,
                    _id: id,
                    description: description,
                    completed: completed,
                });
                const result = 'data' in response ? response.data : null;
                if (!result) throw Error('Missing todo-list data!');
                console.log(result);
                resolve(result);
            } catch (error) {
                if (error instanceof Error) {
                    console.log('Error in editTaskCompleteAsync');
                    reject('Error in editTaskCompleteAsync: ' + error.message);
                }
            }
        });
    }
}

export default TodoAppService;
