import { Schema } from "mongoose";

interface IResetPassword {
  token: string;
  expires: number;
}

export interface IPictures {
  profile: { name: string; image: string; type: string };
}

interface Ilocation {
  type: "Point";
  coordinates: [number, number];
}

interface IRatings {
  value: number;
  count: number;
}

export interface IUser {
  id?: string | undefined;
  names?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  biography?: string;
  balance?: number;
  points?: number;
  role?: string;
  isDeleted?: boolean;
  notifications?: Schema.Types.Mixed;
  address?: string;
  location: Ilocation;
  resetPassword?: IResetPassword;
  zipCode?: string;
  faxNumber?: string;
  pictures?: IPictures;
  company?: string;
  contacts?: string[];
  owner?: string;
  webUrl?: string;
  ratings?: IRatings;
  services?: string[];
  serviceModality?: string[];
  certificates?: string[];
  isLoggedIn?: boolean;
  token?: string;
}
