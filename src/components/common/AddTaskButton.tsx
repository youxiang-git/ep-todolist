import React from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

const AddTaskButton: React.FC = () => {
    return (
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton>
                <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
        </IonFab>
    );
};

export default AddTaskButton;
