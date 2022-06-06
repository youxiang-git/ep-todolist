import React from 'react';
import {
    IonItemSliding,
    IonLabel,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonCheckbox,
    IonItem,
} from '@ionic/react';
import { useStores } from '../../stores/StoreProvider';
import { create, createOutline, trash } from 'ionicons/icons';
import './TaskSlidingItem.module.css';

const TaskSlidingItem: React.FC<{ desc: string }> = ({ desc }) => {
    return (
        <IonItemSliding>
            <IonItem>
                <IonCheckbox checked-slot="start"></IonCheckbox>
                <IonLabel text-wrap>{desc}</IonLabel>
            </IonItem>

            <IonItemOptions side="end">
                <IonItemOption color="danger">
                    <IonIcon slot="end" size="medium" icon={trash}></IonIcon>
                </IonItemOption>
                <IonItemOption color="warning">
                    <IonIcon slot="end" icon={createOutline} />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default TaskSlidingItem;
