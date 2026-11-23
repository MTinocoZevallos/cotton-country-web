// Supplemental navigation only: approved article bodies and existing related cards stay intact.
const destinations: Record<string, string[]> = {
  "una-breve-historia-del-algodon": ["que-significa-algodon-24-1-30-1"],
  "el-algodon-se-caso-con-el-poliester-en-oxford": ["que-significa-algodon-24-1-30-1", "por-que-destinen-los-uniformes"],
  "3-consejos-para-compradores-de-textiles-b2b": ["por-que-encogen-las-telas", "por-que-destinen-los-uniformes"],
  "como-definir-un-proyecto-de-uniformes-corporativos": ["por-que-encogen-las-telas", "por-que-destinen-los-uniformes"],
  "que-caracteristicas-deben-tener-los-uniformes-de-seguridad-industrial": ["ubicacion-cintas-reflectivas-uniformes"],
}

export function supplementaryReading(slug: string) {
  return destinations[slug] ?? []
}
