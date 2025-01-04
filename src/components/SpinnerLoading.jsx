export const SpinnerLoading = () => {
  return (
    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50">
      <div className="border-t-transparent w-16 h-16 border-4 border-[#3b9fae] border-solid rounded-full animate-spin"></div>
    </div>
  );
};
