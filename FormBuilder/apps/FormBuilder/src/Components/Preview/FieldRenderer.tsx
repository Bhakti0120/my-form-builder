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
  viewType?: 'create' | 'edit' | 'view';
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

        {field.options?.length ? (
          field.options.map((opt, idx) => (
            <MenuItem key={idx} value={opt}>
              {opt}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No options available</MenuItem>
        )}
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
      slotProps={
        field.type === 'date'
          ? {
              inputLabel: { shrink: true }, 
            }
          : undefined
      }
    />
  );
}
