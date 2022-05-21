import { observable, action, makeObservable } from 'mobx';

/**
 * MobX store to manage UI states among components
 */

interface UiState {
    promptToAddHomeScreen: boolean; // whether the app has prompted user to add home screen
    error: string;
}

class UiState {
    promptToAddHomeScreen = false;
    error = '';

    constructor() {
        makeObservable(this, {
            setPromptToAddHomeScreen: action,
            error: observable,
            setError: action,
        });
    }

    setPromptToAddHomeScreen = (prompted: boolean) => {
        this.promptToAddHomeScreen = prompted;
        console.log(`set prompt: ${this.promptToAddHomeScreen}`);
    };

    setError = (error: string) => {
        this.error = error;
    };
}

export default UiState;
