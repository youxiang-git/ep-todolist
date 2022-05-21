import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import StoreProvider, { useStores } from '../src/stores/StoreProvider';

import LoginPage from './pages/LoginPage';
import AppTabs from './pages/AppTabs';
import UserChangePasswordForm from './components/common/UserChangePasswordForm';
import NotFoundPage from './pages/NotFound';

const App: React.FC = () => (
    <IonApp>
        <StoreProvider>
            <IonReactRouter>
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/movie">
                        <AppTabs
                        // userProfileStore={userProfileStore}
                        // routeToLogin={() => navigate('/login', 'back')}
                        // routeToChangePassword={() => navigate('/password')}
                        />
                    </Route>
                    <Route exact path="/password">
                        <UserChangePasswordForm
                        // userProfileStore={userProfileStore}
                        // routeToLogin={() => navigate('/login', 'back')}
                        />
                    </Route>
                    <Redirect exact path="/" to="/login" />
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </IonReactRouter>
        </StoreProvider>
    </IonApp>
);

export default App;
