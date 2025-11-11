import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
    
      <header className="w-full bg-black text-white flex justify-between items-center px-8 py-4">
        <h1 className="text-pink-500 font-bold text-xl">
          <Link to="/">홈페이지</Link>
        </h1>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-1 border border-white rounded hover:bg-white hover:text-black transition"
          >
            로그인 페이지
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1 bg-pink-600 rounded hover:bg-pink-700 transition"
          >
            회원가입 페이지
          </Link>
        </div>
      </header>

     
      <main className="flex-1 flex justify-center items-center">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;