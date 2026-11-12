// Single source for the approved 2027 family pages and the Uniformes catalog.
export type EditorialCategory = "camisas" | "blusas" | "pantalones-dama" | "pantalones-caballero" | "casacas" | "polos" | "chalecos"
export type GarmentModel = {
  number: string
  title: string
  image: string
  width: number
  height: number
  alt: string
  application: string
  description: string
  details?: readonly string[]
}

export const garmentModels: Record<EditorialCategory, readonly GarmentModel[]> = {
  "camisas": [
    {
      "number": "01",
      "title": "Camisa de vestir, cuello italiano",
      "image": "/uniformes/camisas-2027/01_camisa_vestir_italiano.webp",
      "width": 1199,
      "height": 1312,
      "alt": "Modelo con camisa gris muy claro, cuello italiano y corbata, pechera doblada y sin bolsillo",
      "application": "Presentación formal",
      "description": "Una propuesta para oficinas, hotelería, gastronomía y atención al público que requieren una imagen formal y elegante.",
      "details": [
        "Color gris muy claro.",
        "Cuello italiano estructurado para corbata.",
        "Pechera doblada, sin bolsillo y puño diamante."
      ]
    },
    {
      "number": "02",
      "title": "Camisa Oxford blanca, pechera doblada",
      "image": "/uniformes/camisas-2027/02_camisa_oxford_blanca.webp",
      "width": 1199,
      "height": 1312,
      "alt": "Modelo con camisa Oxford blanca de corte regular, cuello americano con botones y pechera doblada",
      "application": "Imagen corporativa",
      "description": "Una camisa de estilo casual para equipos comerciales y administrativos que buscan una presentación profesional y comodidad durante la jornada.",
      "details": [
        "Tejido Oxford 100 % algodón, color blanco.",
        "Cuello americano con botones y corte regular.",
        "Pechera doblada."
      ]
    },
    {
      "number": "03",
      "title": "Camisa Oxford azul, pechera pespuntada",
      "image": "/uniformes/camisas-2027/03_camisa_oxford_azul.webp",
      "width": 1199,
      "height": 1312,
      "alt": "Modelo con camisa Oxford azul, cuello americano con botones, bolsillo en el pecho y pechera pespuntada de pieza adicional",
      "application": "Identidad de equipo",
      "description": "Una propuesta para equipos comerciales, oficinas y atención al cliente, con detalles de confección que acompañan la identidad de la empresa.",
      "details": [
        "Color azul y cuello americano con botones.",
        "Pechera pespuntada de pieza adicional.",
        "Bolsillo en el pecho."
      ]
    },
    {
      "number": "04",
      "title": "Camisa tipo Columbia",
      "image": "/uniformes/camisas-2027/04_camisa_tipo_columbia.webp",
      "width": 1312,
      "height": 1199,
      "alt": "Modelo con camisa funcional beige de manga larga y dos bolsillos delanteros con tapa",
      "application": "Uso funcional",
      "description": "Diseño funcional para operaciones de campo y equipos que necesitan una presentación profesional en sus actividades diarias.",
      "details": [
        "Color beige y manga larga.",
        "Dos bolsillos delanteros con tapa."
      ]
    },
    {
      "number": "05",
      "title": "Camisa Safari blanca",
      "image": "/uniformes/camisas-2027/05_camisa_safari_blanca-individual.webp",
      "width": 1024,
      "height": 1536,
      "alt": "Modelo con camisa Safari blanca de manga larga y bolsillos delanteros con pliegues y tapas",
      "application": "Confección funcional",
      "description": "Camisa para el trabajo de campo, con canesú ventilado y mangas ajustables mediante sistema roll-up.",
      "details": [
        "Color blanco, con detalles y cintas al tono.",
        "Bolsillos delanteros con pliegues y tapas.",
        "Canesú posterior ventilado con malla interior.",
        "Manga larga con sistema roll-up."
      ]
    }
  ],
  "blusas": [
    {
      "number": "01",
      "title": "Blusa entallada con pinzas",
      "image": "/uniformes/blusas-2027/01_blusa_pinzas_contraste.png",
      "width": 1199,
      "height": 1312,
      "alt": "Modelo con blusa clara entallada, pinzas delanteras, cuello y puños oscuros en contraste",
      "application": "Entalle y contraste",
      "description": "Las pinzas delanteras y posteriores definen la silueta. El contraste de cuello y puños distingue este modelo de manga larga para equipos comerciales y de atención al cliente."
    },
    {
      "number": "02",
      "title": "Blusa corte princesa",
      "image": "/uniformes/blusas-2027/02_blusa_corte_princesa.png",
      "width": 1199,
      "height": 1312,
      "alt": "Modelo con blusa gris de manga larga y costuras curvas de corte princesa desde la sisa hasta el ruedo",
      "application": "Silueta de líneas curvas",
      "description": "Las costuras curvas desde la sisa dan forma al delantero y permiten adaptar el entalle a diferentes siluetas. Una alternativa en gris y manga larga para equipos administrativos y de servicio."
    },
    {
      "number": "03",
      "title": "Blusa corte inglés",
      "image": "/uniformes/blusas-2027/03_blusa_corte_ingles.png",
      "width": 1199,
      "height": 1312,
      "alt": "Modelo con blusa blanca de manga larga y costuras longitudinales de corte inglés desde el hombro hasta el ruedo",
      "application": "Líneas verticales",
      "description": "Las costuras longitudinales que parten del hombro estructuran una silueta de líneas verticales. El blanco y la manga larga ofrecen una presentación formal para oficinas y entornos institucionales."
    },
    {
      "number": "04",
      "title": "Blusa safari",
      "image": "/uniformes/blusas-2027/04_blusa_safari-individual.webp",
      "width": 1024,
      "height": 1536,
      "alt": "Modelo con blusa safari oscura de manga larga y bolsillos de pecho con tapas",
      "application": "Confección funcional",
      "description": "Los bolsillos de pecho con tapas y detalles de cinta acompañan una construcción funcional de manga larga. El canesú ventilado con malla interior aporta ventilación para las actividades de campo."
    },
    {
      "number": "05",
      "title": "Blusa con pinzas y escote en V",
      "image": "/uniformes/blusas-2027/05_blusa_pinzas_escote_v.png",
      "width": 1199,
      "height": 1312,
      "alt": "Modelo con blusa blanca de manga larga, escote en V, botonadura frontal y pinzas verticales en el delantero",
      "application": "Entalle con escote abierto",
      "description": "El escote en V y las pinzas verticales definen un modelo blanco de manga larga. Una opción entallada para oficinas y atención al público que combina un cuello abierto con botonadura frontal."
    },
    {
      "number": "06",
      "title": "Blusa de vestir manga corta",
      "image": "/uniformes/blusas-2027/06_blusa_vestir_manga_corta.png",
      "width": 1024,
      "height": 1536,
      "alt": "Modelo con blusa blanca de vestir, manga corta con detalle en V y botón decorativo, y pinzas laterales en el busto",
      "application": "Acabados de vestir",
      "description": "Confeccionada en seda francesa sintética, con pinzas laterales en el busto. La manga corta de borde recto incorpora un detalle en V y un botón decorativo como acabado distintivo."
    },
    {
      "number": "07",
      "title": "Blusa cuello neru y escote en V",
      "image": "/uniformes/blusas-2027/07_blusa_cuello_neru.png",
      "width": 1024,
      "height": 1536,
      "alt": "Modelo con blusa blanca de cuello neru y abertura en V, delantero liso y mangas largas con puños estrechos",
      "application": "Delantero de líneas limpias",
      "description": "El cuello neru con abertura en V se combina con un delantero liso y pinzas laterales en el busto. Las mangas largas con puños estrechos completan una alternativa sobria para equipos de servicio y oficinas."
    }
  ],
  "pantalones-dama": [
    {
      "number": "01",
      "title": "Pantalón de vestir con pretina elasticada",
      "image": "/uniformes/pantalones-dama-2027/01_pantalon_vestir_pretina_elasticada.png",
      "alt": "Vistas delantera y posterior de pantalón de vestir gris con pretina elasticada en la espalda y bolsillos laterales",
      "application": "Comodidad y presentación",
      "description": "Combina un delantero de vestir con una pretina elasticada en la espalda, que facilita el ajuste de cintura. Su corte recto y los bolsillos laterales lo hacen apropiado para jornadas de oficina y atención al público.",
      "width": 1312,
      "height": 1199
    },
    {
      "number": "02",
      "title": "Pantalón de tiro alto con pinzas",
      "image": "/uniformes/pantalones-dama-2027/02_pantalon_tiro_alto_sin_pretina.png",
      "alt": "Vistas de pantalón azul marino de tiro alto, con pinzas delanteras y cintura sin pretina independiente",
      "application": "Cintura de líneas limpias",
      "description": "La cintura alta, terminada sin pretina independiente, y las pinzas delanteras aportan una silueta estructurada y elegante. Una alternativa de vestir para equipos administrativos y comerciales.",
      "width": 1312,
      "height": 1199
    },
    {
      "number": "03",
      "title": "Pantalón de vestir con pretina ancha",
      "image": "/uniformes/pantalones-dama-2027/03_pantalon_vestir_pretina_ancha.png",
      "alt": "Vistas de pantalón azul marino con pretina ancha de dos botones y bolsillos laterales",
      "application": "Corte clásico",
      "description": "La pretina ancha con cierre de dos botones aporta definición a la cintura. Los bolsillos laterales complementan un pantalón de vestir versátil para distintas funciones corporativas.",
      "width": 1312,
      "height": 1199
    },
    {
      "number": "04",
      "title": "Pantalón de vestir con vena central",
      "image": "/uniformes/pantalones-dama-2027/04_pantalon_vestir_vena_central.png",
      "alt": "Vistas de pantalón azul medio con pretina ancha de dos botones y vena marcada en el centro delantero de las piernas",
      "application": "Detalle de confección",
      "description": "Incorpora una vena longitudinal en el delantero que acentúa la línea de las piernas. La pretina ancha de dos botones completa una presentación formal con un acabado distintivo.",
      "width": 1312,
      "height": 1199
    },
    {
      "number": "05",
      "title": "Pantalón de vestir con basta doblada",
      "image": "/uniformes/pantalones-dama-2027/05_pantalon_vestir_basta_doblada.png",
      "alt": "Vistas de pantalón de vestir con pretina media, un botón y basta doblada alta; espalda con cuatro pinzas",
      "application": "Acabado de basta",
      "description": "La basta doblada de mayor altura aporta un detalle visible al acabado del pantalón. Su pretina media y las pinzas posteriores permiten una silueta de vestir bien definida.",
      "width": 1312,
      "height": 1199
    },
    {
      "number": "06",
      "title": "Pantalón de drill para dama",
      "image": "/uniformes/pantalones-dama-2027/06_pantalon_drill_dama.png",
      "alt": "Vistas delantera y posterior de pantalón de drill beige, con bolsillos laterales, bolsillos posteriores tipo ojal y zapatos bajos",
      "application": "Uso cotidiano",
      "description": "Confección en drill de corte recto, con bolsillos laterales y posteriores tipo ojal. Una alternativa funcional para equipos que necesitan movilidad y una presentación ordenada durante la jornada.",
      "width": 1312,
      "height": 1199
    }
  ],
  "pantalones-caballero": [
    {
      "number": "01",
      "title": "Pantalón chino de drill",
      "image": "/uniformes/pantalones-caballero-2027/01_pantalon_chino_drill.png",
      "alt": "Vistas delantera y posterior de pantalón chino de drill para caballero, con bolsillos laterales, bolsillos posteriores tipo ojal y pretina con pasadores",
      "application": "Presentación cotidiana",
      "description": "El corte chino combina bolsillos delanteros laterales y posteriores tipo ojal en una prenda de drill de líneas sobrias. La pretina con pasadores y la basta con pespunte completan una alternativa para uniformes corporativos de uso diario.",
      "width": 1536,
      "height": 1024
    },
    {
      "number": "02",
      "title": "Pantalón de drill corte jean",
      "image": "/uniformes/pantalones-caballero-2027/02_pantalon_drill_jean_cut.png",
      "alt": "Vistas delantera y posterior de pantalón de drill corte jean, con bolsillos delanteros curvos, bolsillos posteriores de parche y basta con pespunte",
      "application": "Estilo casual",
      "description": "Confeccionado en drill, incorpora bolsillos delanteros curvos de corte jean y bolsillos posteriores de parche. La basta con pespunte acompaña una presentación casual para equipos comerciales y operativos.",
      "width": 1536,
      "height": 1024
    },
    {
      "number": "03",
      "title": "Pantalón de vestir de lanilla",
      "image": "/uniformes/pantalones-caballero-2027/03_pantalon_vestir_lanilla.png",
      "alt": "Vistas delantera y posterior de pantalón negro de vestir de lanilla, con línea de planchado central en ambas piernas y basta invisible",
      "application": "Presentación formal",
      "description": "La lanilla negra y la línea de planchado central en ambas piernas definen una silueta de vestir. La basta invisible aporta un acabado discreto para equipos administrativos y funciones que requieren una presentación formal.",
      "width": 1536,
      "height": 1024
    },
    {
      "number": "04",
      "title": "Pantalón cargo de drill",
      "image": "/uniformes/pantalones-caballero-2027/04_pantalon_cargo_drill.png",
      "alt": "Vistas delantera y posterior de pantalón cargo de drill plomo, con bolsillos cargo laterales con tapa",
      "application": "Funciones operativas",
      "description": "El drill plomo y los bolsillos cargo laterales con tapa conforman una propuesta funcional para actividades operativas. Su distribución de bolsillos permite mantener a mano los objetos necesarios durante la jornada.",
      "width": 1536,
      "height": 1024
    },
    {
      "number": "05",
      "title": "Pantalón cargo con cintas reflectivas",
      "image": "/uniformes/pantalones-caballero-2027/05_pantalon_cargo_reflectivo.png",
      "alt": "Vistas delantera y posterior de pantalón cargo azul marino, con bolsillos laterales y cintas reflectivas alrededor de ambas piernas",
      "application": "Detalle reflectivo",
      "description": "Combina una base azul marino con bolsillos laterales de diseño cargo. Las cintas reflectivas rodean ambas piernas y aportan un detalle distintivo a esta alternativa de vestuario operativo.",
      "width": 1536,
      "height": 1024
    },
    {
      "number": "06",
      "title": "Pantalón cargo con refuerzos de rodilla",
      "image": "/uniformes/pantalones-caballero-2027/06_pantalon_cargo_reforzado.png",
      "alt": "Vistas delantera y posterior de pantalón de trabajo azul marino y gris, con refuerzos de rodilla, vivos reflectivos, pretina elasticada y bolsillos posteriores de parche con tapa",
      "application": "Confección para el trabajo",
      "description": "El diseño bicolor azul marino y gris incorpora refuerzos en las rodillas y vivos reflectivos. La pretina elasticada favorece el ajuste, mientras los bolsillos posteriores de parche con tapa complementan una prenda orientada al trabajo operativo.",
      "width": 1536,
      "height": 1024
    }
  ],
  "casacas": [
    {
      "number": "01",
      "title": "Casaca doble desmontable",
      "image": "/prendas/casaca-doble-desmontable-zoomlion-2027.webp",
      "width": 1145,
      "height": 1374,
      "alt": "Casaca negra con capucha, cierre frontal cubierto y bolsillos laterales",
      "application": "Capucha y cierre frontal",
      "description": "Una propuesta de líneas sobrias para equipos que buscan una presentación corporativa uniforme. Este modelo permite tomar como referencia su silueta y acabados al definir las casacas de la organización.",
      "details": [
        "Color negro y capucha.",
        "Cierre frontal cubierto y bolsillos laterales."
      ]
    },
    {
      "number": "02",
      "title": "Casaca tipo saco impermeable",
      "image": "/prendas/casaca-saco-impermeable-cip.webp",
      "width": 1199,
      "height": 1312,
      "alt": "Casaca verde de largo tipo saco, con capucha, cierre frontal, bolsillos delanteros y dos franjas claras en el torso",
      "application": "Largo tipo saco",
      "description": "El largo tipo saco ofrece una alternativa de presentación para equipos con funciones de supervisión o atención en distintos espacios de trabajo. Su diseño sirve de referencia para definir colores y acabados según el requerimiento de la empresa.",
      "details": [
        "Largo tipo saco y capucha.",
        "Cierre frontal, bolsillos delanteros y dos franjas claras en el torso."
      ]
    },
    {
      "number": "03",
      "title": "Casaca impermeable con cintas reflectivas",
      "image": "/prendas/casaca-impermeable-rija-ineco.webp",
      "width": 1199,
      "height": 1312,
      "alt": "Casaca roja de cuello alto, con cierre frontal cubierto y franjas claras en el torso y las mangas",
      "application": "Franjas en contraste",
      "description": "Una alternativa para organizaciones que desean distinguir visualmente a su equipo mediante el color y los contrastes de la prenda. La elección del modelo y sus acabados se evalúa según las funciones y condiciones de uso del personal.",
      "details": [
        "Color rojo y cuello alto.",
        "Cierre frontal cubierto y franjas claras en el torso y las mangas."
      ]
    },
    {
      "number": "04",
      "title": "Casaca sport elegante",
      "image": "/prendas/casaca-sport-elegante-glencore-2027.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Vista delantera de casaca negra de cuello alto, cierre frontal y bolsillos con cierre",
      "application": "Presentación sport",
      "description": "Combina una presentación sobria con una silueta de estilo sport para equipos administrativos, comerciales o de atención. Una referencia para integrar una casaca a la imagen cotidiana de la organización.",
      "details": [
        "Cuello alto, cierre frontal y bolsillos con cierre.",
        "Color negro y vista frontal."
      ]
    },
    {
      "number": "05",
      "title": "Casaca acolchada",
      "image": "/prendas/casaca-acolchada-electrodunas.webp",
      "width": 1199,
      "height": 1312,
      "alt": "Casaca negra con acolchado horizontal, cuello alto, cierre frontal y bolsillos laterales",
      "application": "Acolchado horizontal",
      "description": "El acabado acolchado aporta una textura reconocible al conjunto corporativo. Es una alternativa de diseño para equipos que buscan incorporar este estilo a su vestuario, definiendo la confección según el uso requerido.",
      "details": [
        "Acolchado de líneas horizontales y cuello alto.",
        "Cierre frontal y bolsillos laterales."
      ]
    },
    {
      "number": "06",
      "title": "Casaca softshell",
      "image": "/prendas/casaca-softshell-minera-bateas.webp",
      "width": 1199,
      "height": 1312,
      "alt": "Casaca azul marino de superficie lisa, con cuello alto, cierre frontal y bolsillos laterales",
      "application": "Líneas sobrias",
      "description": "Una propuesta de líneas sencillas para complementar uniformes de equipos comerciales, administrativos o de supervisión. Su presentación permite coordinar la casaca con las demás prendas de la organización.",
      "details": [
        "Color azul marino, superficie lisa y cuello alto.",
        "Cierre frontal y bolsillos laterales."
      ]
    },
    {
      "number": "07",
      "title": "Casaca de drill industrial",
      "image": "/prendas/casaca-drill-industrial-2027.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con casaca naranja de drill, cuello camisero, cierre frontal y bolsillos delanteros",
      "application": "Trabajo industrial",
      "description": "Casaca confeccionada en tejido drill para uniformes de trabajo industrial, orientada a equipos operativos y de mantenimiento.",
      "details": [
        "Confeccionada en tejido drill.",
        "Para equipos operativos y de mantenimiento."
      ]
    }
  ],
  "polos": [
    {
      "number": "01",
      "title": "Polo box para dama",
      "image": "/uniformes/polos-2027/01_polo_box_dama.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con polo box blanco para dama, cuello camisero, tapeta y detalles oscuros en cuello y puños",
      "application": "Presentación corporativa femenina",
      "description": "Confeccionado en piqué 30/1, con cuello camisero y tapeta. Una propuesta para equipos femeninos de atención al cliente, retail y servicios que buscan una presentación alineada con la identidad de su empresa.",
      "details": [
        "Tejido piqué 30/1.",
        "Cuello camisero y tapeta.",
        "Fotografía en color blanco, con detalles tipping oscuros en cuello y puños."
      ]
    },
    {
      "number": "02",
      "title": "Polo box para caballero",
      "image": "/uniformes/polos-2027/02_polo_box_caballero.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con polo box azul marino para caballero, cuello camisero y tapeta roja en contraste",
      "application": "Presentación corporativa masculina",
      "description": "Polo de piqué 30/1, con cuello camisero y tapeta, para equipos masculinos comerciales y de servicios. Los colores y detalles del diseño permiten coordinar la prenda con la presentación corporativa de la organización.",
      "details": [
        "Tejido piqué 30/1.",
        "Cuello camisero y tapeta.",
        "Fotografía en azul marino, con tapeta roja en contraste."
      ]
    },
    {
      "number": "03",
      "title": "T-shirt cuello V para dama",
      "image": "/uniformes/polos-2027/03_tshirt_cuello_v_dama.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con T-shirt negro de manga corta y escote en V para dama",
      "application": "Alternativa para equipos de atención",
      "description": "La prenda fotografiada está confeccionada en interlock y presenta escote en V. Una alternativa para equipos comerciales y de atención al cliente que también puede confeccionarse en jersey, según el requerimiento del proyecto.",
      "details": [
        "Fotografía: prenda confeccionada en interlock.",
        "También puede confeccionarse en jersey.",
        "Escote en V y manga corta."
      ]
    },
    {
      "number": "04",
      "title": "T-shirt manga larga para caballero",
      "image": "/uniformes/polos-2027/04_tshirt_manga_larga_caballero.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con T-shirt blanco de manga larga y cuello redondo para caballero",
      "application": "Presentación casual corporativa",
      "description": "Confeccionado en jersey 20/1, con manga larga, para una presentación casual corporativa. Su diseño permite definir colores y aplicaciones de identidad según las necesidades del equipo y el uso previsto.",
      "details": [
        "Tejido jersey 20/1.",
        "Manga larga y cuello redondo.",
        "Fotografía en color blanco."
      ]
    }
  ],
  "chalecos": [
    {
      "number": "01",
      "title": "Chaleco acolchado caballero",
      "image": "/uniformes/chalecos-2027/01_chaleco_acolchado_caballero.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con chaleco acolchado negro para caballero, cuello alto y cierre frontal",
      "application": "Inspiración sastrera",
      "description": "Chaleco acolchado de inspiración sastrera para equipos corporativos. Sus bolsillos laterales tienen cierres ocultos que se integran discretamente en la unión de los delanteros con los costados.",
      "details": [
        "Inspiración sastrera.",
        "Bolsillos laterales con cierres ocultos, integrados en la unión de delanteros y costados.",
        "Pequeños tiradores tipo lágrima."
      ]
    },
    {
      "number": "02",
      "title": "Chaleco acolchado dama",
      "image": "/uniformes/chalecos-2027/02_chaleco_acolchado_dama.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con chaleco acolchado oscuro de silueta femenina, cuello alto y cierre frontal",
      "application": "Silueta femenina",
      "description": "Chaleco acolchado de silueta femenina, con bolsillos laterales integrados y cierres prácticamente imperceptibles. Los pequeños tiradores tipo lágrima acompañan una presentación corporativa discreta.",
      "details": [
        "Silueta femenina.",
        "Bolsillos laterales integrados con cierres prácticamente imperceptibles.",
        "Pequeños tiradores tipo lágrima."
      ]
    },
    {
      "number": "03",
      "title": "Chaleco de paño caballero",
      "image": "/uniformes/chalecos-2027/03_chaleco_pano_caballero.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con chaleco oscuro para caballero, cuello alto y cierre frontal",
      "application": "Presentación institucional",
      "description": "Alternativa para uniformes corporativos e institucionales, confeccionable en paño 100 % poliéster o mezclas textiles según el requerimiento del proyecto.",
      "details": [
        "Confeccionable en paño 100 % poliéster o mezclas textiles.",
        "Presentación corporativa e institucional."
      ]
    },
    {
      "number": "04",
      "title": "Chaleco de paño dama",
      "image": "/uniformes/chalecos-2027/04_chaleco_pano_dama.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con chaleco camel de silueta femenina, solapas y bolsillos delanteros con tapa",
      "application": "Presentación corporativa femenina",
      "description": "Chaleco de silueta femenina para uniformes corporativos, confeccionable en paño 100 % poliéster o mezclas textiles. Una alternativa para coordinar la presentación del equipo.",
      "details": [
        "Confeccionable en paño 100 % poliéster o mezclas textiles.",
        "Silueta femenina para uniformes corporativos."
      ]
    },
    {
      "number": "05",
      "title": "Chaleco reflectivo básico",
      "image": "/uniformes/chalecos-2027/05_chaleco_reflectivo_basico.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con chaleco operativo naranja y cintas reflectivas en hombros y cintura",
      "application": "Vestuario operativo",
      "description": "Chaleco operativo con cinta reflectiva 3M de 2 pulgadas, para equipos que requieren este detalle en su indumentaria de trabajo.",
      "details": [
        "Cinta reflectiva 3M de 2 pulgadas.",
        "Modelo operativo."
      ]
    },
    {
      "number": "06",
      "title": "Chaleco impermeable",
      "image": "/uniformes/chalecos-2027/06_chaleco_impermeable.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con chaleco oscuro, cierre frontal y dos franjas reflectivas horizontales",
      "application": "Alternativa operativa",
      "description": "Chaleco impermeable con cinta reflectiva 3M Transfer, como alternativa para el vestuario de equipos operativos.",
      "details": [
        "Chaleco impermeable.",
        "Cinta reflectiva 3M Transfer."
      ]
    },
    {
      "number": "07",
      "title": "Chaleco multibolsillos",
      "image": "/uniformes/chalecos-2027/07_chaleco_multibolsillos.webp",
      "width": 1086,
      "height": 1448,
      "alt": "Modelo con chaleco naranja, múltiples bolsillos delanteros y franjas reflectivas",
      "application": "Equipos técnicos y logísticos",
      "description": "Chaleco funcional con múltiples bolsillos para implementos de trabajo, orientado a personal técnico, logístico y operativo.",
      "details": [
        "Múltiples bolsillos para implementos de trabajo.",
        "Para personal técnico, logístico y operativo."
      ]
    }
  ]
}
