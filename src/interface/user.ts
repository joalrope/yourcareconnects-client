interface IResetPassword {
  token: string;
  expires: number;
}

interface IPictures {
  profile: string;
}

interface ILatLng {
  lat: number;
  lng: number;
}

export interface IUser {
  id?: string | undefined;
  names?: string;
  lastName?: string;
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
  latlng?: ILatLng;
  resetPassword?: IResetPassword;
  zipCode?: string;
  faxNumber?: string;
  pictures?: IPictures;
  company?: string;
  owner?: string;
  webUrl?: string;
  ratings?: number;
  services?: string[];
  serviceModality?: string[];
  certificates?: string[];
  isLoggedIn?: boolean;
  token?: string;
}
