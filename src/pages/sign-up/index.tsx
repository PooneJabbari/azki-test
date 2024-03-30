import { SignupForm } from "@/components/forms";
import { Layout } from "@/components/layout";
import { Input } from "@/components/ui";

export default function SignUpPage() {
  return (
    <Layout>
      <div className="px-6 md:px-12 lg:px-24">
        <SignupForm onSubmit={() => {}} />
      </div>
    </Layout>
  );
}
