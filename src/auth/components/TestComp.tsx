import React from 'react';
import withCheckLogin from './withCheckLogin';

/**
 * Test Component for withCheckLogin
 */
const TestComp: React.FC = () => {
    return <div data-testid="component-test">Test</div>;
};
export default withCheckLogin(TestComp);
