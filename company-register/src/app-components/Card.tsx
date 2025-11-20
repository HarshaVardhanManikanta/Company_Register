import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="max-sm:w-[50%]">
      <CardHeader>
        <div className="flex items-center gap-2">
           <img src={value.logo} alt="company-logo" className="h-[2vw] w-[2vw] max-sm:h-[4vw] max-sm:w-[4vw]"/>
           <CardTitle className="text-[1.5vw] max-sm:text-[3vw]">{value?.companyName}</CardTitle>
        </div>
        <CardDescription className="text-[1vw] max-sm:text-[2vw]">{value.industry}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[1.15vw] max-sm:text-[2vw]">{value.location}</p>
      </CardContent>
    </Card>
  );
}
