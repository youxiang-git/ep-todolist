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
} from '@ionic/react';
import { personCircle, constructOutline, exitOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStores } from '../../../stores/StoreProvider';

const MenuIcon = styled(IonIcon)`
    margin-right: 10px;
`;

interface AppHeaderProps {
    title: string;
}

type PopoverEvent = {
    showPopover: boolean;
    event: any;
};

const AppHeader: React.FC<AppHeaderProps> = (props) => {
    const { navigate } = React.useContext(NavContext);
    const { title, children } = props;
    const { userProfileStore } = useStores();
    const [popoverState, setShowPopover] = useState<PopoverEvent>({
        showPopover: false,
        event: undefined,
    });

    useEffect(() => {
        console.log('popoverState: ', popoverState);
    }, [popoverState]);

    const routeToPassword = () => {
        // setShowPopover({
        //     showPopover: false,
        //     event: popoverState.event,
        // });
        setTimeout(() => navigate('/password'), 1000);
    };
    return (
        <IonApp>
            <IonHeader data-testid="component-appheader">
                <IonToolbar color="primary">
                    <IonButtons slot="end">
                        <IonButton
                            onClick={(e: any) => {
                                e.persist();
                                setShowPopover({ showPopover: true, event: e });
                            }}
                        >
                            <IonIcon
                                slot="icon-only"
                                ios={personCircle}
                                md={personCircle}
                            />
                        </IonButton>
                        {popoverState.showPopover && (
                            <IonPopover
                                event={popoverState.event}
                                isOpen={popoverState.showPopover}
                                onDidDismiss={() =>
                                    setShowPopover({
                                        showPopover: false,
                                        event: undefined,
                                    })
                                }
                            >
                                <IonList>
                                    <IonListHeader>
                                        <IonLabel
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            Hello{' '}
                                            {
                                                userProfileStore.userProfile
                                                    .username
                                            }
                                        </IonLabel>
                                    </IonListHeader>
                                    <IonItem
                                        button={true}
                                        detail={false}
                                        onClick={routeToPassword}
                                    >
                                        <MenuIcon
                                            ios={constructOutline}
                                            md={constructOutline}
                                        />
                                        <IonLabel> Manage Account </IonLabel>
                                    </IonItem>
                                    <IonItem
                                        button={true}
                                        detail={false}
                                        onClick={async () =>
                                            await userProfileStore.logout()
                                        }
                                    >
                                        <MenuIcon
                                            ios={exitOutline}
                                            md={exitOutline}
                                        />
                                        <IonLabel> Logout </IonLabel>
                                    </IonItem>
                                </IonList>
                            </IonPopover>
                        )}
                    </IonButtons>
                    <IonTitle> {title} </IonTitle>
                </IonToolbar>
            </IonHeader>
            {children}
        </IonApp>
    );
};

export default AppHeader;
