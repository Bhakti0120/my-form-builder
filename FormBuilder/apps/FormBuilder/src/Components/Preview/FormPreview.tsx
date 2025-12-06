// apps/FormBuilder/src/components/preview/FormPreview.tsx
import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldRenderer from './FieldRenderer';
import { useFormBuilder } from '../../context/FormBuilderContext';
import { buildZodSchema } from '../../utils/schema-builder';
import { sizeToPercent } from '../../utils/layout-utils';

interface previewProps {
  showSave?: boolean;
}
export default function FormPreview({ showSave=true}: previewProps) {
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
                      // viewType={formConfig.viewType}
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
      {showSave && (
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => {
            const stored = JSON.parse(
              localStorage.getItem('published-forms') || '{}'
            );

            const formId = formConfig.id || crypto.randomUUID(); // NEW: assign ID if missing

            const template = {
              id: formId,
              title: formConfig.formLabel.trim() || 'Untitled Form',
              config: formConfig,
              createdAt: stored[formId]?.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            stored[formId] = template;

            localStorage.setItem('published-forms', JSON.stringify(stored));
            alert(`Form "${template.title}" saved successfully!`);
          }}
        >
          Save Form
        </Button>
      )}
    </Box>
  );
}
