import { observable, action, makeObservable } from 'mobx';
import { makePersistable, clearPersistedStore } from 'mobx-persist-store';

export type AuthStatus = 'checking' | 'true' | 'false' | 'forceChangePassword';

export interface UserProfile {
    username: string;
    email: string;
}

class UserProfileStore {
    authStatus: AuthStatus = 'checking';
    userProfile: UserProfile = {
        username: 'Test User',
        email: 'test@example.com',
    };

    constructor() {
        makeObservable(this, {
            authStatus: observable, // persisted
            userProfile: observable, // persisted
            setAuthStatus: action,
            setUserProfile: action,
            signin: action,
            logout: action,
        });

        makePersistable(this, {
            name: 'UserProfileStore',
            properties: ['authStatus', 'userProfile'],
            storage: window.sessionStorage, // localForage, window.localStorage, AsyncStorage all have the same interface
            expireIn: 3600000, // One hour in millsesconds
            removeOnExpiration: true,
            stringify: true,
            debugMode: false,
        });
    }

    setUserProfile(userProfile: UserProfile) {
        this.userProfile = userProfile;
    }

    setAuthStatus(authenticated: AuthStatus) {
        this.authStatus = authenticated;
    }

    signin() {
        // hard code for now
        this.authStatus = 'true';
    }

    async logout() {
        // hard code for now
        this.authStatus = 'false';
        await clearPersistedStore(this);
    }
}

export default UserProfileStore;
