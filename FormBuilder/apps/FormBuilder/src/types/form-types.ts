export type FieldSize = "sm" | "md" | "lg" | "xl";

export interface FieldConfig {
  id: string;
  label: string;
  type: string;
  size: FieldSize;
  required: boolean;
  options?: string[]; // For select fields
}

export interface FormSection {
  id: string;
  label: string;
  expanded: boolean;
  rows: FieldConfig[][];
}

export interface FormConfig {
  id?: string;
  formLabel: string;
  sections: FormSection[];
}
