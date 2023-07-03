import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import useFilters, { UseFilters, filters } from "./vm";

interface FiltersProps extends UseFilters {

}

const Filters = ({ ...vmOptions }: FiltersProps) => {
  const { currentFilter, handleChangeCurrentFilter } = useFilters(vmOptions);

  return (
    <ToggleButtonGroup
      exclusive
      value={currentFilter}
      onChange={handleChangeCurrentFilter}
      aria-label="text alignment"
      style={{ alignSelf:"center" }}
    >
      {filters.map((filter) => (
        <ToggleButton value={filter.value} disabled={currentFilter === filter.value}>
          {filter.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Filters;