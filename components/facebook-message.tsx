"use client";
import { useTheme } from "next-themes";
import { FacebookProvider, CustomChat } from "react-facebook";

const FacebookMessage = () => {
  const { theme } = useTheme();
  return (
    <FacebookProvider appId="1432258124036626" chatSupport>
      <CustomChat
        themeColor={theme === "dark" ? "dark" : "white"}
        pageId="187437071115370"
        minimized={false}
      />
    </FacebookProvider>
  );
};

export default FacebookMessage;
