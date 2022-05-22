import React from 'react';
import zxcvbn from 'zxcvbn';
import styled from 'styled-components';
import { IonProgressBar, IonText } from '@ionic/react';

/**
 * Return the color and description to display on the linear progress bar
 * @param result: 0 - 4
 */
const getPasswordAttrs = (score: number) => {
    if (score == 2)
        return {
            desc: 'Fair',
            color: 'warning',
        };
    if (score == 3)
        return {
            desc: 'Good',
            color: 'success',
        };
    if (score == 4)
        return {
            desc: 'Strong',
            color: 'success',
        };
    return {
        desc: 'Weak',
        color: 'danger',
    };
};

export type PasswordStrengthMeterType = {
    password: string;
};

const PasswordStrengthBar = styled(IonProgressBar)`
    margin: 0;
`;

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterType> = (props) => {
    const { password } = props;
    const { score } = zxcvbn(password); // score: 0 - 4
    const { desc, color } = getPasswordAttrs(score);
    if (password.length === 0) return null; // don't render if password id empty

    return (
        <div data-testid="component-password-strength-bar">
            <PasswordStrengthBar value={(score / 4) * 100} color={color} />
            <IonText color={color}>
                <h6>Password strength: {desc}</h6>
            </IonText>
        </div>
    );
};

export default PasswordStrengthMeter;
