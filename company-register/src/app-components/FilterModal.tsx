import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useFilters } from "@/context/FilterContext";
import { Filter } from "lucide-react";

const availableLocations = [
  "San Francisco, USA",
  "London, UK",
  "Berlin, Germany",
  "Toronto, Canada",
  "Bangalore, India",
  "New York, USA",
  "Sydney, Australia",
  "Cape Town, South Africa",
  "Chicago, USA",
  "Vancouver, Canada",
  "Warsaw, Poland",
  "Melbourne, Australia",
  "Dubai, UAE",
];

const availableIndustries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
];
const availableCategories = ["product", "service", "startup"];

export default function FilterModal() {
  const { filters, setFilters } = useFilters();
  const [open, setOpen] = useState(false);

  const [tempFilters, setTempFilters] = useState(filters);

  const handleApply = () => {
    setFilters(tempFilters);
    setOpen(false);
  };

  const toggleCheckbox = (list: string[], value: string): string[] => {
    return list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center justify-center gap-2 h-[auto] w-[auto] text-[1vw] p-[0.5vw] bg-gray-700 text-white">
            <Filter className="w-[1vw] h-[1vw] max-sm:w-[2vw] h-[2vw]" />
            <p className="text-[1vw] max-sm:text-[2vw]">Filter Companies</p>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-lg h-100 text-gray-700 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[1.5vw] max-sm:text-[4vw]">Filter Options</DialogTitle>
          </DialogHeader>

          {/* Sort Companies */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-[1vw] max-sm:text-[4vw]">Sort Companies</h4>
            <RadioGroup
              value={tempFilters.sortOrder}
              onValueChange={(val) =>
                setTempFilters({
                  ...tempFilters,
                  sortOrder: val as "A-Z" | "Z-A",
                })
              }
              className="space-y-2"
            >
              <div className="flex items-center">
                <RadioGroupItem value="A-Z" id="az" className="border-1 border-black relative left-[-4px] max-sm:relative max-sm:left-[-5px] max-sm:top-[-2px]" />
                <Label htmlFor="az" className="text-[1vw] max-sm:text-[3vw]">A–Z (Default)</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem
                  value="Z-A"
                  id="za"
                  className="border-1 border-black p-1 relative top-[-4px] left-[-9px] max-sm:relative max-sm:left-[-9px] max-sm:top-[-6px]"
                />
                <Label htmlFor="za" className="text-[1vw] max-sm:text-[3vw]">Z–A</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Location Filter */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-[1vw] max-sm:text-[4vw]">Location</h4>
            <div className="grid grid-cols-2 gap-2">
              {availableLocations.map((loc) => (
                <div key={loc} className="flex items-center space-x-2">
                  <Checkbox
                    id={loc}
                    checked={tempFilters.locations.includes(loc)}
                    onCheckedChange={() =>
                      setTempFilters({
                        ...tempFilters,
                        locations: toggleCheckbox(tempFilters.locations, loc),
                      })
                    }
                  />
                  <Label htmlFor={loc} className="text-[1vw] max-sm:text-[3vw]">{loc}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Filter */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-[1vw] max-sm:text-[4vw]">Industry</h4>
            <div className="grid grid-cols-2 gap-2">
              {availableIndustries.map((ind) => (
                <div key={ind} className="flex items-center space-x-2">
                  <Checkbox
                    id={ind}
                    checked={tempFilters.industries.includes(ind)}
                    onCheckedChange={() =>
                      setTempFilters({
                        ...tempFilters,
                        industries: toggleCheckbox(tempFilters.industries, ind),
                      })
                    }
                  />
                  <Label htmlFor={ind} className="text-[1vw] max-sm:text-[3vw]">{ind}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-[1vw] max-sm:text-[4vw]">Category</h4>
            <RadioGroup
              value={tempFilters.category || ""}
              onValueChange={(val) =>
                setTempFilters({ ...tempFilters, category: val })
              }
            >
              {availableCategories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <RadioGroupItem value={cat} id={cat} />
                  <Label htmlFor={cat} className="text-[1vw] max-sm:text-[3vw]">{cat}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <Button className="h-[auto] w-[auto] text-[1vw] p-[0.75vw] bg-gray-200 text-black max-sm:text-[2vw]" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="h-[auto] w-[auto] text-[1vw] p-[0.5vw] bg-[#783594] text-white max-sm:text-[2vw]" onClick={handleApply}>Apply Filters</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
