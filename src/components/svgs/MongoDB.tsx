import type { SVGProps } from "react";

const MongoDBIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="#47A248"
      d="M17.193 9.555c-1.264-5.58-4.252-7.243-4.592-8.44-.338-1.068-.52-1.92-.52-1.92l-.004.002-.004-.002s-.182.852-.52 1.92c-.34 1.197-3.328 2.86-4.592 8.44C6.621 13.73 7.93 16.47 8.916 17.9c.166.242.413.425.685.528V24h2.796v-5.572c.272-.103.52-.286.685-.528.986-1.43 2.294-4.17 1.11-8.345z"
    />
  </svg>
);

export { MongoDBIcon };
