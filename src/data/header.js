export const departments = Array.from({ length: 12 }, (_, d) => ({
  name: `Departamento ${d + 1}`,
  url: "#",
  cats: Array.from({ length: 3 }, (_, c) => ({
    name: `Cat (dep ${d + 1})`,
    url: "#",
    subcats: Array.from({ length: 7 }, (_, s) => ({
      name: `Subcat (cat ${c + 1} - dep ${d + 1})`,
      url: "#",
    })),
  })),
}));