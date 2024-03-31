import { getThirdDiscounts } from "@/api";
import { Layout } from "@/components/layout";
import { Button, Select, Title } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function InsureCompanyPage() {
  const [thirdPartyDiscount, setThirdPartyDiscount] = useState<number>();
  const [accidentDiscount, setAccidentDiscount] = useState<number>();

  const { data } = useQuery({
    queryKey: ["thirdDiscounts"],
    queryFn: getThirdDiscounts,
  });

  if (!data) {
    return null;
  }

  const discounts = data.map(({ title, id }) => ({ label: title, value: id }));

  return (
    <Layout>
      <div className="space-y-8 px-6 py-12 md:px-12 lg:px-24">
        <Title>بیمه شخص ثالث</Title>
        <span className="block text-right text-sm text-neutral-500">
          درصد تخفیف بیمه شخص ثالث و حوادث راننده را وارد کنید
        </span>
        <Select
          className="flex-1"
          title="درصد تخفیف ثالث"
          options={discounts}
          value={thirdPartyDiscount}
          onChange={setThirdPartyDiscount}
        />
        <Select
          className="flex-1"
          title="درصد تخفیف حوادث راننده"
          options={discounts}
          value={accidentDiscount}
          onChange={setAccidentDiscount}
        />
        <div className="flex flex-row justify-center sm:justify-normal">
          <Button
            variant="outlined"
            disabled={!thirdPartyDiscount || !accidentDiscount}
            onClick={() => {}}
          >
            استعلام قیمت
          </Button>
        </div>
      </div>
    </Layout>
  );
}
