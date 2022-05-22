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
import { personCircle } from 'ionicons/icons';
import {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonAlert,
} from '@ionic/react';
import { useStores } from '../stores/StoreProvider';
import { AuthStatus } from '../auth/UserProfileStore';
import { autorun } from 'mobx';

const LoginPage: React.FC = () => {
    const { userProfileStore } = useStores();
    const { navigate } = useContext(NavContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');

    React.useEffect(
        // link mobx state to local state - authStatus
        () => autorun(() => setAuthStatus(userProfileStore.authStatus)),
        []
    );

    React.useEffect(() => {
        if (authStatus === 'true') {
            // redirect to home page if already authenticated
            navigate('/');
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
                    <IonRow>
                        <IonCol>
                            <IonAlert
                                isOpen={iserror}
                                onDidDismiss={() => setIserror(false)}
                                cssClass="my-custom-class"
                                header={'Error!'}
                                message={message}
                                buttons={['Dismiss']}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                style={{ fontSize: '70px', color: '#0040ff' }}
                                icon={personCircle}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Email </IonLabel>
                                <IonInput
                                    value={email}
                                    onIonChange={(e) =>
                                        setEmail(e.detail.value!)
                                    }
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
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
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={handleLogin}>
                                Login
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
