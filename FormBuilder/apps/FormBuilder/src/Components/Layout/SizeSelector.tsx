import { TextField, MenuItem } from '@mui/material';
import { FieldSize } from '../../types/form-types';

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
      <MenuItem value="sm">Small</MenuItem>
      <MenuItem value="md">Medium</MenuItem>
      <MenuItem value="lg">Large</MenuItem>
      <MenuItem value="xl">Extra-large</MenuItem>
    </TextField>
  );
}
