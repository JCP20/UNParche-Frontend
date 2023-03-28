import React from 'react';
import { Button, Space } from 'antd';
const grp: React.FC = () => (
 <div>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
    </div>
);

export default grp;