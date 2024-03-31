import { Layout } from "@/components/layout";
import { Button, InsuranceIcon, Title } from "@/components/ui";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

type Insurance = {
  name: string;
  Icon: IconType;
} & (
  | {
      isDisabled: true;
    }
  | {
      isDisabled?: false | undefined;
      route: string;
    }
);

const insurances: Insurance[] = [
  { name: "شخص ثالث", Icon: InsuranceIcon, route: "./insurance/third-party" },
  { name: "بدنه", Icon: InsuranceIcon, isDisabled: true },
];

export default function InsurancePage() {
  const router = useRouter();
  return (
    <Layout>
      <div className="space-y-8 px-6 py-12 md:px-12 lg:px-24">
        <Title>انتخاب بیمه</Title>
        <div className="flex flex-row-reverse justify-evenly gap-x-5 sm:justify-normal">
          {insurances.map(({ name, Icon, isDisabled }) => (
            <Button
              key={name}
              disabled={isDisabled}
              color="base"
              className="aspect-square h-24"
              onClick={() => router.push("/insurance/third-party")}
            >
              <div key={name} className="flex flex-col items-center space-y-4">
                <Icon className="h-8 w-8" />
                <div className="text-nowrap text-sm">{name}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
