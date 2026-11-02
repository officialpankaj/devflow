import ROUTES from "@/constants/routes";

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    label: "Home",
    route: ROUTES.HOME,
    authorize: false,
  },
  {
    imgURL: "/icons/users.svg",
    label: "Community",
    route: ROUTES.COMMUNITY,
    authorize: false,
  },
  {
    imgURL: "/icons/star.svg",
    label: "Collection",
    route: ROUTES.COLLECTION,
    authorize: true,
  },
  {
    imgURL: "/icons/suitcase.svg",
    label: "Find Jobs",
    route: ROUTES.JOBS,
    authorize: false,
  },
  {
    imgURL: "/icons/tag.svg",
    label: "Tags",
    route: ROUTES.TAGS,
    authorize: false,
  },
  {
    imgURL: "/icons/user.svg",
    label: "Profile",
    route: ROUTES.PROFILE,
    authorize: true,
  },
  {
    imgURL: "/icons/question.svg",
    label: "Ask a Question",
    route: ROUTES.ASK_QUESTION,
    authorize: false,
  },
];
