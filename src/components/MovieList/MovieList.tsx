import * as React from 'react';
import MovieCard from './MovieCard';
import { IonContent, IonRow } from '@ionic/react';
import { Movie } from '../../stores/AppStore';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/StoreProvider';

const MovieList: React.FC = () => {
    const { appStore } = useStores();

    React.useEffect(() => {
        appStore.getMovieList();
    }, []);

    return (
        <IonContent fullscreen>
            <IonRow data-testid="movie-list">
                {appStore.movieList.slice().map((movie: Movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </IonRow>
        </IonContent>
    );
};

export default observer(MovieList);
