import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { exitOutline } from 'ionicons/icons';
import React from 'react';

interface MenuItemProps {
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    return (
        <IonItem button={true} detail={false}>
            <IonIcon
                className=".icon-button"
                size="small"
                ios={exitOutline}
                md={exitOutline}
                slot="start"
            />
            <IonLabel> Manage Account </IonLabel>
        </IonItem>
    );
};
