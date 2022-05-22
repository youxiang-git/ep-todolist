import { observable, action, makeObservable } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';
import localForage from 'localforage';

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
            authStatus: observable, // persisted in localForage
            setAuthStatus: action,
            setUserProfile: action,
            signin: action,
            logout: action,
        });

        makePersistable(this, {
            name: 'UserProfileStore',
            properties: ['authStatus', 'userProfile'],
            storage: localForage, // localForage, window.localStorage, AsyncStorage all have the same interface
            expireIn: 3600000, // One hour in millsesconds
            removeOnExpiration: true,
            stringify: false,
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
        this.authStatus = 'true';
    }

    logout() {
        this.authStatus = 'false';
        setTimeout(() => stopPersisting(this), 1000);
    }
}

export default UserProfileStore;
