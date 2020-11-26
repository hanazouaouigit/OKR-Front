import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Objectives from "./Objectives";
import KeyResult from "./KeyResult";
import TimeLine from "./TimeLine";
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import ThemeOptions from '../../Layout/ThemeOptions/';




const Okr = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">    
          <Route path={`${match.url}/objectives`} component={Objectives} />
          <Route path={`${match.url}/keyresult`} component={KeyResult} />
          <Route path={`${match.url}/timeline`} component={TimeLine} />
                </div>
                <div className="app-wrapper-footer">
                    <AppFooter/>
                </div>
            </div>
        </div>
    </Fragment>
);
export default Okr;