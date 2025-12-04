// apps/FormBuilder/src/components/preview/FieldRenderer.tsx
import React from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from '@mui/material';
import { FieldConfig } from '../../types/form-types';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  field: FieldConfig;
  viewType: 'create' | 'edit' | 'view';
  register: UseFormRegister<any>;
  error?: string;
}

export default function FieldRenderer({
  field,
  viewType,
  register,
  error,
}: Props) {
  const disabled = viewType === 'view';

  /** Binding RHF register */
  const registerProps = {
    ...register(field.id),
  };

  // Handle SELECT separately
  if (field.type === 'select') {
    return (
      <FormControl fullWidth size="small" disabled={disabled} error={!!error}>
        <InputLabel id={`label-${field.id}`}>{field.label}</InputLabel>

        <Select
          labelId={`label-${field.id}`}
          label={field.label}
          defaultValue=""
          {...registerProps}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="option_1">Option 1</MenuItem>
          <MenuItem value="option_2">Option 2</MenuItem>
          <MenuItem value="option_3">Option 3</MenuItem>
        </Select>

        {error && (
          <Box sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}>{error}</Box>
        )}
      </FormControl>
    );
  }

  // Default TextField types
  return (
    <TextField
      {...registerProps}
      label={field.label}
      fullWidth
      size="small"
      disabled={disabled}
      error={!!error}
      helperText={error}
      type={
        field.type === 'number'
          ? 'number'
          : field.type === 'email'
          ? 'email'
          : field.type === 'date'
          ? 'date'
          : undefined
      }
    />
  );
}
