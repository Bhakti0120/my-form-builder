import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Button,
  Stack,
  Divider,
  TextField,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FieldEditor from './FieldEditor';
import { useFormBuilder } from '../../context/FormBuilderContext';
import { FormSection } from '../../types/form-types';

interface Props {
  section: FormSection;
  
}

export default function SectionEditor({ section }: Props) {
  const { formConfig, updateForm } = useFormBuilder();

  const updateSections = (
    updater: (sections: FormSection[]) => FormSection[]
  ) => {
    updateForm({ sections: updater(formConfig.sections) });
  };

  const deleteSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateSections((sections) => sections.filter((s) => s.id !== section.id));
  };

  const addRow = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateSections((sections) =>
      sections.map((s) =>
        s.id === section.id ? { ...s, rows: [...s.rows, []] } : s
      )
    );
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    updateSections((sections) =>
      sections.map((s) => (s.id === section.id ? { ...s, label: newLabel } : s))
    );
  };

  const handleAccordionToggle = (
    _e: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    updateSections((sections) =>
      sections.map((s) =>
        s.id === section.id ? { ...s, expanded: isExpanded } : s
      )
    );  
  };

  return (
    <Accordion
      expanded={section.expanded}
      onChange={handleAccordionToggle}
      sx={{ mb: 3, position: 'relative' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            Section
          </Typography>
          <TextField
            variant="standard"
            value={section.label}
            onChange={handleLabelChange}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            placeholder="Section label"
            sx={{ maxWidth: 300 }}
          />
        </Box>

        <IconButton
          size="small"
          onClick={deleteSection}
          aria-label="delete section"
          sx={{ ml: 1 }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={2}>
          {section.rows.map((row, idx) => (
            <Box key={idx}>
              <FieldEditor row={row} sectionId={section.id} rowIndex={ idx} />
              {idx < section.rows.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}

          <Box display="flex" justifyContent="flex-end">
            <Button
              startIcon={<AddIcon />}
              onClick={addRow}
              variant="outlined"
              size="small"
            >
              Add Row
            </Button>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
