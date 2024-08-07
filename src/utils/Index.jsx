import { GoHeart, GoHome, GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";

export const sidebarItems = [
  {
    _id: 1,
    title: import.meta.env.VITE_FRONTEND_URL,
    icon: <GoHome />,
  },
  {
    _id: 2,
    title: "search",
    icon: <GoSearch />,
  },
  {
    _id: 3,
    title: "activity",
    icon: <GoHeart />,
  },
  {
    _id: 4,
    title: `profile`,
    icon: <FaRegUser />,
  },
];

export const profileRoutes = [
  {
    _id: 1,
    title: "Tweets",
    path: "",
  },
  {
    _id: 2,
    title: "Replies",
    path: "replies",
  },
  {
    _id: 3,
    title: "Reposts",
    path: "reposts",
  },
];

export const homeRoutes = [
  {
    _id: 1,
    title: "For you",
    path: "",
  },
  {
    _id: 2,
    title: "Follwing",
    path: "following",
  },
  {
    _id: 3,
    title: "Liked",
    path: "liked",
  },
  {
    _id: 1,
    title: "Saved",
    path: "saved",
  },
];

export const activityRoutes = [
  {
    _id: 1,
    title: "All",
    path: "activity",
  },
  {
    _id: 3,
    title: "Likes",
    path: "likes",
  },
  {
    _id: 3,
    title: "Replies",
    path: "replies",
  },
  {
    _id: 4,
    title: "Reposts",
    path: "reposts",
  },
  {
    _id: 5,
    title: "Follows",
    path: "follows",
  },
];
