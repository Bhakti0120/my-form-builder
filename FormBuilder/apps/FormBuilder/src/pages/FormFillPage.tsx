import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { loadTemplates, loadResponses, saveResponse } from '../utils/storage';
import { useForm } from 'react-hook-form';
import FormFillView from '../Components/form-fill/FormFillView';
import { buildZodSchema } from '../utils/schema-builder';
import { zodResolver } from '@hookform/resolvers/zod';


export default function FormFillPage() {
  const [params] = useSearchParams();

  const formId = params.get('formId')!;
  const mode = (params.get('mode') || 'create') as 'create' | 'edit' | 'view';
  const responseId = params.get('responseId');

  const templates = loadTemplates();
  const template = templates[formId];

  const schema=buildZodSchema(template.config)

  if (!template) {
    return <Typography>Form not found.</Typography>;
  }

  const allResponses = loadResponses();
  const responses = allResponses[formId] || [];

  const existingResponse = responses.find((r) => r.responseId === responseId);

  // ⭐ THIS IS THE IMPORTANT PART:
  const form = useForm({
    defaultValues: existingResponse?.data || {},
    resolver: zodResolver(schema),
    mode : "onChange"
  });

  const handleSave = (data: any) => {
    const newResponse = {
      responseId: responseId || crypto.randomUUID(),
      data,
      createdAt: existingResponse?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveResponse(formId, newResponse, template.config);

    alert(mode === 'edit' ? 'Response updated!' : 'Form submitted!');
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        {template.title}
      </Typography>

      <FormFillView
        config={template.config}
        form={form}
        mode={mode}
        onSubmit={handleSave}
      />
    </Box>
  );
}
