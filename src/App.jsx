import { Fragment } from 'react';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
    return (
        <Fragment>
            <Header />
            <Home />
        </Fragment>
    );
};

export default App;