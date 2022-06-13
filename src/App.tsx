import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, NavContext } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import TodoStoreProvider from './stores/TodoStoreProvider';
import LoginPage from './pages/LoginPage';
import AppTabs from './pages/AppTabs';
import NotFoundPage from './pages/NotFound';
import withCheckLogin from './auth/components';
import LoadingComponent from './components/common/LoadingComponent';
import UserChangePasswordForm from './components/common/UserChangePasswordForm';
import { useStores } from './stores/TodoStoreProvider';

const AppRouter: React.FC = () => {
    const { userProfileStore } = useStores();
    const { navigate } = useContext(NavContext);
    const AppTabsWithLogin = withCheckLogin(AppTabs);
    const UserChangePasswordFormWithLogin = withCheckLogin(
        UserChangePasswordForm
    );

    useEffect(() => {
        if (userProfileStore.authStatus == 'checking') {
            // below is to simulate the time needed to check current auth status
            setTimeout(() => userProfileStore.setAuthStatus('false'), 2000);
        }
    }, []);

    return (
        <IonReactRouter>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/app">
                    <AppTabsWithLogin
                        userProfileStore={userProfileStore}
                        routeToLogin={() => navigate('/login', 'back')}
                        routeToChangePassword={() => navigate('/password')}
                        LoadingComponent={LoadingComponent}
                    />
                </Route>
                <Route exact path="/password">
                    <UserChangePasswordFormWithLogin
                        userProfileStore={userProfileStore}
                        routeToLogin={() => navigate('/login', 'back')}
                        LoadingComponent={LoadingComponent}
                    />
                </Route>
                <Redirect exact path="/" to="/app/tasks" />
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
            <TodoStoreProvider>
                <AppRouter />
            </TodoStoreProvider>
        </IonApp>
    );
};

export default App;
