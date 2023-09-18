import LoginForm from "@/app/components/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Login',
  description: 'CRM Login page',
}

export default function LoginPage() {
  return (
    <section className="w-full px-4">
      <h1 className="text-center text-2xl font-light">Login</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </section>
  )
}