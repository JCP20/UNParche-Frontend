import React from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];
const a = ['Arte', 'Deporte', 'Religión', 'Investigación', 'Semillero', 'Videojuegos', 'Otro'];

for (let i = 0; i < 7; i++) {
    options.push({
        label: a[i],
        value: a[i],
    });
}

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

const SelectApp: React.FC = () => (
    <Space style={{ width: '100%' }} direction="vertical">
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Seleccione las categorías de su interes"

            onChange={handleChange}
            options={options}
        />
    </Space>
);

export default SelectApp;