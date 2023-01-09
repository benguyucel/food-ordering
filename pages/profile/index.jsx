import Image from "next/image";
import { useRouter } from "next/router";

import { useState } from "react";
import Account from "../../components/profile/Account";
import Password from "../../components/profile/Password";
import Order from "../../components/profile/Order";
import { signOut, getSession } from "next-auth/react";
import axios from "axios";
const Profile = ({ userData }) => {
  const [tabs, setTabs] = useState(0);
  const { push } = useRouter();
  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      const data = await signOut({
        redirect: false,
        callbackUrl: "/auth/login",
      });
      push(data.url);
    }
  };
  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col">
      <div className="lg:w-80 w-100 flex-shrink-0">
        <div className="relative flex flex-col items-center gap-y-2 py-2 border border-b-0">
          <Image
            src="/images/client1.jpg"
            width={100}
            height={100}
            alt="profile"
            className="rounded-full"
          />
          <span className="font-semibold text-lg">{userData.fullName}</span>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1 ">Account</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Password</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 3 && "bg-primary text-white"
            }`}
            onClick={() => handleSignOut()}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Account user={userData} />}
      {tabs === 1 && <Password user={userData} />}
      {tabs === 2 && <Order />}
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}`
  );

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const { ...userData } = user.data;
  return {
    props: { userData },
  };
}
export default Profile;
