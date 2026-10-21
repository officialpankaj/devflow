const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  COMMUNITY: "/community",
  COLLECTION: "/collection",
  JOBS: "/jobs",
  TAGS: "/tags",
  TAG_DETAIL: (id: string) => `/tags/${id}`,
  QUESTION_DETAIL: (id: string) => `/question/${id}`,
  PROFILE: "/profile",
  PROFILE_DETAIL: (id: string) => `/profile/${id}`,
  ASK_QUESTION: "/ask-a-question",
};

export default ROUTES;
