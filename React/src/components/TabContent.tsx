import React from 'react';

interface TabContentProps {
  value: string;
  children: React.ReactNode;
  selectedIndex: string;
}

function TabContent(props: TabContentProps): JSX.Element {
  const { value, children, selectedIndex } = props;

  return (
    <div style={{ display: selectedIndex === value ? 'block' : 'none' }}>
      {children}
    </div>
  );
}

export default TabContent;
