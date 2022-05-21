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
// import { signin, TokensType } from '@tinnolab/aws-cognito-sso';
// import { useStores } from '../stores/StoreProvider';

const LoginPage: React.FC = () => {
    // const { userProfileStore } = useStores();
    const { navigate } = useContext(NavContext);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    // useEffect(() => {
    //     userProfileStore.setDomain(
    //         typeof window !== undefined ? window.location.hostname : 'localhost' // set to development if mobile app
    //     );
    // }, []);

    const nextRoute = (tokenType: string) => {
        if (tokenType === 'Bearer') return '/';
        if (tokenType === 'NEW_PASSWORD_REQUIRED') return '/password';
        throw new Error(`No valid token found! TokenType: ${tokenType}`);
    };

    const handleLogin = async () => {
        // if (!password || password.length < 6) {
        //     setMessage('Please enter your password');
        //     setIserror(true);
        //     return;
        // }
        // try {
        //     console.log({ username, password });
        //     userProfileStore.setUserProfile({
        //         username,
        //         password,
        //     });
        //     const { tokenType }: TokensType = await signin(userProfileStore);
        //     if (tokenType === undefined)
        //         throw new Error('No valid token found!');
        //     // redirect to intended url after login
        //     navigate(nextRoute(tokenType)); // use redirect() for next.js
        // } catch (err) {
        //     setMessage(`${err}`);
        //     setIserror(true);
        //     console.log(err);
        // }
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
                                <IonLabel position="floating">
                                    {' '}
                                    Username{' '}
                                </IonLabel>
                                <IonInput
                                    value={username}
                                    onIonChange={(e) =>
                                        setUsername(e.detail.value!)
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
