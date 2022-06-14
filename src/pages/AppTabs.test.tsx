import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AddTaskButton from '../components/common/AddTaskButton';
import AppTabs from './AppTabs';
import TodoStoreProvider, { createStores } from '../stores/TodoStoreProvider';
import { ionFireEvent, waitForIonicReact } from '@ionic/react-test-utils';

describe('<AppTabs />', () => {
    const { todoStore } = createStores();

    const renderWithStores = (children: JSX.Element) => {
        return render(<TodoStoreProvider>{children}</TodoStoreProvider>);
    };

    const setup = async (testid: string) => {
        const mainScreen = renderWithStores(<AppTabs />);
        await waitForIonicReact();
        const renderedComponent = mainScreen.getByTestId(testid);

        return { mainScreen, renderedComponent };
    };

    it('should render the add-fab-button', async () => {
        const { renderedComponent } = await setup('add-fab-button');
        expect(renderedComponent).toBeTruthy();
    });

    it('clicking on fab should show the TaskForm modal', async () => {
        const { mainScreen, renderedComponent } = await setup('add-fab-button');
        ionFireEvent.click(renderedComponent);
        await waitForIonicReact();
        expect(mainScreen.getByTestId('bottom-sheet-modal')).toBeTruthy();
    });
});
