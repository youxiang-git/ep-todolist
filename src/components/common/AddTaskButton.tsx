import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useStores } from '../../stores/TodoStoreProvider';

const AddTaskButton: React.FC = () => {
    const { uiState } = useStores();

    return (
        <IonFab
            slot="fixed"
            horizontal="end"
            vertical="bottom"
            style={{ paddingBottom: '20px', paddingRight: '20px' }}
        >
            <IonFabButton
                onClick={() => uiState.setModalOpen(true)}
                size="small"
            >
                <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
        </IonFab>
    );
};

export default AddTaskButton;
