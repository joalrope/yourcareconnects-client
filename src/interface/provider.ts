import { ILocation } from "../components/ui-components/map/GetLocationMap";

export interface IPictures {
  profile: { name: string; image: string; type: string };
}

export interface IProvider {
  id?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  location?: ILocation;
  role?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  isAllowedViewData?: boolean;
  pictures?: { profile: { name: string; image: string; type: string } };
  ratings: { value: number; count: number };
  services?: string[];
}
