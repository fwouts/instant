import { createStore } from 'redux'
import instantApp from './reducers'

const store = createStore(instantApp)

export default store
