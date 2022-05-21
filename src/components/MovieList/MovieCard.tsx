import {
    IonCard,
    IonCol,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButton,
    IonAlert,
    IonLoading,
} from '@ionic/react';
import * as React from 'react';
import { Movie } from '../../stores/AppStore';
import { useStores } from '../../stores/StoreProvider';
import './MovieCard.module.css';

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
    const { appStore } = useStores();
    const { rented } = movie;
    // 0 - not started, 1 - to confirm, 2 - renting in process, 3 - transaction complete or failed
    const [processing, setProcessing] = React.useState(0);
    const [status, setStatus] = React.useState('');
    const [message, setMessage] = React.useState('');

    const userToConfirm = async () => {
        const { rented } = movie;

        try {
            setProcessing(2);
            await (rented
                ? appStore.returnMovie(movie)
                : appStore.rentMovie(movie));
            setStatus('Success!');
            setMessage(`Movie ${rented ? 'returned' : 'rented'} successfully!`);
        } catch (err) {
            setStatus('Error!');
            setMessage(
                `We're sorry. Did you enable your wallet? Description: ${err}`
            );
        } finally {
            setProcessing(3);
        }
    };

    // show the different dialog messages according to the status
    const RentConfirmation = () => {
        return (
            <>
                <IonAlert
                    isOpen={processing === 1}
                    cssClass="rental-class"
                    header={'Confirmation'}
                    message={`Confirm to ${rented ? 'return' : 'rent'} [${
                        movie.title
                    }]?`}
                    buttons={[
                        {
                            text: 'Okay',
                            handler: userToConfirm,
                        },
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => setProcessing(0),
                        },
                    ]}
                />
                <IonLoading
                    isOpen={processing === 2}
                    message={'Processing. Please wait.'}
                />
                <IonAlert
                    isOpen={processing === 3}
                    cssClass="rental-class"
                    header={status}
                    message={message}
                    buttons={[
                        {
                            text: 'Okay',
                            handler: () => setProcessing(0),
                        },
                    ]}
                />
            </>
        );
    };

    return (
        <IonCol sizeXs="12" sizeMd="6" sizeLg="4">
            <IonCard data-testid={`card-${movie._id}`}>
                <IonItem>
                    <IonLabel color="primary"> {movie.title} </IonLabel>
                    <IonButton
                        color="dark"
                        fill="outline"
                        slot="end"
                        onClick={() => setProcessing(1)}
                    >
                        {rented ? 'Return' : 'Rent'}
                    </IonButton>
                    <RentConfirmation />
                </IonItem>
                <IonCardContent>
                    <p> Genre: {movie.genre} </p>
                    <p> Year: {movie.year} </p>
                    <p> ID: {movie._id} </p>
                </IonCardContent>
            </IonCard>
        </IonCol>
    );
};

export default MovieCard;
