import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser } from "../../../interface";

const id = sessionStorage.getItem("id");

console.log(id);

const isLoggedIn = id ? true : false;

const initialState: IUser = {
  address: "",
  balance: 0.1,
  biography: "",
  company: "",
  email: "",
  faxNumber: "",
  id: "",
  isLoggedIn,
  lastName: "",
  names: "",
  notifications: 0,
  owner: "",
  phoneNumber: "",
  pictures: { profile: "" },
  points: 0,
  role: "", // customer | provider | admin | superadmin
  services: [],
  serviceModality: [],
  token: "",
  webUrl: "",
  zipCode: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        address,
        balance,
        biography,
        company,
        email,
        faxNumber,
        id,
        lastName,
        names,
        notifications,
        owner,
        phoneNumber,
        pictures,
        points,
        role,
        services,
        serviceModality,
        token,
        webUrl,
        zipCode,
      } = action.payload;

      state.address = address;
      state.balance = balance;
      state.biography = biography;
      state.company = company;
      state.email = email;
      state.faxNumber = faxNumber;
      state.id = id;
      state.lastName = lastName;
      state.names = names;
      state.notifications = notifications;
      state.owner = owner;
      state.phoneNumber = phoneNumber;
      state.pictures = pictures;
      state.points = points;
      state.role = role;
      state.services = services;
      state.serviceModality = serviceModality;
      state.token = token;
      state.webUrl = webUrl;
      state.zipCode = zipCode;
    },
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setProfilePicture: (state, { payload }) => {
      state.pictures = payload;
    },
    logout: () => initialState,
    setClearUser: (state) => {
      state.address = "";
      state.balance = 0.1;
      state.biography = "";
      state.company = "";
      state.email = "";
      state.faxNumber = "";
      state.id = "";
      state.lastName = "";
      state.names = "";
      state.notifications = 0;
      state.owner = "";
      state.phoneNumber = "";
      state.pictures = { profile: "" };
      state.points = 0;
      state.role = "";
      state.services = [];
      state.serviceModality = [];
      state.webUrl = "";
      state.zipCode = "";
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export const {
  setUser,
  setLoggedIn,
  logout,
  setClearUser,
  setRole,
  setToken,
  setProfilePicture,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
