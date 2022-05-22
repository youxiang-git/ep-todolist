/* eslint-disable react/display-name */
import * as React from 'react';
import { Observer } from 'mobx-react';
import UserProfileStore from '../UserProfileStore';

export interface withCheckLoginProps {
    userProfileStore: UserProfileStore;
    routeToLogin?: () => void; // route to login page
    routeToChangePassword?: () => void; // route to change password
    LoadingComponent?: React.FC | React.ComponentClass; // render awaiting e.g. circular or spinner etc.
}

type ActionMatrix = {
    [key: string]: () => any;
};

const withCheckLogin = (Component: React.FC) =>
    class extends React.Component<withCheckLoginProps> {
        render() {
            const {
                userProfileStore,
                routeToLogin,
                routeToChangePassword,
                LoadingComponent,
            } = this.props;

            const actionMatrix: ActionMatrix = {
                checking: () =>
                    LoadingComponent ? <LoadingComponent /> : null,
                true: () => <Component {...this.props} />,
                forceChangePassword: () => {
                    if (routeToChangePassword) {
                        routeToChangePassword();
                        return null;
                    }
                    return <Component {...this.props} />;
                },
            };
            return (
                <Observer
                    render={() => {
                        // console.log('authStatus', userProfileStore.authStatus);
                        if (userProfileStore.authStatus in actionMatrix) {
                            return actionMatrix[userProfileStore.authStatus]();
                        }
                        routeToLogin && routeToLogin();
                        return null;
                    }}
                />
            );
        }
    };

export default withCheckLogin;
