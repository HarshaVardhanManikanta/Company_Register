import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type Company = {
  id: number;
  companyName: string;
  location: string;
  companySize: string;
  category: string;
  industry: string;
  establishedYear: number;
  logo: string;
};

type CardProps = {
    value : Company
}
export default function CompanyCard({value}:CardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
           <img src={value.logo} alt="company-logo" className="h-[2vw] w-[2vw]"/>
           <CardTitle className="text-[1.5vw]">{value?.companyName}</CardTitle>
        </div>
        <CardDescription className="text-[1vw]">{value.industry}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[1.15vw]">{value.location}</p>
      </CardContent>
      <CardFooter className="self-center">
        <button className="h-[auto] w-[auto] text-[1vw] max-sm:text-[0.5vw] p-[0.5vw] bg-[#783594] text-white">View more details</button>
      </CardFooter>
    </Card>
  );
}
