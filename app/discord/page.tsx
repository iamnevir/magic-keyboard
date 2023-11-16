import {
  ExampleContent,
  FuzzyOverlay,
} from "@/components/discord/main-discord";

const DiscordPage = () => {
  return (
    <div className="relative overflow-hidden">
      <ExampleContent />
      <FuzzyOverlay />
    </div>
  );
};

export default DiscordPage;
