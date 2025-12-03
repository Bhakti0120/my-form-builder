import { TextField, MenuItem } from "@mui/material";
import { FieldSize } from "../../types/form-types";

export default function SizeSelector({
  size,
  onChange,
}: {
  size: FieldSize;
  onChange: (val: FieldSize) => void;
}) {
  return (
    <TextField
      label="Size"
      select
      value={size}
      onChange={(e) => onChange(e.target.value as FieldSize)}
      sx={{ width: 100 }}
    >
      <MenuItem value="sm">33%</MenuItem>
      <MenuItem value="md">50%</MenuItem>
      <MenuItem value="lg">66%</MenuItem>
      <MenuItem value="xl">100%</MenuItem>
    </TextField>
  );
}
