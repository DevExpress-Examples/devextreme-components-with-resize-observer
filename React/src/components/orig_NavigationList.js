import React from 'react';

import List from 'devextreme-react/list.js';
import { navigation } from '../data';

function NavigationList(){
    return (
      <div className='demo-content-list' >
        <List
          dataSource={navigation}
          hoverStateEnabled={false}
          activeStateEnabled={false}
          focusStateEnabled={false}
          className="dx-theme-accent-as-background-color" />
      </div>
    );
  }


export default NavigationList;
