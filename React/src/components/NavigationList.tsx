import List from 'devextreme-react/list';
import { navigation } from '../data';

function NavigationList(): JSX.Element {
  return (
    <div className="demo-content-list">
      <List
        dataSource={navigation}
        hoverStateEnabled={false}
        activeStateEnabled={false}
        focusStateEnabled={false}
        className="dx-theme-accent-as-background-color"
      />
    </div>
  );
}

export default NavigationList;
