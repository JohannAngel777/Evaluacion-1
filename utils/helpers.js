// Busca un elemento dentro de un arreglo comparando su id
function buscarPorId(arreglo, id) {
  return arreglo.find(item => item.id === id);
}

// Hace disponible la funcion para otros archivos
module.exports = {
  buscarPorId
};