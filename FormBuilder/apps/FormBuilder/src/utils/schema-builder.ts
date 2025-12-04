import { z } from 'zod';
import { FormConfig, FieldConfig } from '../types/form-types';

export function buildZodSchema(form: FormConfig) {
  const shape: Record<string, any> = {};

  form.sections.forEach((section) => {
    section.rows.forEach((row) => {
      row.forEach((field) => {
        shape[field.id] = zodFromField(field);
      });
    });
  });

  return z.object(shape);
}

function zodFromField(field: FieldConfig) {
  let schema: any = z.string();

  switch (field.type) {
    case 'email':
      schema = z.email('Invalid email format');
      break;

    case 'number':
      schema = z.coerce
        .number()
        .refine((val) => typeof val === 'number' && !isNaN(val), {
          message: 'Value must be a valid number',
        });
      break;

    default:
      schema = z.string();
  }

  if (field.required) {
    schema = schema.min(1, 'This field is required');
  } else {
    schema = schema.optional().nullable();
  }

  return schema;
}
