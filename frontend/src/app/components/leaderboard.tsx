const Leaderboard = () => {
  return (
    <div className="fixed top-16 left-0 w-72 h-full border-r-2 border-black bg-white p-4">
      <div>
        <h1 className=" flex text-black text-3xl font-semibold mb-4 justify-center">
          🏆 Leaderboard
        </h1>
      </div>
      <div className="overflow-y-auto">
        <ul className="space-y-2">
          <li className="text-black">Alice</li>
          <li className="text-black">Bob</li>
          <li className="text-black">Charlie</li>
          <li className="text-black">Denise</li>
          <li className="text-black">Eliza</li>
          <li className="text-black">Francis</li>
          <li className="text-black">Hans</li>
          <li className="text-black">Ivy</li>
          <li className="text-black">Jack</li>
          <li className="text-black">Karen</li>
          <li className="text-black">Leo</li>
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
