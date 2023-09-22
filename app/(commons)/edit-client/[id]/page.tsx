import { gql } from "@apollo/client";
import { cookies } from "next/headers";
import { customClientWithHeaders } from "@/config/apollo-ssr";
import { redirect } from "next/navigation";
import { Client } from "@/app/interfaces/client-interface";
import EditClientForm from "@/app/components/EditClientForm";

type Ctx = {
  params: {
    id: string;
  }
}

const CLIENT_QUERY = gql`
query getClientById($id: ID!) {
  getClientById(id: $id) {
    id
    firstName
    lastName
    email
    phone
    company
    seller
  }
}
`;

export default async function EditClient({ params }: Ctx) {
  const id: string = params.id;

  const authToken = cookies().get('token')?.value;

  const { data } = await customClientWithHeaders({ authorization: authToken as string }).query({
    query: CLIENT_QUERY,
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