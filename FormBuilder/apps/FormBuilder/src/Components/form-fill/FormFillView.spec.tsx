import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { vi } from 'vitest';
import FormFillView from './FormFillView';
import { FormConfig } from '../../types/form-types';

// Mock react-hook-form's useForm
vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(),
          handleSubmit: vi.fn((cb) => (e?: React.BaseSyntheticEvent) => {
            e?.preventDefault(); // Use optional chaining here
            cb({});
            return Promise.resolve(); // Ensure it returns a Promise<void>
          }),    formState: {
      isDirty: false,
      isValid: true,
      isSubmitting: false,
      isSubmitted: false,
      isSubmitSuccessful: false,
      submitCount: 0,
      errors: {},
      isLoading: false,
      isValidating: false,
      dirtyFields: {},
      touchedFields: {},
      defaultValues: {},
      disabled: false,
      validatingFields: {},
      isReady: true,
    },
    resetField: vi.fn(),
    unregister: vi.fn(),
    subscribe: vi.fn(),
  })),
}));

// Mock FieldRenderer component
vi.mock('../Preview/FieldRenderer', () => ({
  default: vi.fn(() => <div>Mocked Field Renderer</div>),
}));

describe('FormFillView', () => {
  const mockConfig: FormConfig = {
    formLabel: 'Test Form',
    sections: [
      {
        id: 'section1',
        label: 'Section 1',
        expanded: true,
        rows: [
          [
            { id: 'field1', label: 'Field 1', type: 'text', size: 'md', required: true } as const,
            { id: 'field2', label: 'Field 2', type: 'number', size: 'sm', required: false } as const,
          ],
        ],
      } as const,
      {
        id: 'section2',
        label: 'Section 2',
        expanded: true,
        rows: [
          [
            { id: 'field3', label: 'Field 3', type: 'date', size: 'lg', required: true } as const,
          ],
        ],
      } as const,
    ],
  };

  const mockOnSubmit = vi.fn();
  let mockUseFormReturn: UseFormReturn<any>;

  beforeEach(() => {
    mockOnSubmit.mockClear();
    // Reset the useForm mock for each test
    vi.mocked(useForm).mockReturnValue({
      register: vi.fn(),
      handleSubmit: vi.fn((cb) => (e?: React.BaseSyntheticEvent) => {
        e?.preventDefault(); // Use optional chaining here
        cb({});
        return Promise.resolve(); // Ensure it returns a Promise<void>
      }),
      formState: {
        isDirty: false,
        isValid: true,
        isSubmitting: false,
        isSubmitted: false,
        isSubmitSuccessful: false,
        submitCount: 0,
        errors: {},
        isLoading: false,
        isValidating: false,
        dirtyFields: {},
        touchedFields: {},
        defaultValues: {},
        disabled: false,
        validatingFields: {},
        isReady: true,
      },
      // Add other necessary useForm return values as needed
      getValues: vi.fn(),
      setValue: vi.fn(),
      watch: vi.fn(),
      control: {} as any,
      trigger: vi.fn(),
      reset: vi.fn(),
      clearErrors: vi.fn(),
      setError: vi.fn(),
      setFocus: vi.fn(),
      getFieldState: vi.fn(),
      resetField: vi.fn(),
      unregister: vi.fn(),
      subscribe: vi.fn(),
    });    mockUseFormReturn = useForm();
  });

  it('should render successfully with default mode', () => {
    render(
      <FormFillView
        config={mockConfig}
        form={mockUseFormReturn}
        mode="create"
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByText('Section 1')).toBeTruthy();
    expect(screen.getByText('Section 2')).toBeTruthy();
    expect(screen.getAllByText('Mocked Field Renderer').length).toBe(3); // 3 fields in mockConfig
    expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
  });

  it('should display "Save Changes" button in "edit" mode', () => {
    render(
      <FormFillView
        config={mockConfig}
        form={mockUseFormReturn}
        mode="edit"
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeTruthy();
  });

  it('should not display a submit button in "view" mode', () => {
    render(
      <FormFillView
        config={mockConfig}
        form={mockUseFormReturn}
        mode="view"
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.queryByRole('button', { name: 'Submit' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Save Changes' })).toBeNull();
  });

  it('should call onSubmit when the form is submitted in "create" mode', () => {
    render(
      <FormFillView
        config={mockConfig}
        form={mockUseFormReturn}
        mode="create"
        onSubmit={mockOnSubmit}
      />
    );
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmit when the form is submitted in "edit" mode', () => {
    render(
      <FormFillView
        config={mockConfig}
        form={mockUseFormReturn}
        mode="edit"
        onSubmit={mockOnSubmit}
      />
    );
    fireEvent.submit(screen.getByRole('button', { name: 'Save Changes' }));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
