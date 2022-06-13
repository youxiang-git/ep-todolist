import * as React from 'react';
import UserProfileStore from '../auth/UserProfileStore';
import TodoAppStore from './TodoAppStore';
import UiState from './TodoUIState';

export interface StoreContext {
    todoStore: TodoAppStore;
    uiState: UiState;
    userProfileStore: UserProfileStore;
}

let stores: StoreContext | null = null;
const storeContext = React.createContext<StoreContext | null>(stores);

export const createStores = () => {
    const uiState = new UiState();
    const userProfileStore = new UserProfileStore();
    stores = {
        uiState,
        userProfileStore,
        todoStore: new TodoAppStore(uiState),
    };

    return stores;
};

export const useStores = (): StoreContext => {
    const stores = React.useContext<StoreContext | null>(storeContext);
    if (!stores) {
        // this is especially useful in TypeScript so you don't need to be checking for null all the time
        throw new Error('useStores must be used within a StoreProvider.');
    }
    return stores;
};

type Props = {
    children: JSX.Element;
};

const TodoStoreProvider = ({ children }: Props) => {
    stores === null && createStores();

    return (
        <storeContext.Provider value={stores}>{children}</storeContext.Provider>
    );
};

export default TodoStoreProvider;
