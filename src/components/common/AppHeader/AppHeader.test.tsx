import AppHeader from './AppHeader';
import { render } from '@testing-library/react';
import StoreProvider from '../../../stores/StoreProvider';
import {
    ionFireEvent as fireEvent,
    waitForIonicReact,
} from '@ionic/react-test-utils';

const renderWithStores = (children: JSX.Element) => {
    return render(<StoreProvider>{children}</StoreProvider>);
};
const setup = async ({ label, title }: { label: string; title: string }) => {
    const utils = renderWithStores(<AppHeader title={title} />);
    await waitForIonicReact();
    const input = await utils.getByTestId(label);
    return {
        input,
        utils,
    };
};
describe('<AppHeader />', () => {
    it('should render correctly', async () => {
        const { input } = await setup({
            label: 'component-appheader',
            title: 'title',
        });
        expect(input).toBeTruthy();
    });

    it('should render the title correctly', async () => {
        const { utils } = await setup({
            label: 'component-appheader',
            title: 'title one',
        });
        expect(utils.getByText('title one')).toBeTruthy();
    });

    it('should render child correctly', () => {
        const Child: React.FC = () => <div> test child </div>;
        const { getByText } = render(
            <StoreProvider>
                <AppHeader title="title one">
                    {' '}
                    <Child />{' '}
                </AppHeader>
            </StoreProvider>
        );
        expect(getByText('test child')).toBeTruthy();
    });
});
