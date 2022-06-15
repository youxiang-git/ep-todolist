import { timeStamp } from 'console';
import { action, makeObservable, observable, runInAction } from 'mobx';
import TodoAppService from './TodoAppService';
import TodoUiState from './TodoUIState';

export type Todo = {
    id?: string;
    description: string;
    completed: boolean;
};

const delTodo = (todos: Todo[], id: string) =>
    todos.filter((todo) => todo.id !== id);

class TodoAppStore {
    todoAppService: TodoAppService;
    uiState: TodoUiState;
    todoList: Todo[] = [];
    newTodo: string = '';
    idToEdit: string = '';

    constructor(uiState: TodoUiState) {
        makeObservable(this, {
            todoList: observable,
            newTodo: observable,
            onChangeTodo: action,
            resetNewTodo: action,
        });
        this.todoAppService = new TodoAppService();
        this.uiState = uiState;
    }

    getTodoTaskList = async () => {
        try {
            const tempTodoList: Todo[] =
                await this.todoAppService.getTodoTaskListAsync();

            runInAction(() => {
                //console.log(tempTodoList);
                this.todoList = tempTodoList;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    addTodo = async (description: string, completed: boolean) => {
        try {
            const { id } = await this.todoAppService.addTaskAsync({
                description,
                completed,
            });
            runInAction(
                () => (
                    (this.todoList = [
                        ...this.todoList,
                        { id, description, completed },
                    ]),
                    this.resetNewTodo()
                )
            );
        } catch (error) {
            console.log(`Error in addTodo: ${error}`);
            throw error;
        }
    };

    delTodo = async (id: string) => {
        try {
            const { _id } = await this.todoAppService.delTaskAsync(id);
            if (!id) return;

            await this.getTodoTaskList();
        } catch (error) {
            console.log(`Error in delTodo: ${error}`);
            throw error;
        }
    };

    editTaskComplete = async (
        id: string,
        description: string,
        completed: boolean
    ) => {
        const { _id } = await this.todoAppService.editTaskCompleteAsync(
            id,
            description,
            completed
        );

        if (!_id) console.log('no id');

        this.getTodoTaskList();
    };

    editTaskDescription = async (
        id: string,
        description: string,
        completed: boolean
    ) => {
        const { _id } = await this.todoAppService.editTaskDescriptionAsync(
            id,
            description,
            completed
        );

        if (!_id) console.log('no id');

        this.getTodoTaskList();
    };

    onChangeTodo(newInput: string) {
        this.newTodo = newInput;
        console.log('newTodo is: ' + this.newTodo);
    }

    resetNewTodo() {
        this.newTodo = '';
    }

    updateNewTodo(desc: string, id: string) {
        this.newTodo = desc;
        console.log('newTodo updated to: ' + this.newTodo);
        this.idToEdit = id;
    }
}

export default TodoAppStore;
