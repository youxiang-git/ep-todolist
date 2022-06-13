import React, { useRef } from 'react';
import {
    IonItemSliding,
    IonLabel,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonCheckbox,
    IonItem,
} from '@ionic/react';
import { createOutline, trash } from 'ionicons/icons';
import './TaskSlidingItem.module.css';
import { useStores } from '../../stores/TodoStoreProvider';

const TaskSlidingItem: React.FC = () => {
    const { todoStore, uiState } = useStores();
    const toClose = useRef<HTMLIonItemSlidingElement>(null);

    return (
        <>
            {todoStore.todoList.map((todo: any) => (
                <IonItemSliding key={todo.id} ref={toClose}>
                    <IonItem>
                        <IonCheckbox
                            checked-slot="start"
                            onClick={() =>
                                todoStore.editTaskComplete(
                                    todo.id,
                                    todo.description,
                                    todo.completed
                                )
                            }
                            checked={todo.completed ? true : false}
                        ></IonCheckbox>
                        <IonLabel
                            text-wrap
                            style={{
                                textDecoration: todo.completed
                                    ? 'line-through'
                                    : 'none',
                                color: todo.completed ? 'gray' : null,
                            }}
                        >
                            {todo.description}
                        </IonLabel>
                    </IonItem>

                    <IonItemOptions side="end">
                        <IonItemOption color="danger">
                            <IonIcon
                                slot="end"
                                size="medium"
                                icon={trash}
                                onClick={async () => await todoStore.delTodo(todo.id)}
                            ></IonIcon>
                        </IonItemOption>
                        <IonItemOption color="warning">
                            <IonIcon
                                slot="end"
                                onClick={() => {
                                    uiState.setModalOpen(true);
                                    uiState.setIsEdit(true);
                                    todoStore.updateNewTodo(
                                        todo.description,
                                        todo.id
                                    );
                                    uiState.storeUneditedTodo(todo.description);
                                    uiState.setToClose(toClose.current);
                                }}
                                icon={createOutline}
                            />
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            ))}
        </>
    );
};

export default TaskSlidingItem;
