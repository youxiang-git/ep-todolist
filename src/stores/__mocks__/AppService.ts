import { Movie } from '../AppStore';

class AppService {
    getMovieListAsync(): Promise<Movie[]> {
        return new Promise((resolve) => {
            resolve([
                {
                    _id: '60e3fedb286328b38f751ff1',
                    title: 'The Fountain',
                    year: 2006,
                    genre: 'Comedy',
                },
                {
                    _id: '60e3fedb286328b38f751ff2',
                    title: 'Cars',
                    year: 2006,
                    genre: 'Aventure',
                },
                {
                    _id: '60e3fedb286328b38f751ff3',
                    title: 'Parable of the Good Samaritan',
                    year: 2005,
                    genre: 'Romance',
                },
            ]);
        });
    }

    addMovieAsync({ title, year, genre }: Movie): Promise<{ _id: string }> {
        return new Promise((resolve) => {
            resolve({ _id: '60e3fedb286328b38f751ff' });
        });
    }
}

export default AppService;
