import Image from "next/image";
import Title from "./ui/Title";
import { MdShoppingCart } from "react-icons/md";
const CampaingItem = () => {
  return (
    <div className="bg-secondary flex-1 rounded-md p-4  flex items-center gap-x-4">
      <div
        className="relative  sm:w-44 sm:h-44 w-36 h-36  after:w-full after:h-full 
      border-[0.313rem] border-primary rounded-full overflow-hidden"
      >
        <Image
          src="/images/o1.jpg"
          alt="campings"
          layout="fill"
          className="rounded-full object-cover hover:scale-125 transition-all duration-200"
        />
      </div>
      <div className="text-white">
        <Title addClass="text-2xl">Tasty Thursdays</Title>
        <div className="font-dancing my-1">
          <span className="text-[40px]">20%</span>
          <span className="text-sm inline-block ml-1">Off</span>
        </div>
        <button className="btn-primary flex items-center gap-x-2">
          Order Now <MdShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};
const Campaings = () => {
  return (
    <div className="flex justify-between container mx-auto py-20 gap-6 flex-wrap">
      <CampaingItem />
      <CampaingItem />
    </div>
  );
};

export default Campaings;
