import { SignUpForm } from "@/components/forms";
import { Layout } from "@/components/layout";
import { useUser } from "@/context";

export default function SignUpPage() {
  const { signUp } = useUser();
  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-24">
        <SignUpForm
          onSubmit={(data) => {
            signUp(data);
          }}
        />
      </div>
    </Layout>
  );
}
