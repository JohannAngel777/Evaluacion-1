function buscarPorId(arreglo, id) {
  return arreglo.find(item => item.id === id);
}

module.exports = {
  buscarPorId
};