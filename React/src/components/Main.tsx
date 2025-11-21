import React from 'react';
import Drawer from 'devextreme-react/drawer';
import NavigationList from './NavigationList';
import Content from './Content';
import { heightValue } from '../utils/constants';

interface MainProps {
  opened: boolean;
  // eslint-disable-next-line no-unused-vars
  selectedIndexChange: (_event: React.SyntheticEvent, newValue: string) => void;
  selectedIndex: string;
}

function Main(props: MainProps): JSX.Element {
  const { opened, selectedIndexChange, selectedIndex } = props;

  return (
    <Drawer
      opened={opened}
      closeOnOutsideClick={false}
      component={NavigationList}
      height={heightValue}
    >
      <div className="demo-content">
        <Content selectedIndexChange={selectedIndexChange} selectedIndex={selectedIndex} />
      </div>
    </Drawer>
  );
}

export default Main;
