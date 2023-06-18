import React from "react";
import { Stack, Select } from "@chakra-ui/react";
function Filter({ filterField, setFilterFields, data, isSuccess }) {
  const onSelectChange = (field, value) => {
    setFilterFields((prev) => ({ ...prev, [field]: value }));
  };

  const SelectFilter = (options, value, onChange) => (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">All</option>
      {isSuccess &&
        options.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
    </Select>
  );

  return (
    <Stack direction="row">
      {SelectFilter(data.attributes.ownerEmuns, filterField.owner, (value) =>
        onSelectChange("owner", "value")
      )}
      {SelectFilter(data.attributes.visaEmuns, filterField.visa, (value) =>
        onSelectChange("visa", "value")
      )}
      {SelectFilter(data.attributes.statusEmuns, filterField.status, (value) =>
        onSelectChange("status", "value")
      )}
    </Stack>
  );
}

export default Filter;
