import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Magic Keyboard",
    short_name: "Magic Lite",
    description:
      "Tiện lợi mua sắm hàng triệu loại bàn phím, dịch vụ. Vô vàn ưu đãi freeship, mã giảm giá. Magic mang đến thứ bàn phím độc nhất cho bạn.",
    icons: [
      {
        src: "https://uploadthing.com/f/5b23808c-2839-49d0-9d7f-c0ea31a12888-aspnrn.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://uploadthing.com/f/5b23808c-2839-49d0-9d7f-c0ea31a12888-aspnrn.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#1A94FF",
    background_color: "#1A94FF",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    related_applications: [
      {
        platform: "play",
        url: "https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid",
        id: "vn.tiki.app.tikiandroid",
      },
      {
        platform: "itunes",
        url: "https://apps.apple.com/vn/app/tiki-shopping-fast-shipping/id958100553",
      },
      {
        platform: "webapp",
        url: "https://tiki.vn/manifest.json",
      },
    ],
    scope: "/",
  };
}
