import React, { useEffect } from 'react';
import {
    IonContent,
    IonGrid,
    IonList,
    IonRefresher,
    IonRefresherContent,
} from '@ionic/react';
import { observer } from 'mobx-react';
import { RefresherEventDetail } from '@ionic/core';
import { useStores } from '../../stores/TodoStoreProvider';
import TaskSlidingItem from './TaskSlidingItem';
import styled from 'styled-components';

const TaskListGrid = styled(IonGrid)`
    --ion-grid-width-xs: 100%;
    --ion-grid-width-sm: 480px;
    --ion-grid-width-md: 480px;
    --ion-grid-width-lg: 480px;
    --ion-grid-width-xl: 480px;
    min-width: 360px;
`;

const TaskList: React.FC = () => {
    const { todoStore } = useStores();

    useEffect(() => {
        todoStore.getTodoTaskList();
    }, []);

    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        todoStore.getTodoTaskList();

        setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
        }, 500);
    };

    return (
        <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            {<h1>Nothing to display</h1> && todoStore.todoList.length == 0}
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
