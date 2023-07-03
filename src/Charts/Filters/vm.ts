import { useState } from "react";

export const filters = [
  { value: 60, label: '1 hour' },
  { value: 60 * 6, label: '6 hours' },
  { value: 60 * 12, label: '12 hours' },
  { value: 60 * 24, label: '1 day' },
  { value: 60 * 24 * 2, label: '2 days' },
  { value: 60 * 24 * 4, label: '4 days' },
  { value: 60 * 24 * 7, label: '7 days' },
  { value: 60 * 24 * 14, label: '14 days' },
  { value: 60 * 24 * 30, label: '30 days' },
]

export interface UseFilters {
  onChange: (value: number) => Promise<void>;
}

const useFilters = ({ onChange }: UseFilters) => {
  const [currentFilter, setCurrentFilter] = useState(filters[0].value);

  const handleChangeCurrentFilter = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => {
    setCurrentFilter(value);
    onChange(value);
  };

  return { currentFilter, handleChangeCurrentFilter }
};

export default useFilters;
