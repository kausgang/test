import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="navbar bg-base-100">
        <Link href={"/test"} className="btn btn-ghost text-xl">
          TestPage
        </Link>
      </div>
    </section>
  );
}
