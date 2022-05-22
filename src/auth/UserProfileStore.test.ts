import { expect, test } from '@jest/globals';
import UserProfileStore from './UserProfileStore';

test('test UserProfileStore', () => {
    const userProfileStore = new UserProfileStore();
    expect(userProfileStore).toHaveProperty('authStatus');
    expect(userProfileStore).toHaveProperty('userProfile');
    expect(userProfileStore.userProfile).toHaveProperty('email');
    expect(userProfileStore.userProfile).toHaveProperty('username');
});
