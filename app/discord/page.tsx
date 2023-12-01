import {
  ExampleContent,
  FuzzyOverlay,
} from "@/components/discord/main-discord";
import { webUrl } from "@/lib/utils";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Magic Keyboard - Discord",
  description: "Thứ ma thuật kì lạ mang đến trải nghiệm phím cơ số một.",
  openGraph: {
    siteName: "Magic Keyboard",
    url: `${webUrl}/discord`,
    title: `Magic Keyboard - Discord`,
    description: `Tham gia cộng đồng của chúng tôi để nhận những mẫu độc quyền.`,
    type: "website",
    images: [
      "https://utfs.io/f/bcefaed0-a127-4ef6-a2d7-efd68f918b82-66gxgs.png",
    ],
  },
};
const DiscordPage = () => {
  return (
    <div className="relative overflow-hidden">
      <ExampleContent />
      <FuzzyOverlay />
    </div>
  );
};

export default DiscordPage;
