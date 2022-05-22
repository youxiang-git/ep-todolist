import React, { useContext, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, NavContext } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import StoreProvider, { useStores } from '../src/stores/StoreProvider';

import LoginPage from './pages/LoginPage';
import AppTabs from './pages/AppTabs';
import UserChangePasswordForm from './components/common/UserChangePasswordForm';
import NotFoundPage from './pages/NotFound';
import withCheckLogin from './auth/components';

const AppRouter: React.FC = () => {
    const { userProfileStore } = useStores();
    const { navigate } = useContext(NavContext);
    const AppTabsWithLogin = withCheckLogin(AppTabs);
    const UserChangePasswordFormWithLogin = withCheckLogin(
        UserChangePasswordForm
    );

    return (
        <IonReactRouter>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/movie">
                    <AppTabsWithLogin
                        userProfileStore={userProfileStore}
                        routeToLogin={() => navigate('/login', 'back')}
                        routeToChangePassword={() => navigate('/password')}
                    />
                </Route>
                <Route exact path="/password">
                    <UserChangePasswordFormWithLogin
                        userProfileStore={userProfileStore}
                        routeToLogin={() => navigate('/login', 'back')}
                    />
                </Route>
                <Redirect exact path="/" to="/movie/catalog" />
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
        </IonReactRouter>
    );
};

const App: React.FC = () => {
    return (
        <IonApp>
            <StoreProvider>
                <AppRouter />
            </StoreProvider>
        </IonApp>
    );
};

export default App;
