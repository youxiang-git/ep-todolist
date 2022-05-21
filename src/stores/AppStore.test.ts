/**
 * @jest-environment jsdom
 */
jest.mock('./AppService');

import AppStore from './AppStore';
import UiState from './UiState';

describe('test AppStore', () => {
    const appStore = new AppStore(new UiState());

    beforeAll(async () => {
        await appStore.getMovieList();
    });

    it('returns a list of movies', async () => {
        const movieList = appStore.movieList.slice();
        expect(movieList).toEqual(expect.any(Array));
        movieList.forEach((movie) => {
            expect(movie).toHaveProperty('_id');
        });
    });

    it('adds a new movie', async () => {
        const prevCount = appStore.movieList.slice().length;
        const data = {
            title: 'test',
            year: 2020,
            genre: 'Romance',
        };
        await appStore.addMovie(data);
        const movieList = appStore.movieList.slice();
        expect(movieList.length).toBeGreaterThan(prevCount);
        expect(movieList[movieList.length - 1]).toMatchObject(data);
    });
});
