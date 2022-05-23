import { observable, action, makeObservable } from 'mobx';

/**
 * MobX store to manage UI states among components
 */

class UiState {
    promptToAddHomeScreen: boolean = false;
    error: string = '';

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
