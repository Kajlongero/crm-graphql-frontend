import { Metadata } from "next"
import RegisterForm from "@/app/components/RegisterForm";

export const metadata: Metadata = {
  title: 'Signup',
  description: 'CRM Signup page',
}

export default function SignupPage() {

  return (
    <section className="w-full px-4">
      <h1 className="text-center text-2xl font-light">Register</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </section>
  )
}