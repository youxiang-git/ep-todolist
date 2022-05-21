/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import MovieList from './MovieList';
import StoreProvider, { createStores } from '../../stores/StoreProvider';

jest.mock('../../stores/AppService');

describe('<MovieList />', () => {
    // setup stores
    const { appStore } = createStores();

    const renderWithStores = (children: JSX.Element) => {
        return render(<StoreProvider>{children}</StoreProvider>);
    };

    it('should render correctly', () => {
        const { getByTestId } = renderWithStores(<MovieList />);
        expect(getByTestId('movie-list')).toBeTruthy();
    });

    it('should list all campaign addresses', () => {
        const { getByTestId } = renderWithStores(<MovieList />);
        const { movieList } = appStore;

        movieList.forEach((movie) => {
            expect(getByTestId(`card-${movie._id}`)).toBeTruthy();
        });
    });
});
