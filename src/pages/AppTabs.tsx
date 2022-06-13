import { IonContent, IonModal } from '@ionic/react';
import React from 'react';
import AppHeader from '../components/common/AppHeader';
import TaskList from '../components/TaskList/TaskList';
import TaskForm from '../components/common/AppHeader/TaskForm';
import AddTaskButton from '../components/common/AddTaskButton';
import { useStores } from '../stores/TodoStoreProvider';
import { observer } from 'mobx-react-lite';

const AppTabs: React.FC = () => {
    const { todoStore, uiState } = useStores();

    const closeModal = () => {
        uiState.setModalOpen(false);
        uiState.setIsEdit(false);
        todoStore.resetNewTodo();
    };

    return (
        <IonContent>
            <AppHeader title="TASKS">
                <TaskList />
                <AddTaskButton />
                <IonModal
                    isOpen={uiState.isModalOpen}
                    backdropDismiss={true}
                    breakpoints={[0, 0.5]}
                    initialBreakpoint={0.5}
                    backdropBreakpoint={0}
                    onDidDismiss={closeModal}
                >
                    <TaskForm dismiss={closeModal} />
                </IonModal>
            </AppHeader>
        </IonContent>
    );
};

export default observer(AppTabs);
