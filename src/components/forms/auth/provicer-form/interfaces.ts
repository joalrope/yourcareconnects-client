export interface IProvider {
  id: string;
  company: string;
  owner: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  faxNumber: string;
  webUrl: string;
  services: string[];
  certificates: string[];
  serviceModality: string;
}

export interface IModality {
  id: string;
  title: string | Element;
  value: string;
  tagColor?: string;
}
