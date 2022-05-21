import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import React from 'react';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import { Route } from 'react-router-dom';
import AppHeader from '../components/common/AppHeader';
import MovieList from '../components/MovieList';
import MovieForm from '../components/MovieForm';

const AppTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/movie/catalog">
                    <AppHeader title="Catalog">
                        <MovieList />
                    </AppHeader>
                </Route>
                <Route exact path="/movie/entry">
                    <AppHeader title="Catalog">
                        <MovieForm />
                    </AppHeader>
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="catalog" href="/movie/catalog">
                    <IonIcon icon={homeIcon} />
                    <IonLabel>Catalog</IonLabel>
                </IonTabButton>
                <IonTabButton tab="entry" href="/movie/entry">
                    <IonIcon icon={settingsIcon} />
                    <IonLabel>Entry</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default AppTabs;
