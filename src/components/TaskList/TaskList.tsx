import React from 'react';
import { IonContent, IonList } from '@ionic/react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/StoreProvider';
import TaskSlidingItem from './TaskSlidingItem';

const TaskList: React.FC = () => {
    return (
        <IonContent fullscreen>
            <IonList>
                <TaskSlidingItem desc={'Do up wireframe'} />
                <TaskSlidingItem desc={'Read up on MobX'} />
                <TaskSlidingItem desc={'Incorrect Description'} />
                <TaskSlidingItem desc={'Description 1'} />
                <TaskSlidingItem desc={'Description 2'} />
                <TaskSlidingItem desc={'Description 3'} />
                <TaskSlidingItem desc={'Description 4'} />
                <TaskSlidingItem desc={'Description 5'} />
                <TaskSlidingItem desc={'Description 6'} />
                <TaskSlidingItem desc={'Description 7'} />
                <TaskSlidingItem desc={'Description 8'} />
                <TaskSlidingItem desc={'Description 9'} />
                <TaskSlidingItem desc={'Description 10'} />
                <TaskSlidingItem desc={'Description 11'} />
                <TaskSlidingItem desc={'Description 12'} />
                <TaskSlidingItem
                    desc={
                        'Very Long Description AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    }
                />
            </IonList>
        </IonContent>
    );
};

export default TaskList;
