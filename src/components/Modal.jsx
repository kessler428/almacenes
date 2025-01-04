export const Modal = ({children, setModal}) => {
    return (
    <div
      onClick={() => setModal(false)}
      className="fixed inset-0 bg-gray-400 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="mx-auto w-5/6 shadow-lg bg-gray-200 border-t-4 border-principal">
            {children}
        </div>
      </div>
    </div>
  );
};
