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
          rows: [[]],
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

  // const handleViewTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   updateForm({ viewType: e.target.value as 'create' | 'edit' | 'view' });
  // };
  return (
    <Box p={3}>
      {/* Form-level settings */}
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          Dynamic Form Builder
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Form Title"
            value={formConfig.formLabel}
            onChange={handleFormLabelChange}
            fullWidth
            size="small"
          />

          {/* <TextField
            label="View Type"
            select
            value={formConfig.viewType}
            onChange={handleViewTypeChange}
            size="small"
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="create">Create</MenuItem>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="view">View</MenuItem>
          </TextField> */}
        </Stack>
      </Box>

      {/* Sections */}
      {formConfig.sections.map((sec) => (
        <SectionEditor key={sec.id} section={sec} />
      ))}

      <Box mt={2} display="flex" gap={2}>
        <Button variant="contained" onClick={addSection}>
          Add Section
        </Button>
        
        <Button variant="contained" color="error" onClick={resetForm}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}
