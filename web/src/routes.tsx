import React from 'react';
import { Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import PrayCenter from './pages/PrayCenter';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={PrayCenter} path="/pray-center" /> 
        </BrowserRouter>
    )
}

export default Routes;