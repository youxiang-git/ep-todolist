import React from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { PASSWORD_REQUIREMENTS } from '../../../settings';
import {
    IonAlert,
    IonApp,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonTitle,
    IonToolbar,
    NavContext,
} from '@ionic/react';
import { exitOutline, homeOutline, keyOutline } from 'ionicons/icons';
import { useStores } from '../../../stores/StoreProvider';

const UserChangePasswordForm: React.FC = () => {
    const { userProfileStore } = useStores();
    const { navigate } = React.useContext(NavContext);
    const [currentPassword, setCurrentPassword] = React.useState<string>(''); //current password field
    const [newPassword, setNewPassword] = React.useState<string>(''); //new password field
    const [confirmPassword, setConfirmPassword] = React.useState<string>(''); //confirm password field
    const [disableButton, setDisableButton] = React.useState<boolean>(true); // change password button
    const [statusMsg, setStatusMsg] = React.useState<string>('');
    const [alertPopup, setAlertPopup] = React.useState<boolean>(false);
    const [forceChangeMode, setForceChangeMode] = React.useState<boolean>(
        false
    ); // set if force change passwd

    const handleChangePassword = async (event: React.MouseEvent) => {
        event.preventDefault();

        console.log('currentPassword ', currentPassword);

        if (currentPassword.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
            setStatusMsg(
                `Current password length must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH}`
            );
            return;
        }
        if (newPassword !== confirmPassword) {
            setStatusMsg("New and confirm passwords don't match");
            return;
        }
        if (newPassword === currentPassword) {
            setStatusMsg('New password must not be same as current');
            return;
        }
    };

    React.useEffect(() => {
        const { authStatus } = userProfileStore;
        if (authStatus === 'forceChangePassword') {
            setForceChangeMode(true);
            setStatusMsg('You must set a new password before proceeding');
        }
    }, []);

    React.useEffect(() => {
        // display the alert pop-up
        if (statusMsg.length > 0) {
            setAlertPopup(true);
            console.log(statusMsg);
        } else {
            setAlertPopup(false);
        }
    }, [statusMsg]);

    const HomeButton = () => (
        <IonButton onClick={() => navigate('/')}>
            <IonIcon slot="icon-only" ios={homeOutline} md={homeOutline} />
        </IonButton>
    );

    const LogoutButton = () => (
        <IonButton>
            <IonIcon slot="icon-only" ios={exitOutline} md={exitOutline} />
        </IonButton>
    );

    return (
        <div data-testid="component-user-change-password">
            <IonApp>
                <IonHeader data-testid="component-appheader">
                    <IonToolbar color="primary">
                        <IonButtons slot="end">
                            {forceChangeMode ? (
                                <LogoutButton />
                            ) : (
                                <HomeButton />
                            )}
                        </IonButtons>
                        <IonTitle> Change Password </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen className="ion-padding ion-text-center">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                {alertPopup && (
                                    <IonAlert
                                        data-testid="password-message-alert"
                                        isOpen={alertPopup}
                                        onDidDismiss={() => setStatusMsg('')}
                                        header={'Alert'}
                                        message={statusMsg}
                                        buttons={['Dismiss']}
                                    />
                                )}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonIcon
                                    style={{
                                        fontSize: '70px',
                                        color: '#0040ff',
                                    }}
                                    icon={keyOutline}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">
                                        Current Password
                                    </IonLabel>
                                    <IonInput
                                        data-testid="current-password-input"
                                        required={!forceChangeMode}
                                        disabled={forceChangeMode}
                                        type="password"
                                        value={currentPassword}
                                        onIonChange={(e) =>
                                            setCurrentPassword(e.detail.value!)
                                        }
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">
                                        New Password
                                    </IonLabel>
                                    <IonInput
                                        data-testid="new-password-input"
                                        required
                                        type="password"
                                        value={newPassword}
                                        onIonChange={(e) => {
                                            disableButton &&
                                                setDisableButton(false); // enable button
                                            setNewPassword(e.detail.value!);
                                        }}
                                    />
                                    <PasswordStrengthMeter
                                        // userProfileStore={userProfileStore}
                                        password={newPassword}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">
                                        Confirm Password
                                    </IonLabel>
                                    <IonInput
                                        data-testid="confirm-password-input"
                                        required
                                        type="password"
                                        value={confirmPassword}
                                        onIonChange={(e) =>
                                            setConfirmPassword(e.detail.value!)
                                        }
                                    />
                                    <PasswordStrengthMeter
                                        // userProfileStore={userProfileStore}
                                        password={confirmPassword}
                                    />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton
                                    data-testid="update-password-submit-button"
                                    disabled={disableButton}
                                    expand="block"
                                    type="submit"
                                    onClick={handleChangePassword}
                                >
                                    Submit
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonApp>
        </div>
    );
};

export default UserChangePasswordForm;
