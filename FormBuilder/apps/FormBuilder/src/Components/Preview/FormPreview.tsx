// apps/FormBuilder/src/components/preview/FormPreview.tsx
import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldRenderer from './FieldRenderer';
import { useFormBuilder } from '../../context/FormBuilderContext';
import { buildZodSchema } from '../../utils/schema-builder';
import { sizeToPercent } from '../../utils/layout-utils';

export default function FormPreview() {
  const { formConfig } = useFormBuilder();

  const schema = buildZodSchema(formConfig);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log('FORM DATA:', data);
    alert(JSON.stringify(data, null, 2));
  };

  if (!formConfig?.sections?.length) {
    return (
      <Typography color="text.secondary">
        No form layout configured yet.
      </Typography>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate p={2}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        {formConfig.formLabel || 'Form Preview'}
      </Typography>

      {formConfig.sections.map((sec) => (
        <Box key={sec.id} mb={3}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            {sec.label}
          </Typography>

          {sec.rows.map((row, rowIdx) => (
            <Box
              key={rowIdx}
              sx={{
                mb: 2,
                p: 2,
                border: '1px solid #ddd',
                borderRadius: 1,
                background: '#fafafa',
              }}
            >
              <Typography
                variant="caption"
                fontWeight={600}
                display="block"
                mb={1}
              >
                Row {rowIdx + 1}
              </Typography>

              <Box display="flex" flexWrap="wrap" mx={-1}>
                {row.map((field) => (
                  <Box
                    key={field.id}
                    sx={{
                      flex: `0 0 ${sizeToPercent(field.size)}%`,
                      px: 1,
                      minWidth: 220,
                      boxSizing: 'border-box',
                      mb: 2,
                    }}
                  >
                    <FieldRenderer
                      field={field}
                      viewType={formConfig.viewType}
                      register={register}
                      error={errors[field.id]?.message as string | undefined}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
        </Box>
      ))}

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
