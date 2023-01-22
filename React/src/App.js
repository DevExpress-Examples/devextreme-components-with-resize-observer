import { useCallback,  useState } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';

import Main from './components/Main';
import Header from './components/Header';

function App() {

  const [selectedIndex, setSelectedIndex] = useState('1');
  const [opened, setOpened] = useState(true);
  const selectedIndexChange = useCallback((_, newValue) => {
    setSelectedIndex(newValue);
  }, []);
  const onClick = useCallback(() => setOpened(prev => !prev), []);

  return (
    <div className="demo-container">
      <Header onClick={onClick} />
      <Main opened={opened} selectedIndex={selectedIndex} selectedIndexChange={selectedIndexChange} />
    </div >
  );
}

export default App;
