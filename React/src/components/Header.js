import React from 'react';

import { Toolbar, Item as ToolbarItem } from 'devextreme-react/toolbar';
import { Button } from 'devextreme-react/button';

const Header = React.memo(({ onClick }) => {
    return (
        <Toolbar className="demo-header">
            <ToolbarItem location="before" widget="dxButton">
                <Button icon="menu" onClick={onClick} />
            </ToolbarItem>
        </Toolbar>)
})

export default Header;