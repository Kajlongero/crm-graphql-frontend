import { cookies } from "next/headers";
import { customClientWithHeaders } from "@/config/apollo-ssr";
import { Client } from "@/app/interfaces/client-interface";
import { GET_CLIENT_BY_ID } from "@/app/querys/clients-query";
import EditClientForm from "@/app/components/EditClientForm";

type Ctx = {
  params: {
    id: string;
  }
}

export default async function EditClient({ params }: Ctx) {
  const id: string = params.id;

  const authToken = cookies().get('token')?.value;

  const { data } = await customClientWithHeaders({ authorization: authToken as string }).query({
    query: GET_CLIENT_BY_ID,
    variables: {
      id: `${id as string}`,
    }
  });

  return (
    <section className="mt-5">
      <h1 className="text-2xl text-gray-800 font-light">Edit <strong>ClientID: {id}</strong></h1>
      <EditClientForm {...data.getClientById as Client} />
    </section>
  )

}