import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //Provider Component
import App from './components/App'; //Import our App
import store from './store';


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider> 
    , document.getElementById('root')
);


/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/
//Paste this at the bottom of your `index.js` in your `create-react-app`-project
// if (module.hot) {
//     module.hot.accept('./components/App', () => {
//       const NextApp = require('./components/App').default
//       ReactDOM.render(
//         <NextApp />,
//         document.getElementById('root')
//       )
//     })
//   }
