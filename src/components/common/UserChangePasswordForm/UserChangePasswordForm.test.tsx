import { render, waitFor } from '@testing-library/react';
import UserChangePasswordForm from './UserChangePasswordForm';
import StoreProvider from '../../../stores/StoreProvider';
import {
    ionFireEvent as fireEvent,
    waitForIonicReact,
} from '@ionic/react-test-utils';

const renderWithStores = (children: JSX.Element) => {
    return render(<StoreProvider>{children}</StoreProvider>);
};
const setup = async (label: string) => {
    const utils = renderWithStores(<UserChangePasswordForm />);
    await waitForIonicReact();
    const input = (await utils.getByTestId(label)) as HTMLInputElement;
    return {
        input,
        utils,
    };
};

describe('<UserChangePasswordForm />', () => {
    it('should render component without error', async () => {
        const { input, utils } = await setup('component-user-change-password');
        const { findByTestId } = utils;
        expect(input).toBeTruthy();
        expect(await findByTestId('new-password-input')).toBeTruthy();
        expect(await findByTestId('confirm-password-input')).toBeTruthy();
        expect(
            await findByTestId('update-password-submit-button')
        ).toBeTruthy();
    });

    it('should update password inputs', async () => {
        const { input, utils } = await setup('new-password-input');
        const input2 = await utils.findByTestId('confirm-password-input');

        fireEvent.ionChange(input, 'password');
        // Uncomment below to view component
        // expect(input).toBe('password');
        await waitFor(() => {
            expect(input).toHaveAttribute('value', 'password');
        });

        fireEvent.ionChange(input2, 'password2');
        await waitFor(() => {
            expect(input2).toHaveAttribute('value', 'password2');
        });
    });

    it("should check new and confirm passwords don't match on submit", async () => {
        const { input, utils } = await setup('current-password-input');
        const newPassword = await utils.findByTestId('new-password-input');
        const confirmPassword = await utils.findByTestId(
            'confirm-password-input'
        );
        const submitBtn = await utils.findByTestId(
            'update-password-submit-button'
        );

        console.log = jest.fn();

        fireEvent.ionChange(input, 'password');

        fireEvent.ionChange(newPassword, 'password1');

        fireEvent.ionChange(confirmPassword, 'password2');

        fireEvent.click(submitBtn); // click on submit

        // the test library is unable to get the rendered overlay like alert
        // as a workaround, we'll test on the console.log output instead
        expect(console.log).toHaveBeenCalledWith(
            "New and confirm passwords don't match"
        );
    });
});
