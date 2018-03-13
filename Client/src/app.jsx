import React           from 'react';
import ReactDOM        from 'react-dom';
import { Provider }    from 'react-redux';
import { createStore } from 'redux';

import App     from './form.jsx';
import reducer from './reducers/reducer.js';

// Inicializamos el store pasándole el reducer
const store = createStore(reducer);

//Renderizo
const render = () => {

  ReactDOM.render( <Provider store={store}>
                      <App/>
                    </Provider>,
                    document.getElementById('app'));                  

};

render();
