import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Stack,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import SizeSelector from './SizeSelector';
import { useFormBuilder } from '../../context/FormBuilderContext';
import { FieldConfig, FormSection } from '../../types/form-types';
import { getRowWidth, sizeToPercent } from '../../utils/layout-utils';

const fieldTypes = ['text', 'number', 'email', 'date', 'select'];

interface Props {
  row: FieldConfig[];
  sectionId: string;
  rowIndex: number;
}

export default function FieldEditor({ row, sectionId, rowIndex }: Props) {
const [open, setOpen] = useState<boolean>(false);

  const { formConfig, updateForm } = useFormBuilder();
  const [error, setError] = useState<string | null>(null);

  // Helper: deep clone sections so React sees new references
  const cloneSections = (): FormSection[] =>
    JSON.parse(JSON.stringify(formConfig.sections)) as FormSection[];

  // Generic helper to update a single field immutably
  const updateField = (
    fieldId: string,
    updater: (field: FieldConfig) => FieldConfig
  ) => {
    const sectionsCopy = cloneSections();
    const sectionIndex = sectionsCopy.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;

    const section = sectionsCopy[sectionIndex];
    const rowArr = section.rows[rowIndex];
    if (!rowArr) return;

    const fieldIndex = rowArr.findIndex((f) => f.id === fieldId);
    if (fieldIndex === -1) return;

    rowArr[fieldIndex] = updater(rowArr[fieldIndex]);
    updateForm({ sections: sectionsCopy });
  };

  const handleLabelChange = (fieldId: string, value: string) => {
    updateField(fieldId, (f) => ({ ...f, label: value }));
  };

  const handleTypeChange = (fieldId: string, value: string) => {
    updateField(fieldId, (f) => ({ ...f, type: value, options: value === 'select' ? f.options ?? []: undefined })); ;
  };

  const handleRequiredChange = (fieldId: string, value: 'yes' | 'no') => {
    updateField(fieldId, (f) => ({ ...f, required: value === 'yes' }));
  };

  const handleSizeChange = (fieldId: string, newSize: any) => {
    const sectionsCopy = cloneSections();
    const sectionIndex = sectionsCopy.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;
    const section = sectionsCopy[sectionIndex];

    const rowArr = section.rows[rowIndex];
    if (!rowArr) return;

    const fieldIndex = rowArr.findIndex((f) => f.id === fieldId);
    if (fieldIndex === -1) return;  

    const originalSize = rowArr[fieldIndex].size;
    rowArr[fieldIndex].size = newSize;

    const width = getRowWidth(rowArr);
    if (width > 100) {
      // revert
      rowArr[fieldIndex].size = originalSize;
      setError(
        'Row width cannot exceed 100%. Resize or move fields to a new row.'
      );
      return;
    }

    setError(null);
    updateForm({ sections: sectionsCopy });
  };

  const deleteRow = () => {
    const sectionsCopy = cloneSections();
    const sectionIndex = sectionsCopy.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;

    const section = sectionsCopy[sectionIndex];

    // Block deletion if it's the last row
    if (section.rows.length === 1) {
      setError('At least one row must exist in a section.');
      return;
    }

    section.rows.splice(rowIndex, 1);
    updateForm({ sections: sectionsCopy });
    setError(null);
  };


  const addOption = (fieldId: string) => {
    updateField(fieldId, (f) => ({
      ...f,
      options: [...(f.options ?? []), ''],
    }));
  };

  const handleOptionChange = (
    fieldId: string,
    optionIndex: number,
    value: string
  ) => {
    updateField(fieldId, (f) => {
      const newOptions = [...(f.options ?? [])];
      newOptions[optionIndex] = value;
      return { ...f, options: newOptions };
    });
  };

  const deleteOption = (fieldId: string, optionIndex: number) => {
    updateField(fieldId, (f) => {
      const newOptions = [...(f.options ?? [])];
      newOptions.splice(optionIndex, 1);
      return { ...f, options: newOptions };
    });
  };



  const deleteField = (id: string) => {
    const sectionsCopy = cloneSections();
    const sectionIndex = sectionsCopy.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;

    const section = sectionsCopy[sectionIndex];
    const rowArr = section.rows[rowIndex];
    if (!rowArr) return;

    // Remove specific field
    const filtered = rowArr.filter((f) => f.id !== id);
    section.rows[rowIndex] = filtered;

    // If the row becomes empty AND there are more rows → remove row
    if (filtered.length === 0 && section.rows.length > 1) {
      section.rows.splice(rowIndex, 1);
    }

    updateForm({ sections: sectionsCopy });
    setError(null);
  };


  const addField = () => {
    const sectionsCopy = cloneSections();
    const sectionIndex = sectionsCopy.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;

    const section = sectionsCopy[sectionIndex];
    const currentRow = section.rows[rowIndex];

    const newField: FieldConfig = {
      id: crypto.randomUUID(),
      label: '',
      type: 'text',
      size: 'sm',
      required: false,
      options: [],
    };

    const currentWidth = getRowWidth(currentRow);

    // if it fits in current row, add here; else create a new row
    if (currentWidth + sizeToPercent('sm') <= 100) {
      currentRow.push(newField);
    } else {
      section.rows.push([newField]);
    }

    setError(null);
    updateForm({ sections: sectionsCopy });
  };

  return (
    <Box>
      {/* Row Toolbar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          Row {rowIndex + 1}
        </Typography>

        <Button size="small" color="error" onClick={deleteRow}>
          Delete Row
        </Button>
      </Box>

      {/* Row container: flex so our percentages work correctly */}
      <Box display="flex" flexWrap="wrap" mx={-1}>
        {row.map((field, i) => (
          <Box
            key={field.id}
            sx={{
              flex: `0 0 ${sizeToPercent(field.size)}%`,
              px: 1, // spacing inside, does not break width math
              minWidth: 220,
              boxSizing: 'border-box',
            }}
          >
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="subtitle2">Field {i + 1}</Typography>

                  <TextField
                    label="Label"
                    value={field.label}
                    onChange={(e) =>
                      handleLabelChange(field.id, e.target.value)
                    }
                    fullWidth
                    size="small"
                  />

                  <TextField
                    label="Type"
                    select
                    value={field.type}
                    onChange={(e) => handleTypeChange(field.id, e.target.value)}
                    fullWidth
                    size="small"
                  >
                    {fieldTypes.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Box display="flex" gap={1} alignItems="center">
                    <SizeSelector
                      size={field.size}
                      onChange={(v) => handleSizeChange(field.id, v)}
                    />

                    <TextField
                      label="Required"
                      select
                      size="small"
                      value={field.required ? 'yes' : 'no'}
                      onChange={(e) =>
                        handleRequiredChange(
                          field.id,
                          e.target.value as 'yes' | 'no'
                        )
                      }
                      sx={{ width: 110 }}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </TextField>
                  </Box>

                  {field.type === 'select' && (
                    <Box>
                      {/* Header */}
                      <Box
                        onClick={() => setOpen(!open)}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          height: '16px',
                          p: 0,
                          m: 0,
                          fontSize: '11px',
                          fontWeight: 600,
                          opacity: 0.7,
                          lineHeight: 1, 
                        }}
                      >
                        Options ({field.options?.length || 0})
                      </Box>

                      {/* Content */}
                      <Collapse
                        in={open}
                        unmountOnExit 
                        sx={{
                          mt: 1,
                          p: 0,
                        }}
                      >
                        {field.options?.map((opt, idx) => (
                          <Box key={idx} display="flex" gap={1} mb={1}>
                            <TextField
                              size="small"
                              fullWidth
                              value={opt}
                              onChange={(e) =>
                                handleOptionChange(
                                  field.id,
                                  idx,
                                  e.target.value
                                )
                              }
                            />
                            <Button
                              size="small"
                              color="error"
                              sx={{ minWidth: 28, p: '0 4px', lineHeight: 1 }}
                              onClick={() => deleteOption(field.id, idx)}
                            >
                              x
                            </Button>
                          </Box>
                        ))}

                        <Button
                          size="small"
                          sx={{
                            fontSize: 11,
                            textTransform: 'none',
                            p: 0,
                            mt: 0.5,
                            lineHeight: 1,
                          }}
                          onClick={() => addOption(field.id)}
                        >
                          + Add option
                        </Button>
                      </Collapse>
                    </Box>
                  )}
                </Stack>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  onClick={() => deleteField(field.id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}

      {/* Add field button below the row */}
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={addField}>
          Add Field
        </Button>
      </Box>
    </Box>
  );
}
