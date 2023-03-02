import React from 'react';

const Loader = ({ bgColor }) => (
    <div className="wrapper">
        <span style={{ background: bgColor }}></span>
        <span style={{ background: bgColor }}></span>
        <span style={{ background: bgColor }}></span>
        <span style={{ background: bgColor }}></span>
        <span style={{ background: bgColor }}></span>
    </div>
);

export default Loader;