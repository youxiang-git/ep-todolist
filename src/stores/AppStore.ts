import { observable, makeObservable, runInAction, action } from 'mobx';
import AppService from './AppService';
import UiState from './UiState';

/**
 * Only mutable data should be made observable.
 */

export type Movie = {
    _id?: string;
    title: string;
    year: number;
    genre: string;
    rented?: boolean;
};

// movies rented by the user
type MovieRental = {
    movieId: string;
    tokenId: number;
};

interface AppStore {
    appService: AppService;
    uiState: UiState;
}

class AppStore {
    appService = new AppService();
    rentalList: MovieRental[] = [];
    movieList: Movie[] = [];
    spliceMovieList = [];

    constructor(uiState: UiState) {
        makeObservable(this, {
            rentalList: observable,
            movieList: observable,
            spliceMovieList: observable,
            updateMovieStatus: action,
        });
        this.uiState = uiState;
    }

    getMovieList = async () => {
        // retrieve a list of latest movies and compare against its borrow list
        try {
            const movieList: Movie[] =
                await this.appService.getMovieListAsync();
            // get current user's borrowing list
            // let borrowList = await this.walletStore.getRentalListAsync();
            // borrowList = borrowList.map((rental: MovieRental) => rental.movieId);
            // set empty list for now
            let borrowList: any = [];
            // runInAction is required to update observable
            runInAction(() => {
                // merge 2 arrays to check which movies are already rented
                this.movieList = movieList.map((movie) => {
                    return {
                        ...movie,
                        rented: borrowList.includes(movie._id),
                    };
                });
                this.uiState.setError('');
            });
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    addMovie = async ({ title, genre, year }: Movie) => {
        try {
            const { _id } = await this.appService.addMovieAsync({
                title,
                genre,
                year,
            });
            runInAction(
                () =>
                    // update movie list in appstore
                    (this.movieList = [
                        ...this.movieList,
                        { _id, title, genre, year, rented: false },
                    ])
            );
            return _id;
        } catch (err) {
            console.error(`Error in addMovie: ${err}`);
            throw err;
        }
    };

    // action to update movie status in the array
    updateMovieStatus = (movie: Movie, rented: boolean) => {
        this.movieList = this.movieList.slice().map((_movie) => {
            return {
                ..._movie,
                rented: _movie._id === movie._id ? rented : _movie.rented,
            };
        });
    };

    rentMovie = (movie: Movie): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                // TODO: make api call
                this.updateMovieStatus(movie, true);
                resolve(`<${movie.title}> rented successfully!`);
            } catch (err) {
                reject(`Renting of <${movie.title}> failed! ${err}`);
            }
        });
    };

    returnMovie = (movie: Movie): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                // TODO: make api call
                // update the movieList rented status
                this.updateMovieStatus(movie, false);
                resolve(`<${movie.title}> returned successfully!`);
            } catch (err) {
                reject(`Returning of <${movie.title}> failed! ${err}`);
            }
        });
    };
}

export default AppStore;
