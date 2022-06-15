import React, { useEffect, useRef } from 'react';
import {
    IonItemSliding,
    IonLabel,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonCheckbox,
    IonItem,
    IonItemGroup,
} from '@ionic/react';
import { createOutline, key, trash } from 'ionicons/icons';
import './TaskSlidingItem.module.css';
import { useStores } from '../../stores/TodoStoreProvider';

const TaskSlidingItem: React.FC = () => {
    const { todoStore, uiState } = useStores();

    return (
        <IonItemGroup>
            {todoStore.todoList.map((todo: any) => (
                <IonItemSliding id={todo.id} key={todo.id}>
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
                                slot="icon-only"
                                size="medium"
                                icon={trash}
                                onClick={async () =>
                                    await todoStore.delTodo(todo.id)
                                }
                            ></IonIcon>
                        </IonItemOption>
                        <IonItemOption color="warning">
                            <IonIcon
                                slot="icon-only"
                                size="medium"
                                onClick={() => {
                                    uiState.setModalOpen(true);
                                    uiState.setIsEdit(true);
                                    todoStore.updateNewTodo(
                                        todo.description,
                                        todo.id
                                    );
                                    uiState.storeUneditedTodo(todo.description);
                                    uiState.setToClose(
                                        document.getElementById(todo.id)
                                    );
                                }}
                                icon={createOutline}
                            ></IonIcon>
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            ))}
        </IonItemGroup>
    );
};

export default TaskSlidingItem;
