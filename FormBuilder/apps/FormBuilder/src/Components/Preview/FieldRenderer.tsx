// apps/FormBuilder/src/components/preview/FieldRenderer.tsx
import React from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { FieldConfig } from '../../types/form-types';

interface Props {
  field: FieldConfig;
  viewType: 'create' | 'edit' | 'view';
  // optional handlers for RHF or parent-controlled state later
  value?: any;
  onChange?: (val: any) => void;
}

/**
 * FieldRenderer
 *
 * - Maps your FieldConfig.type to a basic MUI input.
 * - Inputs are disabled when viewType === "view".
 * - For now this is controlled via local onChange if provided; later integrate RHF here.
 *
 * TODO (Phase 3): replace local onChange/value with react-hook-form register + zod resolver.
 */
export default function FieldRenderer({
  field,
  viewType,
  value,
  onChange,
}: Props) {
  const disabled = viewType === 'view';

  const commonProps = {
    label: field.label || 'Field',
    required: field.required,
    fullWidth: true,
    size: 'small' as const,
    disabled,
    value: value ?? '',
    onChange: (_e: any) => {
      if (onChange) onChange(_e.target?.value ?? _e);
    },
  };

  switch (field.type) {
    case 'text':
      return <TextField {...commonProps} placeholder={field.label} />;
    case 'email':
      return (
        <TextField {...commonProps} type="email" placeholder={field.label} />
      );
    case 'number':
      return (
        <TextField {...commonProps} type="number" placeholder={field.label} />
      );
    case 'date':
      // browser native date input for simplicity; later swap to MUI DatePicker
      return (
        <TextField
          {...commonProps}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      );
    case 'select':
      // default example options — you should extend FieldConfig with options for real selects
      return (
        <FormControl fullWidth size="small" disabled={disabled}>
          <InputLabel id={`label-${field.id}`}>{field.label}</InputLabel>
          <Select
            labelId={`label-${field.id}`}
            label={field.label}
            value={value ?? ''}
            onChange={(e: SelectChangeEvent<any>) => {
              if (onChange) onChange(e.target.value);
            }}
          >
            <MenuItem value="">Select an option</MenuItem>
            <MenuItem value="option_1">Option 1</MenuItem>
            <MenuItem value="option_2">Option 2</MenuItem>
            <MenuItem value="option_3">Option 3</MenuItem>
          </Select>
        </FormControl>
      );
    default:
      // fallback to text
      return <TextField {...commonProps} placeholder={field.label} />;
  }
}
