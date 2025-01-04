export const ModalForm = ({children}) => {
    return (
    <div
      className="fixed inset-0 bg-gray-400 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div className="flex justify-center items-center my-28">
        <div className="mx-auto w-3/4 md:w-3/5 shadow-lg bg-gray-200 border-t-4 border-principal">
          {children}
        </div>
      </div>
    </div>
  );
};
