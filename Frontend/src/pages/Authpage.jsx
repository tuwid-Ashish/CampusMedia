function Authpage({ children }) {
  return (
          <div className="w-full lg:grid lg:min-h-[600px]  xl:min-h-[500px]">
      <div className="flex items-center justify-center ">
        <div className="mx-auto grid w-[350px]">
          {children}

        </div>
        </div>
        </div>
  );
}

export default Authpage;
