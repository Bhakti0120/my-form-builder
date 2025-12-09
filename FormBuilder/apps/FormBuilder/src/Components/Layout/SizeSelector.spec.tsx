import { render, screen, fireEvent } from '@testing-library/react';
import SizeSelector from './SizeSelector';
import { vi } from 'vitest';

describe('SizeSelector', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render successfully', () => {
    render(<SizeSelector size="md" onChange={mockOnChange} />);
    expect(screen.getByLabelText('Size')).toBeTruthy();
  });

  it('should display the initial size value', () => {
    render(<SizeSelector size="lg" onChange={mockOnChange} />);
    expect(screen.getByRole('combobox', { name: 'Size' }).textContent || '').toContain('Large');
  });

  it('should call onChange with the new size when a new option is selected', () => {
    render(<SizeSelector size="md" onChange={mockOnChange} />);

    const select = screen.getByLabelText('Size');
    fireEvent.mouseDown(select); // Open the select dropdown

    const largeOption = screen.getByRole('option', { name: 'Large' });
    fireEvent.click(largeOption); // Click on 'Large' option

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('lg');
  });
});
