export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone?: string;
  seller?: string;
}

export type ClientShorted = Omit<Client, 'lastName' | 'company' | 'email' | 'phone' | 'seller'>
