import {
    IonApp,
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPopover,
    IonTitle,
    IonToolbar,
    NavContext,
    useIonPopover,
} from '@ionic/react';
import { personCircle, constructOutline, exitOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProfileStore from '../../../auth/UserProfileStore';
import { useStores } from '../../../stores/StoreProvider';

const MenuIcon = styled(IonIcon)`
    margin-right: 10px;
`;

interface AppHeaderProps {
    title: string;
}

const PopoverList: React.FC<{
    routeToPassword: () => void;
    userProfileStore: UserProfileStore;
}> = ({ routeToPassword, userProfileStore }) => {
    return (
        <IonList>
            <IonListHeader>
                <IonLabel style={{ fontWeight: 'bold' }}>
                    Hello {userProfileStore.userProfile.username}
                </IonLabel>
            </IonListHeader>
            <IonItem button={true} detail={false} onClick={routeToPassword}>
                <MenuIcon ios={constructOutline} md={constructOutline} />
                <IonLabel> Manage Account </IonLabel>
            </IonItem>
            <IonItem
                button={true}
                detail={false}
                onClick={async () => await userProfileStore.logout()}
            >
                <MenuIcon ios={exitOutline} md={exitOutline} />
                <IonLabel> Logout </IonLabel>
            </IonItem>
        </IonList>
    );
};

const AppHeader: React.FC<AppHeaderProps> = (props) => {
    const { navigate } = React.useContext(NavContext);
    const { userProfileStore } = useStores();
    const { title, children } = props;
    const [present, dismiss] = useIonPopover(PopoverList, {
        routeToPassword: () => {
            dismiss();
            setTimeout(() => navigate('/password'), 300);
        },
        userProfileStore,
    });

    return (
        <IonApp>
            <IonHeader data-testid="component-appheader">
                <IonToolbar color="primary">
                    <IonButtons slot="end">
                        <IonButton
                            onClick={(e) =>
                                present({
                                    event: e.nativeEvent,
                                })
                            }
                        >
                            <IonIcon
                                slot="icon-only"
                                ios={personCircle}
                                md={personCircle}
                            />
                        </IonButton>
                    </IonButtons>
                    <IonTitle> {title} </IonTitle>
                </IonToolbar>
            </IonHeader>
            {children}
        </IonApp>
    );
};

export default AppHeader;
