import { VehicleType, getInsureCompanies, getVehicleTypes } from "@/api";
import { Layout } from "@/components/layout";
import { ArrowIcon, Button, Select, Title } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function InsureCompanyPage() {
  const [selectedCompany, setSelectedCompany] = useState<number>();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["insureCompanies"],
    queryFn: getInsureCompanies,
  });

  if (!data) {
    return null;
  }

  const companies = data.map(({ title, id }) => ({ label: title, value: id }));

  return (
    <Layout>
      <div className="space-y-8 px-6 py-12 md:px-12 lg:px-24">
        <Title>بیمه شخص ثالث</Title>
        <span className="block text-right text-sm text-neutral-500">
          شرکت بیمه‌گر قبلی خود را در این بخش وارد کنید
        </span>
        <Select
          className="flex-1"
          title="شرکت بیمه‌گر قبلی"
          options={companies}
          value={selectedCompany}
          onChange={setSelectedCompany}
        />
        <div className="flex flex-row-reverse justify-between text-xs sm:text-sm">
          <Button
            variant="outlined"
            className="relative text-nowrap"
            onClick={() => router.back()}
          >
            مرحله قبل <ArrowIcon className="absolute right-4 w-3 rotate-180" />
          </Button>
          <Button
            variant="outlined"
            className="relative"
            disabled={!selectedCompany}
            onClick={() => router.push("/insurance/third-party/insure-company")}
          >
            مرحله بعد
            <ArrowIcon className="absolute left-4 w-3 " />
          </Button>
        </div>
      </div>
    </Layout>
  );
}