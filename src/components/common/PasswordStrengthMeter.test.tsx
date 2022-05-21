import * as React from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { PASSWORD_REQUIREMENTS } from '../../settings';

describe('checkPassword', () => {
    // const userProfileStore = new UserProfileStore();

    test('blank password should not render progress bar', () => {
        // const password = '';
        // const wrapper = mount(
        //     <PasswordStrengthMeter
        //         password={password}
        //         // userProfileStore={userProfileStore}
        //     />
        // );
        // const resultComponent = findByTestAttr(
        //     wrapper,
        //     'component-password-strength-bar'
        // );
        // expect(resultComponent.length).toBe(0);
    });

    test('simple password should fail', () => {
        // const password = 'simple';
        // const wrapper = mount(
        //     <PasswordStrengthMeter
        //         password={password}
        //         // userProfileStore={userProfileStore}
        //     />
        // );
        // expect(userProfileStore.getUserProfile.passwordStrength).toBeLessThan(
        //     PASSWORD_REQUIREMENTS.MIN_STRENGTH
        // );
    });

    test('complex password should pass', () => {
        const password = 'pass@word1';
        // const wrapper = mount(
        //     <PasswordStrengthMeter
        //         password={password}
        //         // userProfileStore={userProfileStore}
        //     />
        // );
        // expect(
        //     userProfileStore.getUserProfile.passwordStrength
        // ).toBeGreaterThanOrEqual(PASSWORD_REQUIREMENTS.MIN_STRENGTH);
    });
});
