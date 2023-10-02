interface IResetPassword {
  token: string;
  expires: number;
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
  resetPassword?: IResetPassword;
  zipCode?: string;
  faxNumber?: string;
  pictures?: string[];
  company?: string;
  owner?: string;
  webUrl?: string;
  ratings?: number;
  services?: string[];
  serviceModality?: string[];
  certificates?: string[];
  isLoggedIn?: false;
  token?: string;
}
