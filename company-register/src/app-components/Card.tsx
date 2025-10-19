import {
  Card,
  CardAction,
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
           <img src={value.logo} alt="company-logo" className="h-7 w-7"/>
           <CardTitle>{value?.companyName}</CardTitle>
        </div>
        <CardDescription>{value.industry}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{value.location}</p>
      </CardContent>
      <CardFooter className="self-center sm:text-sm">
        <Button className="sm:text-sm">View more details</Button>
      </CardFooter>
    </Card>
  );
}
