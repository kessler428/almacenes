export const obtenerNombreCompleto = (persona) => {
  return `${persona.nombre} ${persona.apellido1} ${persona.apellido2}`.trim();
}

export const debounce = (func, delay) => {
  let debounceTimer
  return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
  }
} 