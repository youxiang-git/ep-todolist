import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';

describe('checkPassword', () => {
    test('blank password should not render progress bar', async () => {
        const { queryByTestId } = render(<PasswordStrengthMeter password="" />);
        expect(queryByTestId('component-password-strength-bar')).toBeNull();
    });

    test('simple password should show weak', async () => {
        const { getByTestId } = render(
            <PasswordStrengthMeter password="easypw" />
        );
        const testElementWeak = getByTestId('component-password-strength-bar');
        expect(testElementWeak).toHaveTextContent('Weak');
    });

    test('complex password should strong', () => {
        const { getByTestId } = render(
            <PasswordStrengthMeter password="Str0nKp@55w0rD!4Te5t1nG" />
        );
        const testElementStrong = getByTestId(
            'component-password-strength-bar'
        );
        expect(testElementStrong).toHaveTextContent('Strong');
    });
});
