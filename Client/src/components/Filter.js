import React from "react";
import { Stack, Select } from "@chakra-ui/react";
function Filter({ filterField, setFilterFields, data, isSuccess }) {
  const onSelectChange = (field, value) => {
    setFilterFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    isSuccess && (
      <Stack direction="row">
        <SelectFilter
          options={data.attributes.ownerEmuns}
          value={filterField.owner}
          onChange={(value) => onSelectChange("owner", value)}
        />
        <SelectFilter
          options={data.attributes.ownerEmuns}
          value={filterField.owner}
          onChange={(value) => onSelectChange("visa", value)}
        />
        <SelectFilter
          options={data.attributes.ownerEmuns}
          value={filterField.owner}
          onChange={(value) => onSelectChange("status", value)}
        />
      </Stack>
    )
  );
}

const SelectFilter = ({ options, value, onChange }) => (
  <Select value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="">All</option>
    {options.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ))}
  </Select>
);

export default Filter;
