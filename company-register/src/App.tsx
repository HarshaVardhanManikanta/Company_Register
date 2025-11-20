import "./App.css";
import { useEffect, useState, useMemo } from "react";
import Header from "./app-components/Header";
import CompanyCard from "./app-components/Card";
import { Spinner } from "./components/ui/spinner";
import type { Company } from "./app-components/Card";
import { useSearch } from "@/context/SearchContext";
import FilterModal from "./app-components/FilterModal";
import { useFilters } from "@/context/FilterContext";

function App() {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const { searchTerm } = useSearch();

  const { filters } = useFilters();

  useEffect(() => {
    const getCompanyData = async () => {
      const response = await fetch("/db.json");
      const result = await response.json();
      setCompanyData(result.companies);
      setLoading(false);
    };
    getCompanyData();
  }, []);

  const filteredCompanies = useMemo(() => {
  let data = [...companyData];

  // Search term filter (existing)
  if (searchTerm) {
    data = data.filter((c) =>
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Location filter
  if (filters.locations.length > 0) {
    data = data.filter((c) => filters.locations.includes(c.location));
  }

  // Industry filter
  if (filters.industries.length > 0) {
    data = data.filter((c) => filters.industries.includes(c.industry));
  }

  // Category filter
  if (filters.category) {
    data = data.filter((c) => c.category === filters.category);
  }

  // Sort
  data.sort((a, b) =>
    filters.sortOrder === "A-Z"
      ? a.companyName.localeCompare(b.companyName)
      : b.companyName.localeCompare(a.companyName)
  );

  return data;
}, [companyData, filters, searchTerm]);

  return (
    <>
      <Header />
      <main className="mt-[10%] max-sm:mt-[16%] mb-[10em]">
        <div className="flex items-center justify-between px-[3em] py-2">
          <h3 className="text-[1.75vw] max-sm:text-[4vw]">Company Details</h3>
          <FilterModal/>
        </div>

        {loading ? (
          <Spinner className="size-15 m-auto relative top-[150px] text-gray-600" />
        ) : (
          filteredCompanies.length>0 ? <div className="grid grid-cols-4 mx-2 max-sm:grid-cols-1 max-sm:m-auto max-md:grid-cols-2 max-sm:place-items-center">
            {filteredCompanies.map((item) => (
              <CompanyCard key={item.id} value={item} />
            ))
            }
          </div> : <div className="flex m-auto relative top-[150px] items-center justify-center bg-red-200 p-2"><p className="m-auto text-[1vw] text-gray-700 max-sm:text-[2.5vw]">No Results Available</p></div>
        )}
      </main>
    </>
  );
}

export default App;

