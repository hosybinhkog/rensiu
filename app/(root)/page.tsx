import Image from "next/image";

import { UserButton } from "@clerk/nextjs";
export default function HomePage() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
