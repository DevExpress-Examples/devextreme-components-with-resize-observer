import React from "react";

const TabContent = ({ value, children, selectedIndex }) => {
    return (
        <div style={{ display: selectedIndex === value ? 'block' : 'none' }}>
            {children}
        </div>)
};

export default TabContent;