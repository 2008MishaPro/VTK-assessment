import React from 'react';
import { Select } from 'antd';
import { DataItem } from '../../API/schedule-api/dropdown-api';

interface DropdownProps {
  dataInfo: DataItem[];
  value: string | null | undefined;
  setValue: (value: string) => void;
  clearDropdownValue: () => void;
  placeholder: string;
  style?: React.CSSProperties;
}

const Dropdown: React.FC<DropdownProps> = ({
  dataInfo,
  value,
  setValue,
  clearDropdownValue,
  placeholder,
  style
}) => {
  const handleChange = (selectedValue: string) => {
    setValue(selectedValue);
  };

  const handleClear = () => {
    clearDropdownValue();
  };

  return (
    <Select
      showSearch
      style={{ width: '100%', marginBottom: '15px', ...style }}
      placeholder={placeholder}
      optionFilterProp="children"
      value={value}
      onChange={handleChange}
      onClear={handleClear}
      allowClear
      filterOption={(input, option) =>
        (option?.label?.toString().toLowerCase() ?? '').includes(input.toLowerCase())
      }
      options={dataInfo}
    />
  );
};

export default Dropdown;