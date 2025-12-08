import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SectionEditor from './SectionEditor';
import { useFormBuilder } from '../../context/FormBuilderContext';
import { defaultConfig } from '../../context/FormBuilderContext';

export default function FormBuilder() {
  const { formConfig, updateForm } = useFormBuilder();

  const addSection = () => {
    updateForm({
      sections: [
        ...formConfig.sections,
        {
          id: crypto.randomUUID(),
          label: `Section ${formConfig.sections.length + 1}`,
          expanded: true,
          rows: [
            [
              {
                id: crypto.randomUUID(),
                label: 'Field 1',
                type: 'text',
                size: 'sm',
                required: false,
                options: [],
              },
              {
                id: crypto.randomUUID(),
                label: 'Field 2',
                type: 'text',
                size: 'sm',
                required: false,
                options: [],
              },
              {
                id: crypto.randomUUID(),
                label: 'Field 3',
                type: 'text',
                size: 'sm',
                required: false,
                options: [],
              },
            ],
          ],
        },
      ],
    });
  };
  const resetForm = () => {
    updateForm(defaultConfig);
  };
  const handleFormLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ formLabel: e.target.value });
  };

  
  return (
    <Box p={3}>
      {/* Form-level settings */}

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mb={2}
        gap={2}
      >
        <Button variant="contained" onClick={addSection}>
          Add Section
        </Button>

        <Button variant="contained" color="error" onClick={resetForm}>
          Reset
        </Button>
      </Box>
      {formConfig.sections.length === 0 && (
        <Typography sx={{ mt: 2, mb: 3 }} color="text.secondary">
          Your form is empty. Click "Add Section" to get started.
        </Typography>
      )}

      {/* Sections */}
      {formConfig.sections.map((sec) => (
        <SectionEditor key={sec.id} section={sec} />
      ))}
    </Box>
  );
}
