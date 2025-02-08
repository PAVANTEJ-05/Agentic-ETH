import Card from "./card";
import Image from "next/image";
const Live = () => {
  return (
    <div className="pt-10 pb-4">
      <div>
        <h1 className=" flex bg-gradient-to-br from-[#FF5F6D] to-[#7D00FF] bg-clip-text text-transparent text-4xl font-bold pb-4">
          Live!!
        </h1>
      </div>
      <div className="flex justify-around">
        <div>
          <Image src="/assets/w1.jpg" alt="logo" width={360} height={250} />
          <Card title="Elon vs Trump" />
        </div>
        <div>
          <Image src="/assets/w1.jpg" alt="logo" width={360} height={250} />
          <Card title="Elon vs Trump" />
        </div>
        <div>
          <Image src="/assets/w1.jpg" alt="logo" width={360} height={250} />
          <Card title="Elon vs Trump" />
        </div>
      </div>
    </div>
  );
};
export default Live;
