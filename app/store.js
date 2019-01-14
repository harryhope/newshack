import {createStore} from 'redux'
import createReducer from 'redux-updeep'
import createPublish from './utils/publish'

const namespace = 'APP'
const initialState = {}

export const reducer = createReducer(namespace, initialState)
export const store = createStore(reducer, initialState)
export const publish = createPublish(store, namespace)
