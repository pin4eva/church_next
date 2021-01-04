import cookie from "js-cookie";
import router from "next/router";

export const branches = [
  {
    pastor: {
      name: "Pastor Whyte Eta",
      image: "whyte.png",
    },
    address: "1 Ijeoma plaza, Rumukwurushi, Port Harcourt, Rivers State",
    name: "Rumukwurushi Branch",
  },
  {
    pastor: {
      name: "Evang. Osazuwa Obasuyi",
      image: "OZ-2.png",
    },
    address: "1 Ijeoma plaza, Eneka, Port Harcourt, Rivers State",
    name: "Eneka Branch",
  },
  {
    pastor: {
      name: "Pastor Thompson E",
      image: "Thompson.png",
    },
    address: "1 Ijeoma plaza, Rumuodumaya, Port Harcourt, Rivers State",
    name: "Rumuodumaya Branch",
  },
];

// export const branches = [
//   {
//     name: "Rumuokwurushi",
//     address: "1 Ijeoma plaza, Rumuokwurushi Port Harcourt, Rivers State",
//     phone: "07062275085",
//     pastor: {
//       name: "Pst. Whyte Eta",
//       image: `whyte.jpg`,
//     },
//   },
//   {
//     name: "Eneka Branch",
//     address: "20 Eneka Road, Eneka Port Harcourt, Rivers State",
//     phone: "07062275085",
//     pastor: {
//       name: "Evang. OZ",
//       image: "/OZ-2.jpg",
//     },
//   },
//   {
//     name: "Rumuodumaya Branch",
//     address: "20 Eneka Road, Eneka Port Harcourt, Rivers State",
//     phone: "07062275085",
//     pastor: {
//       name: "Pst. Thompson Egeonu",
//       image: "/Thompson.jpg",
//     },
//   },
// ];

export const preachers = [
  "Apostle Edirhin Eta",
  "Pastor Roselin Eta",
  "Pastor Whyte Eta",
  "Evang. OZ ",
  "Pastor Thompson",
  "Pastor Ebiere Berediugo",
  "Pastor Peter Akaliro",
  "Others",
];

export const navList = [
  { name: "Home", link: "/" },
  { name: "Sermons", link: "/sermons" },
  { name: "Locations", link: "/branches" },
  // { name: "Give", link: "/" },
];

export const roles = ["User", "Admin", "Media", "Pastor", "Cell Pastor"];
export const jscookie = {
  getToken: () => cookie.get("token"),
  set: (name, token) => cookie.set(name, token),
  removeToken: () => {
    cookie.remove("token");
    router.push("/auth");
  },
};
