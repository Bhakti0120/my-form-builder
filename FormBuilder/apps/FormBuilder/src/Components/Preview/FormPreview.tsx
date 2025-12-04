// apps/FormBuilder/src/components/preview/FormPreview.tsx
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormBuilder } from '../../context/FormBuilderContext';
import FieldRenderer from './FieldRenderer';
import { FieldConfig, FieldSize } from '../../types/form-types';

/**
 * Utility: convert FieldSize -> flex-basis percentage string
 * Matches the same rules used in your FieldEditor (33.33, 50, 66.66, 100)
 */
const sizeToFlexPercent = (size: FieldSize) => {
  switch (size) {
    case 'xl':
      return '100%';
    case 'lg':
      return '66.66%';
    case 'md':
      return '50%';
    case 'sm':
    default:
      return '33.33%';
  }
};

/**
 * FormPreview
 *
 * - Reads formConfig from context
 * - Renders sections (Accordion) -> rows -> fields
 * - Each row is a flex container; each field uses flex-basis from sizeToFlexPercent
 *
 * Note: This preview is intentionally simple and does NOT yet wire react-hook-form.
 * When you move to Phase 3 we'll wrap this in RHF and auto-generate Zod schemas.
 */
export default function FormPreview() {
  const { formConfig } = useFormBuilder();

  if (!formConfig.sections || formConfig.sections.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Preview</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          No sections yet — go to Builder mode and add sections/fields.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {formConfig.formLabel || 'Untitled Form'}
      </Typography>

      {formConfig.sections.map((section) => (
        <Accordion key={section.id} defaultExpanded={section.expanded}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold' }}>
              {section.label || 'Section'}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box display="flex" flexDirection="column" gap={2}>
              {section.rows.map((row, rowIndex) => (
                <Box
                  key={rowIndex}
                  display="flex"
                  flexWrap="wrap"
                  gap={16}
                  alignItems="flex-start"
                >
                  {row.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      (Empty row)
                    </Typography>
                  ) : (
                    row.map((field: FieldConfig) => (
                      <Box
                        key={field.id}
                        sx={{
                          flex: `0 0 ${sizeToFlexPercent(field.size)}`,
                          minWidth: 180,
                        }}
                      >
                        <FieldRenderer
                          field={field}
                          viewType={formConfig.viewType}
                        />
                      </Box>
                    ))
                  )}
                </Box>
              ))}

              <Divider />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
