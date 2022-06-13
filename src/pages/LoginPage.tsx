import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    NavContext,
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import styled from 'styled-components';
import { personCircle } from 'ionicons/icons';
import {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonAlert,
} from '@ionic/react';
import { useStores } from '../stores/TodoStoreProvider';
import { AuthStatus } from '../auth/UserProfileStore';
import { autorun } from 'mobx';

const SmCol = styled(IonCol)`
    max-width: 540px;
    width: 100%;
`;

const LoginPage: React.FC = () => {
    const { userProfileStore } = useStores();
    const { navigate } = useContext(NavContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');

    useEffect(
        // link mobx state to local state - authStatus
        () => autorun(() => setAuthStatus(userProfileStore.authStatus)),
        []
    );

    useEffect(() => {
        switch (authStatus) {
            case 'checking':
                // placeholder to implement await auth checking
                // userProfileStore.setAuthStatus('false');
                break;
            case 'true':
                navigate('/');
                break;
        }
    }, [authStatus]);

    const handleLogin = async () => {
        try {
            await userProfileStore.signin();
            // login success
            navigate('/');
        } catch (err) {
            // login failed
            console.error(err);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <SmCol>
                            <IonAlert
                                isOpen={iserror}
                                onDidDismiss={() => setIserror(false)}
                                cssClass="my-custom-class"
                                header={'Error!'}
                                message={message}
                                buttons={['Dismiss']}
                            />
                        </SmCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <SmCol>
                            <IonIcon
                                style={{ fontSize: '70px', color: '#0040ff' }}
                                icon={personCircle}
                            />
                        </SmCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <SmCol>
                            <IonItem>
                                <IonLabel position="floating"> Email </IonLabel>
                                <IonInput
                                    value={email}
                                    onIonChange={(e) =>
                                        setEmail(e.detail.value!)
                                    }
                                />
                            </IonItem>
                        </SmCol>
                    </IonRow>

                    <IonRow class="ion-justify-content-center">
                        <SmCol>
                            <IonItem>
                                <IonLabel position="floating">
                                    {' '}
                                    Password
                                </IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                    onIonChange={(e) =>
                                        setPassword(e.detail.value!)
                                    }
                                />
                            </IonItem>
                        </SmCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <SmCol>
                            <IonButton expand="block" onClick={handleLogin}>
                                Login
                            </IonButton>
                        </SmCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
