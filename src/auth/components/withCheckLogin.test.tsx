import * as React from 'react';
import UserProfileStore from '../UserProfileStore';
import TestComp from './TestComp';
import { render } from '@testing-library/react';

describe('withCheckLogin', () => {
    const props = {
        userProfileStore: new UserProfileStore(),
    };

    test('expect component not to render when not authenticated', () => {
        props.userProfileStore.setAuthStatus('false');
        const { queryByTestId } = render(<TestComp {...props} />);
        expect(queryByTestId('component-test')).toBeNull();
    });

    test('expect component not to render when not authenticated', () => {
        props.userProfileStore.setAuthStatus('true');
        const { getByTestId } = render(<TestComp {...props} />);
        expect(getByTestId('component-test')).toBeTruthy();
    });
});
