import { Link } from "react-router-dom";

const HomeModule = () => {
  return (
    <div className="h-screen flex place-items-center justify-center flex-col bg-gray-100">
      <Link to="/memory">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          MEMORY MATCHING
        </button>
      </Link>

      <Link to="/tictactoe">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          TIC TAC TOE
        </button>
      </Link>

      <Link to="/who-wants-get-reward">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          WHO WANTS GET REWARD
        </button>
      </Link>

      <Link to="/math">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          MATEMATIKA CEPAT
        </button>
      </Link>

      <Link to="/jankenpon">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          JANKENPON
        </button>
      </Link>

      <Link to="/hindari-warna">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          HINDARI WARNA
        </button>
      </Link>
    </div>
  );
};
export default HomeModule;
