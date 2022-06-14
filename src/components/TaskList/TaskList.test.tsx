import React from 'react';
import { render } from '@testing-library/react';
import TaskList from './TaskList';
import TodoStoreProvider, {
    createStores,
} from '../../stores/TodoStoreProvider';

jest.mock('../../stores/TodoAppService');

describe('<TaskList />', () => {
    const { todoStore } = createStores();

    const renderWithStores = (children: JSX.Element) => {
        return render(<TodoStoreProvider>{children}</TodoStoreProvider>);
    };

    it('should render the task list correctly', () => {
        const { getByTestId } = renderWithStores(<TaskList />);
        expect(getByTestId('task-list')).toBeTruthy();
    });

    it('should list individual sliding items', () => {
        const { getByText } = renderWithStores(<TaskList />);
        const { todoList } = todoStore;

        todoList.forEach((todo) => {
            expect(getByText(`${todo.description}`)).toBeTruthy();
        });
    });
});
