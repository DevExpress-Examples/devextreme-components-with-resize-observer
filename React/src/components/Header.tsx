import React from 'react';
import { Toolbar, Item as ToolbarItem } from 'devextreme-react/toolbar';
import { Button } from 'devextreme-react/button';

interface HeaderProps {
  onClick: () => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ onClick }) => (
  <Toolbar className="demo-header">
    <ToolbarItem location="before" widget="dxButton">
      <Button icon="menu" onClick={onClick} />
    </ToolbarItem>
  </Toolbar>
));

Header.displayName = 'Header';

export default Header;
