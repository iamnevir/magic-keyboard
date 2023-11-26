import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
type imageType = {
  src?: string;
  width?: number;
  height?: number;
}[];
export default function ProductImageGallery({
  index,
  images,
}: {
  index: number;
  images?: string[];
}) {
  const width = window.screen.width;
  const height = window.screen.height;
  const imagesUrl: imageType = images?.map((item) => ({
    src: item,
    width,
    height,
  }))!;

  const lightbox = new PhotoSwipeLightbox({
    dataSource: [...imagesUrl],
    gallery: "#gallery--cropped-thumbs",
    children: "a",
    initialZoomLevel: "fit",
    zoom: false,
    close: false,
    counter: false,
    arrowNext: false,
    arrowPrev: false,
    secondaryZoomLevel: 1.5,
    maxZoomLevel: 1,

    pswpModule: () => import("photoswipe"),
  });
  lightbox.on("uiRegister", function () {
    lightbox.pswp?.ui?.registerElement({
      name: "TopBar",
      className:
        " flex items-center absolute bottom-5 sm:left-[45dvw] right-[25dvw] gap-5",
      appendTo: "wrapper",
      onInit: (el, pswp) => {
        const bullets: any = [];
        let left;
        let right;
        let close;
        left = document.createElement("div");
        left.innerHTML =
          '<svg class="w-4 h-4 duration-300 text-black group-hover/left:text-white" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z"></path></svg>';
        left.className =
          "rounded-full h-12 w-12 bg-white group/left flex justify-center items-center hover:bg-blue-500 duration-300 cursor-pointer hover:scale-110";
        left.onclick = (e) => {
          pswp.prev();
        };
        el.appendChild(left);
        bullets.push(left);
        close = document.createElement("div");
        close.innerHTML =
          '<svg class="w-5 h-5 duration-300 text-black group-hover/close:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        close.className =
          "rounded-full h-12 w-12 group/close bg-white flex justify-center items-center hover:bg-blue-500 duration-300 cursor-pointer] hover:scale-110 ";
        close.onclick = (e) => {
          pswp.close();
        };
        el.appendChild(close);
        bullets.push(close);
        right = document.createElement("div");
        right.innerHTML =
          '<svg class="w-4 h-4 duration-300 text-black group-hover/right:text-white" fill="currentColor"   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>';

        right.className =
          "rounded-full h-12 w-12 group/right bg-white flex justify-center items-center hover:bg-blue-500 duration-300 cursor-pointer hover:scale-110 ";
        right.onclick = (e) => {
          pswp.next();
        };
        el.appendChild(right);
        bullets.push(right);
      },
    });
  });
  lightbox.init();
  return () => lightbox.loadAndOpen(index);
}
