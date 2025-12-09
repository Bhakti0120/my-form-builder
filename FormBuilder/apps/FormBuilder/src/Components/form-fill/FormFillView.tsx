import { Box, Button } from '@mui/material';
import FieldRenderer from '../Preview/FieldRenderer';
import { sizeToPercent } from '../../utils/layout-utils';
import { FormConfig } from '../../types/form-types';
import { UseFormReturn } from 'react-hook-form';
interface FormFillViewProps {
  config: FormConfig;
  form: UseFormReturn<any>;
  mode: 'create' | 'edit' | 'view';
  onSubmit: (data: any) => void;
}

export default function FormFillView({
  config,
  form,
  mode,
  onSubmit,
}: FormFillViewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // const disabled = mode === 'view';

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {config.sections.map((sec) => (
        <Box key={sec.id} mb={3}>
          <h3>{sec.label}</h3>

          {sec.rows.map((row, rowIdx) => (
            <Box
              key={rowIdx}
              sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
                {row.map((field) => (
                  <Box
                    key={field.id}
                    sx={{
                      flex: `0 0 ${sizeToPercent(field.size)}%`,
                      px: 1,
                      minWidth: 220,
                      mb: 2,
                    }}
                  >
                    <FieldRenderer
                      field={field}
                      viewType={mode}
                      register={register}
                      error={errors[field.id]?.message as string | undefined}
                      value={form.getValues(field.id)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      ))}

      {mode !== 'view' && (
        <Button variant="contained" type="submit">
          {mode === 'create' ? 'Submit' : 'Save Changes'}
        </Button>
      )}
    </Box>
  );
}
