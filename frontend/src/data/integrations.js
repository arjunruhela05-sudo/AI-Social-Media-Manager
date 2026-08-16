import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
  FaDiscord,
  FaTelegram,
  FaSlack,
  FaGoogle,
} from "react-icons/fa";

import {
  SiX,
  SiTiktok,
  SiThreads,
} from "react-icons/si";

export const integrations = [
  {
    title: "Facebook",
    type: "Social",
    description: "Schedule and publish posts directly to Facebook pages.",
    icon: FaFacebook,
  },
  {
    title: "Instagram",
    type: "Social",
    description: "Publish Reels, Stories and Posts to Instagram.",
    icon: FaInstagram,
  },
  {
    title: "X (Twitter)",
    type: "Social",
    description: "Schedule tweets and threads with one click.",
    icon: SiX,
  },
  {
    title: "LinkedIn",
    type: "Social",
    description: "Publish professional content to LinkedIn.",
    icon: FaLinkedin,
  },
  {
    title: "Pinterest",
    type: "Social",
    description: "Schedule eye-catching pins.",
    icon: FaPinterest,
  },
  {
    title: "Threads",
    type: "Beta Access",
    description: "Connect your Threads audience.",
    icon: SiThreads,
  },
  {
    title: "TikTok",
    type: "Beta Access",
    description: "Publish TikTok videos.",
    icon: SiTiktok,
  },
  {
    title: "YouTube Shorts",
    type: "Beta Access",
    description: "Schedule YouTube Shorts.",
    icon: FaYoutube,
  },
  {
    title: "Discord",
    type: "Beta Access",
    description: "Manage Discord announcements.",
    icon: FaDiscord,
  },
  {
    title: "Telegram",
    type: "Beta Access",
    description: "Share content instantly.",
    icon: FaTelegram,
  },
  {
    title: "Slack",
    type: "Workspace",
    description: "Connect Slack channels and notifications.",
    icon: FaSlack,
  },
  {
    title: "Google Business",
    type: "Business",
    description: "Manage your Google Business profile.",
    icon: FaGoogle,
  },
];