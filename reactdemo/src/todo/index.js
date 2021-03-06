import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from './reducers'
import App from './containers/app'

let store = createStore(rootReducer);

ReactDom.render(<Provider store={store}><App /></Provider>, document.getElementById('j-container'));