const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  COMMUNITY: "/community",
  COLLECTION: "/collection",
  JOBS: "/jobs",
  TAGS: "/tags",
  TAG_DETAIL: (id: string) => `/tags/${id}`,
  QUESTION_DETAIL: (id: string) => `/questions/${id}`,
  EDIT_QUESTION: (id: string) => `/questions/${id}/edit`,
  PROFILE: "/profile",
  PROFILE_DETAIL: (id: string) => `/profile/${id}`,
  EDIT_PROFILE: (id: string) => `/profile/${id}/edit`,
  ASK_QUESTION: "/ask-a-question",
  SIGN_IN_WITH_OAUTH: "signin-with-oauth",
};

export default ROUTES;
