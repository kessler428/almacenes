export const Barra = ({pasos, pasoId, setPasoId}) => {
  return (
    <div
      className='bg-white flex flex-col md:flex-row space-x-4 mt-2 rounded-md px-2 pt-2'
    >
      {
        pasos.map(paso => (
          <button
            key={paso.id}
            className={`pt-2 md:pt-0 pb-2 ${ pasoId === paso.id && 'border-b-2  border-principal'}`}
            onClick={() => setPasoId(paso.id)}
          >
            <p>{paso.titulo}</p>
          </button>
        ))
      }
    </div>
  )
}