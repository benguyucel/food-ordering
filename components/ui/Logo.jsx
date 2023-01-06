import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <div className="text-[2rem] font-dancing font-bold">
      <Link href={`/`}>Feane</Link>
    </div>
  );
}

export default Logo;
