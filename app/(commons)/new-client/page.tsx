import NewClientForm from "@/app/components/NewClientForm";

export default async function NewClientPage() {
  return (
    <section className="mt-5">
      <h1 className="text-2xl text-gray-800 font-light">New Client</h1>
      <NewClientForm />
    </section>
  )
}