import Card from "./card";
import Image from "next/image";

interface IndividualProps {
  label: string;
}
const Individual = ({ label }: IndividualProps) => {
  return (
    <div className="py-4">
      <h1 className="text-black text-4xl font-bold pb-4">{label}</h1>
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
export default Individual;
