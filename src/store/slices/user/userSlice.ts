import { createSlice } from "@reduxjs/toolkit";
import { Schema } from "mongoose";
import { RootState } from "../../store";
import { IUser } from "../../../interface";

const id = sessionStorage.getItem("id");

const isLoggedIn = id ? true : false;

const initialState: IUser = {
  address: "",
  balance: 0.1,
  biography: "",
  company: "",
  contacts: [],
  email: "",
  faxNumber: "",
  id: "",
  isLoggedIn,
  isAllowedViewData: false,
  lastName: "",
  location: {
    type: "Point",
    coordinates: [parseFloat(String("0.0")), parseFloat(String("0.0"))],
  },
  names: "",
  notifications: {} as Schema.Types.Mixed,
  owner: "",
  phoneNumber: "",
  pictures: { profile: { type: "", name: "", image: "" } },
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
        contacts,
        email,
        faxNumber,
        fullname,
        id,
        isAllowedViewData,
        lastName,
        location,
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
      state.contacts = contacts;
      state.email = email;
      state.faxNumber = faxNumber;
      state.fullname = fullname;
      state.id = id;
      state.isAllowedViewData = isAllowedViewData;
      state.lastName = lastName;
      state.location = location;
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
    setLocation: (state, { payload }) => {
      state.location = payload;
    },
    setNotifications: (state, { payload }) => {
      state.notifications = payload;
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
      state.contacts = [];
      state.email = "";
      state.faxNumber = "";
      state.id = "";
      state.isAllowedViewData = false;
      state.lastName = "";
      state.names = "";
      state.owner = "";
      state.phoneNumber = "";
      state.pictures = { profile: { type: "", name: "", image: "" } };
      state.points = 0;
      state.ratings = { value: 0, count: 0 };
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
  setLocation: setLatLng,
  setToken,
  setNotifications,
  setProfilePicture,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
