import React from 'react';
import { IonPage, IonSpinner } from '@ionic/react';
import styled from 'styled-components';

const LoadingPage = styled(IonPage)`
    .center {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    ion-spinner {
        width: 66px;
        height: 66px;
    }
`;

const LoadingComponent: React.FC = () => {
    return (
        <LoadingPage>
            <div className="center">
                <IonSpinner />
            </div>
        </LoadingPage>
    );
};

export default LoadingComponent;
