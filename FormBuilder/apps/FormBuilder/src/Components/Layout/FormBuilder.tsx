import { Box, Button, Typography } from "@mui/material";
import SectionEditor from "./SectionEditor";
import { useFormBuilder } from "../../context/FormBuilderContext";

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

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dynamic Form Builder
      </Typography>

      {formConfig.sections.map((sec) => (
        <SectionEditor key={sec.id} section={sec} />
      ))}

      <Button variant="contained" onClick={addSection}>
        Add Section
      </Button>
    </Box>
  );
}
