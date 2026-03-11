const departments = Array.from({ length: 12 }, (_, d) => ({
  name: `Departamento`,
  cats: Array.from({ length: 3 }, (_, c) => ({
    name: `Categoria`,
    subcats: Array.from({ length: 8 }, (_, s) => ({
      name: `Categoria`
    }))
  }))
}));

const firstDepartamens = departments.slice(0, 8);

console.log(firstDepartamens);
