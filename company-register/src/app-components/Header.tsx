import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/context/SearchContext";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Header() {
  const { setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearchTerm(inputValue.trim());
  };
  return (
    <header className="bg-white border-b border-gray-300 flex items-center justify-between p-4 w-full ">
      <h3 className="text-[2em] text-[#783594] font-bold">OrgRegister</h3>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            className="pl-10 pr-4 py-2 w-[250px] text-gray-800 border border-gray-300 focus-visible:ring-[#783594] rounded-md"
            type="text"
            placeholder="Enter company name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button variant="default" type="button" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </header>
  );
}
