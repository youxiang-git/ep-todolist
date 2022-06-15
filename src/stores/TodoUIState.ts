import { observable, action, makeObservable } from 'mobx';
import { EMPTY_ARRAY } from 'mobx/dist/internal';

/**
 * MobX store to manage UI states among components
 */

class TodoUiState {
    isEdit: boolean = false;
    error: string = '';
    uneditedTodoDesc = '';
    isModalOpen: boolean = false;
    toClose: any = null;

    constructor() {
        makeObservable(this, {
            setIsEdit: action,
            setError: action,
            setModalOpen: action,
            setToClose: action,
            error: observable,
            isModalOpen: observable,
            isEdit: observable,
            toClose: observable,
            uneditedTodoDesc: observable,
        });
    }

    setIsEdit = (editState: boolean) => {
        this.isEdit = editState;
        console.log(`Modal edit mode: ${this.isEdit}`);
    };

    setError = (error: string) => {
        this.error = error;
    };

    setModalOpen = (toggle: boolean) => {
        this.isModalOpen = toggle;
        console.log(this.isModalOpen);
    };

    setToClose = (item: any) => {
        this.toClose = item;
        console.log('toClose is: ' + this.toClose);
    };

    storeUneditedTodo = (desc: string) => {
        this.uneditedTodoDesc = desc;
    };

    checkSameTodo = (newDesc: string) => {
        console.log('Same input' + this.uneditedTodoDesc == newDesc);
        return this.uneditedTodoDesc == newDesc;
    };
}

export default TodoUiState;
