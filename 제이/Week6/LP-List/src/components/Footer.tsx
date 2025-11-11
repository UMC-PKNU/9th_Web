import {Link} from "react-router-dom";

// 페이지 마무리 하는 부분 // # 은 클릭해도 이동 x
const Footer = ( ) => {
  return (
    <footer className="bg-black-100 dark:bg-black-900 py-6 mt-12">
      <div className = "conatiner mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()}Play List.All rights reserved
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link to={"#"}>Privacy Policy</Link>  
          <Link to={"#"}>Terms of Service</Link>
          <Link to={"#"}>Contact</Link>
        </div>
      </div>
    </footer>      
  )  
};

export default Footer;