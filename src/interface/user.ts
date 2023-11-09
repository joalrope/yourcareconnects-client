interface IResetPassword {
  token: string;
  expires: number;
}

export interface IPictures {
  profile: string;
}

interface Ilocation {
  lat: number;
  lng: number;
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
  notifications?: number;
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
  ratings?: number;
  services?: string[];
  serviceModality?: string[];
  certificates?: string[];
  isLoggedIn?: boolean;
  token?: string;
}
