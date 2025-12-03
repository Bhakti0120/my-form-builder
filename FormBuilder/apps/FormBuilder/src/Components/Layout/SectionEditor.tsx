import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

import FieldEditor from "./FieldEditor";
import { useFormBuilder } from "../../context/FormBuilderContext";
import { FormSection } from "../../types/form-types";

interface Props {
  section: FormSection;
}

export default function SectionEditor({ section }: Props) {
  const { formConfig, updateForm } = useFormBuilder();

  const deleteSection = () => {
    updateForm({
      sections: formConfig.sections.filter((s) => s.id !== section.id),
    });
  };

  const addRow = () => {
    section.rows.push([]);
    updateForm({ sections: [...formConfig.sections] });
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight="bold">{section.label}</Typography>
        <IconButton onClick={deleteSection} sx={{ ml: 2 }}>
          <DeleteIcon />
        </IconButton>
      </AccordionSummary>

      <AccordionDetails>
        {section.rows.map((row, idx) => (
          <FieldEditor key={idx} row={row} sectionId={section.id} />
        ))}

        <Button onClick={addRow}>Add Row</Button>
      </AccordionDetails>
    </Accordion>
  );
}
