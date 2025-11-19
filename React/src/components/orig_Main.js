import NavigationList from "./NavigationList";
import Content from "./Content";
import Drawer from 'devextreme-react/drawer';
import {
    heightValue
} from '../utils/constants';

function Main({ opened, selectedIndexChange, selectedIndex }) {
    return (<Drawer
        opened={opened}
        closeOnOutsideClick={false}
        component={NavigationList}
        height={heightValue}>
        <div className="demo-content">
            <Content selectedIndexChange={selectedIndexChange} selectedIndex={selectedIndex} />
        </div>
    </Drawer >)
};
export default Main;