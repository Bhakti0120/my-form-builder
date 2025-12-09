import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SectionEditor from './SectionEditor';
import { FormSection } from '../../types/form-types';
// import { FormBuilderContext } from '../../context/FormBuilderContext'; // REMOVE THIS IMPORT
import FieldEditor from './FieldEditor'; // Import for mocking
import { useFormBuilder } from '../../context/FormBuilderContext'; // Import useFormBuilder for mocking

// Mock useFormBuilder hook
vi.mock('../../context/FormBuilderContext', () => ({
  useFormBuilder: vi.fn(),
}));

// Mock FieldEditor component
vi.mock('./FieldEditor', () => ({
  default: vi.fn(() => <div>Mocked Field Editor</div>),
}));


describe('SectionEditor', () => {
  const mockUpdateForm = vi.fn();
  const mockFormConfig = {
    formLabel: 'Test Form',
    sections: [
      {
        id: 'section-1',
        label: 'Section 1 Label',
        expanded: true,
        rows: [[{ id: 'field-1', label: 'Field 1', type: 'text', size: 'md', required: true }]],
      },
      {
        id: 'section-2',
        label: 'Section 2 Label',
        expanded: false,
        rows: [],
      },
    ],
  };

  const renderWithContext = (section: FormSection) => {
    return render(
      <SectionEditor section={section} />
    );
  };

  beforeEach(() => {
    mockUpdateForm.mockClear();
    vi.mocked(FieldEditor).mockClear();
    vi.mocked(useFormBuilder).mockReturnValue({
      formConfig: mockFormConfig,
      updateForm: mockUpdateForm,
    });
    // Reset mockFormConfig sections to avoid side effects between tests
    mockFormConfig.sections = [
      {
        id: 'section-1',
        label: 'Section 1 Label',
        expanded: true,
        rows: [[{ id: 'field-1', label: 'Field 1', type: 'text', size: 'md', required: true }]],
      },
      {
        id: 'section-2',
        label: 'Section 2 Label',
        expanded: false,
        rows: [],
      },
    ];
  });

  it('should render successfully with section label and field editor', () => {
    const sectionToTest = mockFormConfig.sections[0];
    renderWithContext(sectionToTest);

    expect(screen.getByDisplayValue('Section 1 Label')).toBeTruthy();
    expect(screen.getByText('Mocked Field Editor')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add Row' })).toBeTruthy();
    expect(screen.getByLabelText('delete section')).toBeTruthy();
  });

  it('should toggle accordion expanded state when summary is clicked', async () => {
    const sectionToTest = { ...mockFormConfig.sections[0], expanded: false }; // Start collapsed
    renderWithContext(sectionToTest);

    // Initial state: not expanded visually
    const accordionSummary = screen.getByText('Section').closest('.MuiAccordionSummary-root');
    expect(accordionSummary).not.toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(accordionSummary as HTMLElement);

    await waitFor(() => {
      expect(mockUpdateForm).toHaveBeenCalledTimes(1);
      expect(mockUpdateForm).toHaveBeenCalledWith({
        sections: [
          {
            id: 'section-1',
            label: 'Section 1 Label',
            expanded: true, // Should be updated to true
            rows: [[{ id: 'field-1', label: 'Field 1', type: 'text', size: 'md', required: true }]],
          },
          {
            id: 'section-2',
            label: 'Section 2 Label',
            expanded: false,
            rows: [],
          },
        ],
      });
    });
  });

  it('should delete the section when delete button is clicked', async () => {
    const sectionToTest = mockFormConfig.sections[0];
    renderWithContext(sectionToTest);

    fireEvent.click(screen.getByLabelText('delete section'));

    await waitFor(() => {
      expect(mockUpdateForm).toHaveBeenCalledTimes(1);
      expect(mockUpdateForm).toHaveBeenCalledWith({
        sections: [
          {
            id: 'section-2',
            label: 'Section 2 Label',
            expanded: false,
            rows: [],
          },
        ],
      });
    });
  });

  it('should add a new row when "Add Row" button is clicked', async () => {
    const sectionToTest = { ...mockFormConfig.sections[0] };
    renderWithContext(sectionToTest);

    fireEvent.click(screen.getByRole('button', { name: 'Add Row' }));

    await waitFor(() => {
      expect(mockUpdateForm).toHaveBeenCalledTimes(1);
      expect(mockUpdateForm).toHaveBeenCalledWith({
        sections: [
          {
            id: 'section-1',
            label: 'Section 1 Label',
            expanded: true,
            rows: [
              [{ id: 'field-1', label: 'Field 1', type: 'text', size: 'md', required: true }],
              [], // Expecting a new empty row
            ],
          },
          {
            id: 'section-2',
            label: 'Section 2 Label',
            expanded: false,
            rows: [],
          },
        ],
      });
    });
  });

  it('should update section label when TextField value changes', async () => {
    const sectionToTest = mockFormConfig.sections[0];
    renderWithContext(sectionToTest);

    const labelTextField = screen.getByDisplayValue('Section 1 Label');
    fireEvent.change(labelTextField, { target: { value: 'New Section Label' } });

    await waitFor(() => {
      expect(mockUpdateForm).toHaveBeenCalledTimes(1);
      expect(mockUpdateForm).toHaveBeenCalledWith({
        sections: [
          {
            id: 'section-1',
            label: 'New Section Label', // Label should be updated
            expanded: true,
            rows: [[{ id: 'field-1', label: 'Field 1', type: 'text', size: 'md', required: true }]],
          },
          {
            id: 'section-2',
            label: 'Section 2 Label',
            expanded: false,
            rows: [],
          },
        ],
      });
    });
  });
});
