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

  const deleteSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateForm({
      sections: formConfig.sections.filter((s) => s.id !== section.id),
    });
  };

  const addRow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSections = formConfig.sections.map((s) =>
      s.id === section.id ? { ...s, rows: [...s.rows, []] } : s
    );
    updateForm({ sections: newSections });
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: 'bold', mr: 2 }}>
          {section.label}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* <IconButton
          size="small"
          onClick={deleteSection}
          aria-label="delete section"
          sx={{ ml: 1 }}
        >
          <DeleteIcon />
        </IconButton> */}
      </AccordionSummary>
      <IconButton
        size="small"
        onClick={deleteSection}
        aria-label="delete section"
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <DeleteIcon />
      </IconButton>
      <AccordionDetails>
        <Stack spacing={2}>
          {section.rows.map((row, idx) => (
            <Box key={idx}>
              <FieldEditor row={row} sectionId={section.id} />
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
