import { createContext, useContext, useState, type ReactNode } from "react";

type SortOrder = "A-Z" | "Z-A";

export type FilterOptions = {
  sortOrder: SortOrder;
  locations: string[];
  industries: string[];
  category: string | null;
};

type FilterContextType = {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    sortOrder: "A-Z",
    locations: [],
    industries: [],
    category: null,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilters must be used within a FilterProvider");
  return context;
};
