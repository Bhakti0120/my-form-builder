import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
} from '@mui/material';
import { FieldConfig } from '../../types/form-types';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  field: FieldConfig;
  viewType?: 'create' | 'edit' | 'view';
  register: UseFormRegister<any>;
  error?: string;
  value?: any; // passed from form.getValues()
}

export default function FieldRenderer({
  field,
  viewType = 'create',
  register,
  error,
  value,
}: Props) {
  const isView = viewType === 'view';

  // --------------------------------------
  // VIEW MODE → NEVER RENDER INPUTS
  // --------------------------------------
  if (isView) {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
          {field.label}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 0.5,
            p: 1.2,
            background: '#f7f7f7',
            borderRadius: 1,
            minHeight: 38,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {value || '—'}
        </Typography>
      </Box>
    );
  }

  // --------------------------------------
  // CREATE / EDIT MODE INPUT BINDING
  // --------------------------------------
  const registerProps = register(field.id);

  // SELECT FIELD ------------------------
  if (field.type === 'select') {
    return (
      <FormControl fullWidth size="small" error={!!error}>
        <InputLabel id={`label-${field.id}`}>{field.label}</InputLabel>

        <Select
          labelId={`label-${field.id}`}
          label={field.label}
          defaultValue={value ?? ''}
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
          <Typography sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}>
            {error}
          </Typography>
        )}
      </FormControl>
    );
  }

  // TEXT / NUMBER / EMAIL / DATE INPUTS ------------------------
  return (
    <TextField
      {...registerProps}
      defaultValue={value ?? ''}
      label={field.label}
      fullWidth
      size="small"
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
        field.type === 'date' ? { inputLabel: { shrink: true } } : undefined
      }
    />
  );
}
