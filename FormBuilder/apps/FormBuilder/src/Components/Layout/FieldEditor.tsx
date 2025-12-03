import { Box, TextField, MenuItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SizeSelector from "./SizeSelector";
import { useFormBuilder } from "../../context/FormBuilderContext";
import { FieldConfig } from "../../types/form-types";

interface FieldEditorProps {
  row: FieldConfig[];
  sectionId: string;
}

export default function FieldEditor({ row, sectionId }: FieldEditorProps) {
  const { formConfig, updateForm } = useFormBuilder();

  const update = () => updateForm({ sections: [...formConfig.sections] });

  const addField = () => {
    row.push({
      id: crypto.randomUUID(),
      label: "",
      type: "text",
      size: "sm",
      required: false,
    });
    update();
  };

  const deleteField = (id: string) => {
    const idx = row.findIndex((f) => f.id === id);
    row.splice(idx, 1);
    update();
  };

  return (
    <Box display="flex" alignItems="center" gap={2} my={1}>
      {row.map((field) => (
        <Box key={field.id} display="flex" gap={1}>
          <TextField
            label="Label"
            value={field.label}
            onChange={(e) => {
              field.label = e.target.value;
              update();
            }}
          />

          <TextField
            label="Type"
            select
            value={field.type}
            onChange={(e) => {
              field.type = e.target.value;
              update();
            }}
          >
            {["text", "number", "email", "date", "select"].map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>

          <SizeSelector
            size={field.size}
            onChange={(v) => {
              field.size = v;
              update();
            }}
          />

          <IconButton onClick={() => deleteField(field.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <IconButton onClick={addField}>+ Add Field</IconButton>
    </Box>
  );
}
