import { FieldConfig, FieldSize } from "../types/form-types";

export const sizeToPercent = (size: FieldSize): number => {
  switch (size) {
    case "xl":
      return 100;
    case "lg":
      return 66.66;
    case "md":
      return 50;
    case "sm":
    default:
      return 33.33;
  }
};

export const getRowWidth = (row: FieldConfig[]): number => {
  const width = row.reduce((sum, field) => sum + sizeToPercent(field.size), 0)
  return Number(width.toFixed(2))
};
