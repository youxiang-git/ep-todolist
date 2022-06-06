import {
    IonContent,
    IonFabButton,
    IonModal,
    IonFab,
    IonIcon,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import AppHeader from '../components/common/AppHeader';
import TaskList from '../components/TaskList/TaskList';
import AddTaskButton from '../components/common/AddTaskButton';

const AppTabs: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <IonContent>
            <AppHeader title="TASKS">
                <TaskList />
                <IonFab slot="fixed" horizontal="end" vertical="bottom">
                    <IonFabButton onClick={() => setOpen(true)}>
                        <IonIcon icon={addOutline}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <IonModal
                    isOpen={open}
                    breakpoints={[0, 0.2, 0.5, 1]}
                    initialBreakpoint={0.5}
                    backdropBreakpoint={0.2}
                ></IonModal>
            </AppHeader>
        </IonContent>
    );
};

export default AppTabs;
