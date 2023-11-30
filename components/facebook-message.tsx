"use client";
import { FacebookProvider, CustomChat } from "react-facebook";

const FacebookMessage = () => {
  return (
    <FacebookProvider appId="1432258124036626" chatSupport>
      <CustomChat pageId="187437071115370" minimized={false} />
    </FacebookProvider>
  );
};

export default FacebookMessage;
