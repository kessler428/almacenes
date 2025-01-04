export const GridItemsHeader = ({ styleTable ,params}) => {
  return (
    <div className={`pt-2 w-auto grid ${styleTable}`}>
      {
        params.map(({name, colSpan}) => (
          <div key={name} className={`hidden md:flex justify-center items-center ${colSpan}`}>
            <p className="uppercase font-semibold">
              {name}
            </p>
          </div>
        ))
      }
    </div>
  );
};
