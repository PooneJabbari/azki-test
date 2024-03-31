import { SignUpForm } from "@/components/forms";
import { Layout } from "@/components/layout";
import { Title } from "@/components/ui";
import { useUser } from "@/context";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const { signUp } = useUser();
  const router = useRouter();

  return (
    <Layout>
      <div className="space-y-8 px-6 py-12 md:px-12 lg:px-24">
        <Title>ثبت نام</Title>
        <SignUpForm
          onSubmit={(data) => {
            signUp(data);
            router.replace("/insurance");
          }}
        />
      </div>
    </Layout>
  );
}
