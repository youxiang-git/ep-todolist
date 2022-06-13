import { Todo } from '../TodoAppStore';

class TodoAppStore {
    getTodoTaskListAsync = (): Promise<Todo[]> => {
        return new Promise((resolve) => {
            resolve([
                {
                    id: 'h52-go9Dz4rrwSXt0uaM-',
                    description: 'Test Task 1',
                    completed: false,
                },
                {
                    id: '_A8jxx5ndYPcBWTdVVR0i',
                    description: 'Test Task 2',
                    completed: false,
                },
                {
                    id: 'qm67uDgYrOMeJf05jmKDW',
                    description: 'Test Task 3',
                    completed: true,
                },
            ]);
        });
    };

    addTaskAsync(task: Todo): Promise<any> {
        return new Promise(async (resolve) => {
            resolve({
                id: 'BsPht9ulh7UqRG3YsVzPi',
                description: 'Test Add Task 1',
                completed: false,
            });
        });
    }

    delTaskAsync(_id: string): Promise<any> {
        return new Promise(async (resolve) => {
            resolve(`Task ${_id} Successfully Deleted`);
        });
    }

    editTaskCompleteAsync(
        id: string,
        description: string,
        completed: boolean
    ): Promise<any> {
        return new Promise(async (resolve) => {
            resolve({
                id: id,
                description: description,
                completed: !completed,
            });
        });
    }

    
}
