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

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
