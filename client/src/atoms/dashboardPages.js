import { atom } from "recoil";

export const DasboardPagesAtom = atom({
  key: "DashboardPagesAtom",
  default: {
    main: "Dashboard",
    sub: "/",
  },
});
