import React, { useEffect } from 'react';
import { IonContent, IonGrid, IonList } from '@ionic/react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/TodoStoreProvider';
import TaskSlidingItem from './TaskSlidingItem';
import styled from 'styled-components';

const TaskListGrid = styled(IonGrid)`
    --ion-grid-width-xs: 100%;
    --ion-grid-width-sm: 640px;
    --ion-grid-width-md: 640px;
    --ion-grid-width-lg: 640px;
    --ion-grid-width-xl: 640px;
    min-width: 480px;
`;

const TaskList: React.FC = () => {
    const { todoStore } = useStores();

    useEffect(() => {
        todoStore.getTodoTaskList();
    }, []);

    return (
        <IonContent>
            <TaskListGrid fixed>
                <IonList inset>
                    <TaskSlidingItemsObserver />
                </IonList>
            </TaskListGrid>
        </IonContent>
    );
};

const TaskSlidingItemsObserver = observer(TaskSlidingItem);

export default TaskList;
