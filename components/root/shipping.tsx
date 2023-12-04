"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { container, fadeIn } from "@/lib/motion";
const Shipping = () => {
  const { theme } = useTheme();
  const color = theme === "light" ? "black" : "white";

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="w-full items-center justify-center sm:px-28 px-2 sm:py-10 pt-10 "
    >
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 items-start sm:w-[384] w-full sm:h-full h-[300px]">
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 0.75)}
          className="w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 items-start pt-1 mr-5 gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="60"
            height="60"
            viewBox="0 0 360.000000 360.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,360.000000) scale(0.100000,-0.100000)"
              fill={color}
              stroke="none"
            >
              <path d="M770 2831 c-85 -26 -169 -99 -211 -181 -16 -32 -24 -68 -27 -127 l-4 -81 -109 -4 c-96 -3 -111 -5 -131 -25 -33 -33 -30 -89 6 -119 25 -22 36 -24 132 -24 l104 0 0 -225 0 -225 -95 0 c-109 0 -146 -13 -164 -58 -14 -32 -4 -67 26 -94 15 -14 42 -18 123 -20 l105 -3 5 -390 c5 -371 6 -392 26 -435 54 -114 161 -186 293 -197 54 -4 74 -10 78 -22 22 -68 69 -148 110 -189 73 -73 162 -113 265 -119 138 -9 247 34 338 133 39 42 100 153 100 182 0 9 62 12 275 12 213 0 275 -3 275 -12 0 -27 60 -138 97 -179 89 -99 204 -145 341 -136 177 11 314 124 375 308 4 12 24 18 77 22 128 11 228 76 287 189 l28 53 -1 275 c-2 852 -148 1303 -456 1410 -53 18 -91 22 -243 26 -175 5 -180 5 -186 27 -21 77 -97 166 -179 208 l-45 24 -795 2 c-437 1 -806 -2 -820 -6z m1612 -186 c15 -11 36 -36 47 -56 20 -35 21 -51 21 -432 0 -251 4 -415 11 -447 14 -65 75 -133 134 -149 25 -7 163 -11 377 -11 l337 0 7 -57 c4 -32 8 -179 8 -328 1 -270 1 -270 -23 -304 -29 -41 -91 -70 -149 -71 -32 0 -44 4 -48 18 -44 129 -123 224 -232 275 -62 30 -75 32 -172 32 -87 0 -115 -4 -163 -23 -105 -43 -215 -168 -242 -275 l-7 -27 -273 0 -273 0 -7 28 c-13 53 -57 128 -103 175 -92 95 -186 132 -322 125 -183 -9 -319 -119 -384 -312 -10 -30 -113 -19 -160 18 -66 50 -65 45 -66 453 l-1 368 146 5 c139 5 148 6 166 29 27 34 25 82 -7 112 -24 23 -33 24 -165 27 l-139 4 0 224 0 224 250 0 251 0 24 25 c37 36 34 86 -6 119 l-31 26 -244 0 -244 0 0 54 c0 30 4 65 9 78 11 28 58 77 86 89 11 4 367 7 790 6 753 -2 771 -2 797 -22z m619 -263 c92 -44 163 -142 214 -292 27 -79 60 -226 70 -312 l7 -58 -324 0 c-239 0 -327 3 -336 12 -14 14 -18 659 -4 672 4 5 79 6 167 4 141 -3 166 -6 206 -26z m-1552 -1456 c37 -20 87 -70 107 -108 22 -43 29 -129 14 -183 -16 -56 -81 -132 -135 -156 -63 -29 -151 -25 -216 9 -157 82 -181 294 -47 408 74 62 191 74 277 30z m1352 6 c66 -27 121 -96 139 -176 34 -152 -85 -296 -244 -296 -74 0 -127 23 -178 76 -136 142 -58 379 135 413 44 7 105 1 148 -17z" />
              <path d="M875 1485 c-31 -30 -32 -73 -4 -109 l20 -26 180 0 c99 0 188 4 198 10 31 16 46 65 31 100 -7 17 -21 35 -31 40 -10 6 -97 10 -194 10 -173 0 -176 0 -200 -25z" />
              <path d="M49 2111 c-38 -38 -38 -74 0 -112 l29 -29 142 0 c173 0 209 15 209 85 0 70 -36 85 -209 85 l-142 0 -29 -29z" />
            </g>
          </svg>
          <div className="flex-1 text-left sm:text-left">
            <span className="mb-1.5 font-semibold">Standard Shipping</span>
            <div className=" text-[#666666] text-sm">
              <p>Free for most countries/areas. See our Shipping Policy.</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("right", "spring", 0.5, 0.75)}
          className="w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 items-start pt-1 mr-5 gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="60"
            height="60"
            viewBox="0 0 360.000000 360.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,360.000000) scale(0.100000,-0.100000)"
              fill={color}
              stroke="none"
            >
              <path d="M1599 3305 c-246 -34 -490 -130 -676 -267 l-53 -39 0 66 c0 84 -19 132 -57 142 -39 10 -64 5 -91 -20 -21 -20 -22 -26 -22 -217 0 -251 -17 -231 219 -265 95 -14 181 -25 191 -25 11 0 31 11 46 24 21 18 28 32 28 61 0 56 -34 81 -123 90 -39 4 -73 10 -75 14 -6 10 117 90 214 139 96 48 225 92 350 119 119 25 382 24 500 -1 293 -63 505 -177 705 -380 200 -202 310 -409 372 -696 13 -63 18 -128 17 -250 0 -193 -15 -284 -75 -455 -42 -119 -43 -149 -9 -180 24 -22 86 -22 110 0 26 24 75 152 105 277 102 420 20 855 -228 1223 -80 117 -265 302 -383 382 -321 218 -695 308 -1065 258z" />
              <path d="M1720 2883 c-46 -17 -889 -509 -907 -530 l-23 -24 0 -529 0 -529 23 -24 c12 -14 220 -139 462 -278 319 -184 448 -253 470 -252 20 0 172 82 475 258 245 141 451 264 458 273 17 23 17 1080 -1 1103 -15 20 -893 528 -922 534 -11 2 -27 1 -35 -2z m379 -383 c187 -107 336 -198 333 -202 -4 -3 -57 -35 -119 -71 l-112 -65 -346 200 c-234 135 -343 204 -336 211 20 20 216 127 228 125 7 -2 166 -91 352 -198z m-404 -240 c165 -95 308 -178 318 -185 15 -11 1 -22 -120 -91 -76 -44 -141 -80 -145 -82 -8 -4 -697 390 -698 398 0 3 64 43 142 88 l142 81 30 -18 c17 -10 166 -96 331 -191z m-383 -309 l343 -198 3 -402 c1 -220 -1 -401 -4 -401 -4 0 -162 89 -350 198 l-344 197 0 403 c0 221 2 402 4 402 2 0 159 -89 348 -199z m1216 -203 l-3 -401 -344 -199 c-189 -109 -345 -198 -347 -198 -2 0 -4 181 -4 403 l0 402 343 197 c188 109 345 198 350 198 4 0 6 -181 5 -402z" />
              <path d="M1115 1868 c-28 -33 -29 -74 -4 -104 21 -26 239 -144 264 -144 55 0 94 76 65 130 -15 28 -234 150 -269 150 -21 0 -37 -9 -56 -32z" />
              <path d="M522 2612 c-15 -16 -51 -76 -79 -134 -165 -332 -204 -693 -113 -1053 179 -714 870 -1205 1598 -1137 205 19 428 85 582 170 134 74 270 174 350 256 24 25 47 46 51 46 4 0 13 -34 20 -75 10 -64 16 -79 42 -101 45 -38 107 -22 128 33 9 24 -44 360 -62 395 -18 34 -46 38 -237 38 l-190 0 -27 -32 c-21 -25 -25 -38 -21 -62 11 -56 36 -70 133 -76 l86 -5 -75 -70 c-177 -166 -394 -275 -658 -331 -119 -25 -382 -26 -500 -1 -290 62 -497 173 -700 377 -161 161 -255 308 -324 508 -56 163 -70 253 -70 447 1 250 37 399 152 624 67 133 71 153 30 191 -33 30 -84 27 -116 -8z" />
            </g>
          </svg>
          <div className="flex-1 text-left sm:text-left">
            <span className="mb-1.5 font-semibold">7-Day Return Policy</span>
            <div className=" text-[#666666] text-sm">
              <p>For New & Sealed Products. Check our Return Policy.</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("right", "spring", 0.8, 0.75)}
          className="w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 items-start pt-1 mr-5 gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="60"
            height="60"
            viewBox="0 0 360.000000 360.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,360.000000) scale(0.100000,-0.100000)"
              fill={color}
              stroke="none"
            >
              <path d="M1695 3332 c-348 -224 -697 -403 -954 -492 -105 -36 -139 -52 -155 -74 -21 -27 -21 -38 -24 -672 l-2 -644 39 -77 c88 -175 241 -383 410 -557 198 -203 410 -360 637 -472 145 -71 157 -71 306 5 221 112 391 235 582 420 192 189 352 397 452 591 l39 75 3 628 c2 420 -1 641 -8 668 -13 49 -31 60 -152 99 -246 78 -624 269 -943 475 -118 76 -148 80 -230 27z m262 -300 c314 -188 609 -334 801 -396 l52 -18 0 -567 0 -568 -49 -81 c-176 -293 -417 -548 -690 -731 -129 -86 -258 -154 -282 -148 -35 9 -229 124 -321 190 -240 172 -473 426 -628 686 l-50 85 0 566 0 566 68 24 c192 66 503 222 782 391 80 48 151 88 157 88 7 1 79 -39 160 -87z" />
              <path d="M2210 2184 c-8 -4 -128 -119 -267 -257 l-252 -251 -145 142 c-132 131 -147 142 -180 142 -53 0 -95 -25 -112 -67 -28 -65 -16 -83 175 -276 97 -98 188 -185 203 -193 15 -8 44 -14 65 -14 36 0 50 13 340 302 319 318 337 341 313 398 -23 56 -91 92 -140 74z" />
            </g>
          </svg>
          <div className="flex-1 text-left sm:text-left">
            <span className="mb-1.5 font-semibold">12 Month Warranty</span>
            <div className=" text-[#666666] text-sm">
              <p>For Keyboards & DIY Kits. Check our Warranty Policy.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Shipping;
