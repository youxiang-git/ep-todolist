import React from 'react';
import { render } from '@testing-library/react';
import TaskList from './TaskList';
import StoreProvider, { createStores } from '../../stores/StoreProvider';

jest.mock('../../')