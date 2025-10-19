import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Checkbox,
} from "@/components/ui/checkbox";
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
];

const availableIndustries = ["Technology", "Finance", "Healthcare", "Education"];
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
        <Button className="bg-gray-600 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter Companies
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg h-100 text-gray-700 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>

        {/* Sort Companies */}
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Sort Companies</h4>
          <RadioGroup
            value={tempFilters.sortOrder}
            onValueChange={(val) =>
              setTempFilters({ ...tempFilters, sortOrder: val as "A-Z" | "Z-A" })
            }
            className="space-y-2"
          >
            <div className="flex items-center">
              <RadioGroupItem value="A-Z" id="az" className="border-1"/>
              <Label htmlFor="az">A–Z (Default)</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="Z-A" id="za" className="border-1 border-black p-1"/>
              <Label htmlFor="za">Z–A</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Location Filter */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Location</h4>
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
                <Label htmlFor={loc}>{loc}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Filter */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Industry</h4>
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
                <Label htmlFor={ind}>{ind}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Category</h4>
          <RadioGroup
            value={tempFilters.category || ""}
            onValueChange={(val) =>
              setTempFilters({ ...tempFilters, category: val })
            }
            className="space-y-2"
          >
            {availableCategories.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <RadioGroupItem value={cat} id={cat} />
                <Label htmlFor={cat}>{cat}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  );
}
