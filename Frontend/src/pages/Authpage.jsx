import Signupform from "../components/Signup";
function Authpage({ children }) {
  return (
    <div className="flex w-full h-screen">
      <div className="md:w-1/2 md:block hidden bg-black"></div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="flex flex-col p-2 m-4 w-[400px]">
          <div className="font-bold font-sans text-purple-500 text-lg mx-auto">
            Campous Media
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Authpage;
