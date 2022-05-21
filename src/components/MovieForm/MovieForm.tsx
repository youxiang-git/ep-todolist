import * as React from 'react';
import {
    IonAlert,
    IonButton,
    IonContent,
    IonDatetime,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import './MovieForm.module.css';
import { useStores } from '../../stores/StoreProvider';

const genreList = ['Adventure', 'Comedy', 'Horror', 'Romance'];

const MovieForm: React.FC = () => {
    const { appStore } = useStores();
    const [title, setTitle] = React.useState<string>('');
    const [genre, setGenre] = React.useState<string>('');
    const [year, setYear] = React.useState<number>(2000);
    const [message, setMessage] = React.useState<string>('');
    const [status, setStatus] = React.useState<string>('');

    const customYearValues = Array(55)
        .fill(0)
        .map((ele, idx) => idx + 1970);

    const onSubmit = async () => {
        if (title.length === 0 || genre.length === 0 || year === null) {
            setMessage('Title, Genre and Year must be filled!');
            setStatus('Missing Fields');
            return;
        }

        try {
            await appStore.addMovie({ title, genre, year });
            setMessage(`${title} is added successfully`);
            setStatus('Success');
        } catch (err) {
            setMessage(`${err}`);
            setStatus(`Failed to add "${title}"`);
        }
    };

    return (
        <IonContent fullscreen className="ion-padding">
            <IonList>
                <IonItem>
                    <IonLabel> Title </IonLabel>
                    <IonInput
                        type="text"
                        value={title}
                        onIonChange={(e) => setTitle(e.detail.value!)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel> Genre </IonLabel>
                    <IonSelect
                        value={genre}
                        placeholder="Select One"
                        onIonChange={(e) => setGenre(e.detail.value)}
                    >
                        {genreList.map((genre) => (
                            <IonSelectOption key={genre} value={genre}>
                                {genre}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel> Year </IonLabel>
                    <IonDatetime
                        presentation="year"
                        yearValues={customYearValues}
                        value={`${year}`}
                        onIonChange={(e) => setYear(parseInt(e.detail.value!))}
                    />
                </IonItem>
                <IonButton slot="end" expand="block" onClick={onSubmit}>
                    Submit
                </IonButton>
                <IonAlert
                    isOpen={status.length > 0 && message.length > 0}
                    cssClass="rental-class"
                    header={status}
                    message={message}
                    buttons={[
                        {
                            text: 'Okay',
                            handler: () => {
                                setStatus('');
                                setMessage('');
                            },
                        },
                    ]}
                />
            </IonList>
        </IonContent>
    );
};

export default MovieForm;
