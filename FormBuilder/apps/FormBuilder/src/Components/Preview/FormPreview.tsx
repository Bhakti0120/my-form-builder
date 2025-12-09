// apps/FormBuilder/src/components/preview/FormPreview.tsx
import { Box, Typography, Button, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldRenderer from './FieldRenderer';
import { useFormBuilder } from '../../context/FormBuilderContext';
import { buildZodSchema } from '../../utils/schema-builder';
import { sizeToPercent } from '../../utils/layout-utils';
import { useNavigate } from 'react-router-dom';
import { FormConfig } from '../../types/form-types';

interface previewProps {
  showSave?: boolean;
}
export default function FormPreview({ showSave = true }: previewProps) {
  const navigate=useNavigate()
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

  const validateFormBeforeSave = (formConfig: FormConfig): string | null => {
    if (!formConfig.formLabel || !formConfig.formLabel.trim()) {
      return 'Form title is required.';
    }

    for (const section of formConfig.sections) {
      for (const row of section.rows) {
        for (const field of row) {
          const label = field.label?.trim();
          if (!label) return `A field is missing a label.`;

          if (field.type === 'select') {
            if (!field.options?.length) {
              return `Select field "${label}" must have at least one option.`;
            }
            if (field.options.some((opt) => !opt.trim())) {
              return `All options in "${label}" must be non-empty.`;
            }
          }
        }
      }
    }

    return null;
  };



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
          // inside FormPreview.tsx — replace the current onClick
          onClick={() => {
            // run the same validator but with extra logging
            const error = validateFormBeforeSave(formConfig);
            if (error) {
              // show a user alert and a helpful dev log with a readable snapshot
              alert(error);
              console.warn('Form save blocked:', error, {
                title: formConfig.formLabel,
                sections: formConfig.sections.map((s: any, si: number) => ({
                  index: si,
                  label: s.label,
                  rows: s.rows.map((r: any, ri: number) =>
                    r.map((f: any, fi: number) => ({
                      section: si,
                      row: ri,
                      field: fi,
                      id: f.id,
                      labelRaw: f.label,
                      labelTrim: String(f.label ?? '').trim(),
                      type: f.type,
                      optionsCount: Array.isArray(f.options)
                        ? f.options.length
                        : 0,
                    }))
                  ),
                })),
                full: formConfig,
              });
              return;
            }

            // proceed to save
            const stored = JSON.parse(
              localStorage.getItem('published-forms') || '{}'
            );
            const urlParams = new URLSearchParams(window.location.search);
            const editingId = urlParams.get('edit');
            const formId = editingId || formConfig.id || crypto.randomUUID();

            const template = {
              id: formId,
              title: formConfig.formLabel.trim(),
              config: formConfig,
              createdAt: stored[formId]?.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            stored[formId] = template;
            localStorage.setItem('published-forms', JSON.stringify(stored));

            alert(`Form "${template.title}" saved successfully!`);
            if (editingId) navigate('/forms');
          }}
        >
          Save Form
        </Button>
      )}
    </Box>
  );
}
