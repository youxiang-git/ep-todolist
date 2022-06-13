import React, { useRef } from 'react';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonTextarea,
    IonButton,
} from '@ionic/react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../stores/TodoStoreProvider';
import { check } from 'prettier';

const TaskFormInput = styled(IonTextarea)`
    background-color: white;
    color: black;
    width: 90%;
    margin: auto;
    margin-top: auto;
`;
const TaskFormAddButton = styled(IonButton)`
    --ripple-color: navy;
    float: right;
    margin-top: 5%;
    margin-right: 5%;
`;

const TaskForm: React.FC<{ dismiss: any }> = ({ dismiss }) => {
    const { todoStore, uiState } = useStores();
    const submitForm = useRef<HTMLIonButtonElement>(null);

    const handleChange = (e: any) => {
        todoStore.onChangeTodo(e.target.value);
    };

    const handleSubmit = () => {
        if (todoStore.newTodo === '') {
            uiState.setError('Task input should not be blank!');
            alert(uiState.error);
            return;
        }

        if (todoStore.newTodo.length < 5) {
            uiState.setError(
                'Task length too short, please input more than 5 characters.'
            );
            alert(uiState.error);
            return;
        }

        todoStore.addTodo(todoStore.newTodo, false);
    };

    const handleEditSubmit = () => {
        if (todoStore.newTodo === '') {
            uiState.setError('Task input should not be blank!');
            alert(uiState.error);
            return;
        }

        if (uiState.checkSameTodo(todoStore.newTodo)) {
            uiState.setError('There are no changes to update.');
            alert(uiState.error);
            return;
        }

        todoStore.editTaskDescription(
            todoStore.idToEdit,
            todoStore.newTodo,
            false
        );
        uiState.setIsEdit(false);
        uiState.setModalOpen(false);
        uiState.toClose.close();
    };

    return (
        <>
            <IonHeader>
                <IonTitle>
                    <h1>
                        <strong>
                            {uiState.isEdit ? 'Edit ' : 'Add new '}task
                        </strong>
                    </h1>
                </IonTitle>
            </IonHeader>

            <IonContent>
                <TaskFormInput
                    placeholder="Input task here!"
                    value={todoStore.newTodo}
                    onIonChange={handleChange}
                    required={true}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey == false) {
                            e.preventDefault();
                            submitForm.current?.click();
                        }
                    }}
                    autoGrow={true}
                />
                <TaskFormAddButton
                    ref={submitForm}
                    shape="round"
                    type="submit"
                    onClick={uiState.isEdit ? handleEditSubmit : handleSubmit}
                >
                    {uiState.isEdit ? 'Edit' : 'Add'}
                </TaskFormAddButton>
            </IonContent>
        </>
    );
};

export default observer(TaskForm);
