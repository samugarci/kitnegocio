import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'packs', 'mar-2026');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  navy: '#071822',
  teal: '#0E7490',
  tealDark: '#0B5668',
  orange: '#F0592A',
  cream: '#F6F1E8',
  ink: '#10232B',
  muted: '#5C7078',
  white: '#FFFFFF',
  green: '#15966A',
};

const guides = [
  {
    file: 'guia-instagram-30-posts.pdf',
    category: 'CATÁLOGO DE CONTENIDO',
    title: '30 posts que convierten',
    subtitle: 'Sistema visual para atraer, educar y vender en Instagram',
    promise: 'Publica con intención: cada pieza cumple una función dentro de tu modelo de negocio.',
    sections: [
      {
        title: '1. Define tu motor de crecimiento',
        intro: 'Antes de diseñar, conecta contenido, oferta y cliente. Tu cuenta debe responder tres preguntas en menos de 10 segundos.',
        bullets: ['Qué problema resuelves', 'Para quién lo resuelves', 'Qué debe hacer la persona después'],
        example: 'Ejemplo: “Ayudo a negocios de belleza a llenar su agenda con contenido listo para publicar. Escribe AGENDA y recibe el catálogo.”',
        action: 'Completa: Ayudo a ______ a lograr ______ mediante ______.',
      },
      {
        title: '2. Distribuye los 30 posts',
        intro: 'Usa una mezcla estable para no convertir tu perfil en un catálogo de ventas.',
        bullets: ['10 educativos: errores, pasos, mitos y consejos', '8 de confianza: historia, proceso, resultados y testimonios', '6 de producto: beneficios, uso y comparación', '4 de comunidad: preguntas, opinión y tendencias', '2 de venta directa: oferta clara con fecha o cupos'],
        example: 'Regla práctica: por cada publicación de venta directa, publica al menos cuatro piezas de valor o confianza.',
        action: 'Marca en tu calendario los 30 espacios con E, C, P, COM o V.',
      },
      {
        title: '3. Fórmula visual de cada post',
        intro: 'Una buena plantilla no salva un mensaje confuso. Construye cada pieza por capas.',
        bullets: ['Gancho: 3 a 8 palabras grandes', 'Prueba visual: producto, resultado o demostración', 'Una sola idea principal', 'CTA: guardar, comentar, escribir o comprar', 'Identidad constante: 2 tipografías y 3 colores'],
        example: 'Gancho: “3 errores que bajan tus ventas”. Desarrollo: un error por lámina. CTA: “Guárdalo y revisa tu perfil hoy”.',
        action: 'Revisa que el texto se pueda leer sin ampliar la pantalla.',
      },
      {
        title: '4. Carrusel que retiene',
        intro: 'El carrusel funciona cuando cada página crea curiosidad por la siguiente.',
        bullets: ['Portada: resultado o problema específico', 'Página 2: contexto en una frase', 'Páginas 3–6: pasos concretos', 'Página 7: resumen visual', 'Última: CTA coherente con el objetivo'],
        example: '“Cómo conseguir tus primeros 10 clientes” → problema → 4 acciones → checklist → “Escribe PLAN”.',
        action: 'Evita párrafos. Usa máximo 25 palabras por lámina.',
      },
      {
        title: '5. Perfil convertido en vitrina',
        intro: 'El contenido atrae; el perfil convierte. Ordena la experiencia completa.',
        bullets: ['Foto o logo reconocible', 'Bio con promesa + prueba + CTA', 'Tres posts fijados: quién eres, oferta, resultado', 'Destacadas: empezar, servicios, casos, preguntas', 'Enlace directo a compra, reserva o conversación'],
        example: 'Fijados recomendados: “Empieza aquí”, “Así te ayudamos”, “Caso real”.',
        action: 'Haz la prueba de los 10 segundos con alguien que no conozca tu negocio.',
      },
      {
        title: '6. Medición y mejora semanal',
        intro: 'No midas solo seguidores. Observa señales que se conectan con ventas.',
        bullets: ['Alcance para descubrir temas atractivos', 'Guardados para medir utilidad', 'Compartidos para medir relevancia', 'Visitas al perfil para medir interés', 'Mensajes, clics y ventas para medir conversión'],
        example: 'Duplica los formatos con más guardados; mejora el CTA de los que tienen visitas pero pocos mensajes.',
        action: 'Cada viernes elige: una pieza para repetir, una para mejorar y una para dejar.',
      },
    ],
  },
  {
    file: 'guia-reels-12-guiones.pdf',
    category: 'GUIONES DE VIDEO',
    title: '12 Reels para vender sin improvisar',
    subtitle: 'Guiones, tomas y llamados a la acción para videos cortos',
    promise: 'Graba contenido profesional con tu teléfono y convierte atención en conversaciones.',
    sections: [
      {
        title: '1. Estructura universal de un Reel',
        intro: 'Un video corto necesita una promesa inmediata y una sola transformación.',
        bullets: ['0–2 s: gancho visual y verbal', '3–8 s: problema reconocible', '9–20 s: solución o demostración', 'Últimos 3 s: CTA visible'],
        example: '“Si tus clientes preguntan precio y desaparecen, prueba esto…” → muestra respuesta → invita a escribir GUIÓN.',
        action: 'Escribe el cierre antes de grabar para que todo el video lleve a la misma acción.',
      },
      {
        title: '2. Banco de 12 ideas',
        intro: 'Rota formatos para mostrar experiencia, producto y personalidad.',
        bullets: ['Antes/después', 'Error frecuente', 'Tutorial de 3 pasos', 'Detrás de cámaras', 'Pregunta frecuente', 'Caso de cliente', 'Comparación A/B', 'Lista rápida', 'Mito vs realidad', 'Proceso en timelapse', 'Historia del fundador', 'Oferta explicada'],
        example: 'Tutorial: “3 pasos para cuidar tu producto”. Usa tres clips, texto grande y una toma final del resultado.',
        action: 'Asigna una idea por semana y reutiliza el tema en Stories y carrusel.',
      },
      {
        title: '3. Producción con teléfono',
        intro: 'La claridad supera al equipo costoso.',
        bullets: ['Limpia la cámara', 'Graba junto a una ventana', 'Usa fondo ordenado', 'Formato vertical 9:16', 'Clips de 1–3 segundos', 'Audio limpio o voz en off'],
        example: 'Graba plano general, plano medio, detalle de manos y resultado. Esa variedad hace profesional la edición.',
        action: 'Crea una carpeta “B-roll” con 20 clips reutilizables de producto y proceso.',
      },
      {
        title: '4. Ganchos que detienen',
        intro: 'Haz que el cliente se reconozca, no que sienta que le gritan.',
        bullets: ['“Si estás haciendo ___, mira esto”', '“La razón por la que ___ no funciona”', '“Antes de comprar ___, revisa esto”', '“Así logramos ___ sin ___”', '“3 señales de que necesitas ___”'],
        example: 'Específico gana: “3 señales de que tu bio está perdiendo clientes” es mejor que “Consejos de Instagram”.',
        action: 'Escribe cinco ganchos para el mismo tema y elige el más concreto.',
      },
      {
        title: '5. CTA según intención',
        intro: 'No todos los Reels deben pedir una compra.',
        bullets: ['Descubrimiento: “Sígueme para…”', 'Valor: “Guárdalo para aplicarlo”', 'Comunidad: “¿Cuál te pasa?”', 'Conversación: “Escribe CATÁLOGO”', 'Venta: “Reserva desde el enlace”'],
        example: 'Si el video educa, pide guardar. Si demuestra un producto, pide catálogo o reserva.',
        action: 'Usa un solo CTA hablado y escrito al final.',
      },
      {
        title: '6. Publicación y análisis',
        intro: 'La primera hora ayuda, pero la constancia y el aprendizaje importan más.',
        bullets: ['Portada legible', 'Caption que amplía, no repite', 'Palabras clave naturales', 'Responder comentarios', 'Revisar retención y repeticiones'],
        example: 'Si la caída ocurre en el segundo 2, cambia el gancho. Si llegan al final pero no actúan, cambia el CTA.',
        action: 'Documenta duración, gancho, alcance, retención y mensajes de cada Reel.',
      },
    ],
  },
  {
    file: 'guia-stories-conversion.pdf',
    category: 'SECUENCIAS INTERACTIVAS',
    title: 'Stories que crean conversación',
    subtitle: 'Secuencias diarias para confianza, interacción y venta',
    promise: 'Deja de publicar historias aisladas: construye recorridos que llevan a responder.',
    sections: [
      {
        title: '1. Secuencia de 5 Stories',
        intro: 'Cada secuencia debe sentirse como una mini conversación.',
        bullets: ['Contexto humano', 'Problema del cliente', 'Consejo o demostración', 'Prueba', 'CTA con sticker o mensaje'],
        example: 'Buenos días → error común → cómo resolverlo → resultado real → encuesta “¿Te pasa?”.',
        action: 'Publica en bloques de 3 a 5, no 20 piezas sin hilo.',
      },
      {
        title: '2. Semana equilibrada',
        intro: 'Alterna objetivos para mantener interés.',
        bullets: ['Lunes: planificación', 'Martes: educación', 'Miércoles: detrás de cámaras', 'Jueves: prueba social', 'Viernes: oferta', 'Sábado: comunidad', 'Domingo: resumen'],
        example: 'Convierte el post principal del día en una secuencia: pregunta → resumen → enlace al post.',
        action: 'Reserva dos días para vender; el resto prepara la decisión.',
      },
      {
        title: '3. Stickers con intención',
        intro: 'La interacción debe ayudarte a conocer y segmentar clientes.',
        bullets: ['Encuesta para preferencias', 'Pregunta para objeciones', 'Quiz para educación', 'Deslizador para interés', 'Enlace para acción'],
        example: 'Encuesta: “¿Qué te cuesta más: crear contenido o vender?” Luego responde a cada grupo.',
        action: 'Guarda las respuestas y conviértelas en próximos posts.',
      },
      {
        title: '4. Catálogo visual',
        intro: 'Presenta opciones sin saturar.',
        bullets: ['Una categoría por Story', 'Foto limpia', 'Beneficio principal', 'Precio o rango claro', 'Cómo comprar'],
        example: 'Portada “Elige tu opción” → tres productos → comparación → CTA “Responde 1, 2 o 3”.',
        action: 'Crea destacada CATÁLOGO con máximo 10 Stories vigentes.',
      },
      {
        title: '5. Prueba social creíble',
        intro: 'Muestra contexto, proceso y resultado; no solo una frase.',
        bullets: ['Situación inicial', 'Qué eligió el cliente', 'Resultado concreto', 'Captura autorizada', 'Invitación sin presión'],
        example: '“Llegó con ___, aplicamos ___ y en ___ consiguió ___.”',
        action: 'Pide siempre permiso antes de publicar datos o conversaciones.',
      },
      {
        title: '6. Venta por respuestas',
        intro: 'La Story abre la conversación; un flujo claro la convierte.',
        bullets: ['Responder rápido', 'Confirmar necesidad', 'Recomendar una opción', 'Resolver una objeción', 'Cerrar con siguiente paso'],
        example: '“Gracias por responder. ¿Buscas algo para ti o para regalar?” permite recomendar mejor.',
        action: 'Configura respuestas rápidas para precio, envío, agenda y seguimiento.',
      },
    ],
  },
  {
    file: 'catalogo-whatsapp-ventas.pdf',
    category: 'CATÁLOGO COMERCIAL',
    title: 'WhatsApp Business que vende',
    subtitle: 'Catálogo, respuestas rápidas y seguimiento profesional',
    promise: 'Convierte consultas en ventas con una atención clara, humana y organizada.',
    sections: [
      {
        title: '1. Configura tu vitrina',
        intro: 'Tu perfil debe generar confianza antes del primer mensaje.',
        bullets: ['Logo o foto clara', 'Descripción con beneficio', 'Horario real', 'Dirección o zona', 'Enlace y catálogo vigentes'],
        example: 'Descripción: “Detalles personalizados para regalos. Entregas en Medellín. Respuesta de 9 a 6.”',
        action: 'Revisa el perfil desde otro teléfono y elimina información desactualizada.',
      },
      {
        title: '2. Catálogo profesional',
        intro: 'Agrupa por necesidad, no solo por código interno.',
        bullets: ['Nombre fácil de entender', '3–5 fotos coherentes', 'Beneficio en primera línea', 'Precio o “desde”', 'Variantes y tiempo de entrega'],
        example: '“Kit regalo esencial — listo para entregar — incluye 3 productos — desde $___”.',
        action: 'Destaca primero los tres productos más rentables o fáciles de elegir.',
      },
      {
        title: '3. Mensaje de bienvenida',
        intro: 'Saluda y guía sin enviar un texto interminable.',
        bullets: ['Nombre del negocio', 'Disponibilidad', 'Pregunta de contexto', 'Opciones numeradas'],
        example: '“¡Hola! Soy Ana de Marca. Te ayudo con gusto. ¿Buscas 1) catálogo, 2) recomendación o 3) estado de pedido?”',
        action: 'Personaliza la primera respuesta con el nombre cuando sea posible.',
      },
      {
        title: '4. Diagnóstico y recomendación',
        intro: 'Antes de cotizar, entiende objetivo, presupuesto y urgencia.',
        bullets: ['Para quién es', 'Qué resultado busca', 'Rango de inversión', 'Fecha necesaria', 'Preferencias'],
        example: '“Por lo que me cuentas, te recomiendo la opción Pro porque incluye ___ y te permite ___.”',
        action: 'Ofrece máximo tres opciones y explica la diferencia.',
      },
      {
        title: '5. Manejo de objeciones',
        intro: 'Valida la preocupación y responde con valor o alternativas.',
        bullets: ['Precio: compara resultado e incluye opción menor', 'Tiempo: confirma fecha real', 'Confianza: comparte política y caso', 'Indecisión: resume diferencias', 'Silencio: seguimiento amable'],
        example: '“Entiendo que cuides tu presupuesto. La opción A incluye ___; también tengo B desde ___.”',
        action: 'No presiones ni inventes escasez. La claridad protege tu reputación.',
      },
      {
        title: '6. Cierre y seguimiento',
        intro: 'Haz explícito el siguiente paso.',
        bullets: ['Confirmar producto', 'Total y forma de pago', 'Datos de entrega', 'Fecha estimada', 'Confirmación escrita', 'Seguimiento postventa'],
        example: 'Seguimiento: “Hola, ¿cómo te fue con tu pedido? Si quieres, te comparto una recomendación de uso.”',
        action: 'Usa etiquetas: nuevo, cotizado, pago, preparación, entregado, seguimiento.',
      },
    ],
  },
  {
    file: 'calendario-crecimiento-30-dias.pdf',
    category: 'PLAN DE ACCIÓN',
    title: 'Calendario de crecimiento',
    subtitle: '30 días para ordenar contenido, comunidad y ventas',
    promise: 'Un plan diario sostenible para crecer sin publicar por publicar.',
    sections: [
      {
        title: '1. Semana de posicionamiento',
        intro: 'Haz evidente quién eres y qué problema resuelves.',
        bullets: ['Día 1: historia y promesa', 'Día 2: error del cliente', 'Día 3: tutorial', 'Día 4: proceso', 'Día 5: oferta', 'Día 6: encuesta', 'Día 7: análisis'],
        example: 'Objetivo: que un visitante nuevo pueda explicar tu negocio con una frase.',
        action: 'Fija las tres publicaciones que mejor resumen tu marca.',
      },
      {
        title: '2. Semana de confianza',
        intro: 'Reduce el riesgo percibido antes de pedir la compra.',
        bullets: ['Caso real', 'Preguntas frecuentes', 'Materiales o método', 'Detrás de cámaras', 'Comparación', 'Testimonio', 'Resumen'],
        example: 'Muestra cómo trabajas, no solo el resultado final.',
        action: 'Reúne cinco pruebas: fotos, datos, mensajes autorizados o demostraciones.',
      },
      {
        title: '3. Semana de comunidad',
        intro: 'Invita a participar y escucha el lenguaje del cliente.',
        bullets: ['Pregunta abierta', 'Mito', 'Opinión', 'Reto corto', 'Colaboración', 'En vivo o Q&A', 'Aprendizajes'],
        example: 'Convierte las respuestas más repetidas en una guía o producto.',
        action: 'Responde comentarios con preguntas reales, no respuestas automáticas.',
      },
      {
        title: '4. Semana de conversión',
        intro: 'Presenta la oferta después de crear contexto.',
        bullets: ['Problema y costo de no actuar', 'Demostración', 'Qué incluye', 'Para quién es', 'Objeciones', 'Oferta y CTA', 'Seguimiento'],
        example: 'Secuencia: educación → caso → oferta → preguntas → cierre.',
        action: 'Define cupos o fecha solo cuando sean reales.',
      },
      {
        title: '5. Rutina diaria de 30 minutos',
        intro: 'La distribución también hace crecer.',
        bullets: ['10 min responder', '5 min comentar con valor', '5 min Stories', '5 min revisar métricas', '5 min preparar mañana'],
        example: 'No publiques y desaparezcas: conversa antes y después de cada pieza.',
        action: 'Bloquea el mismo horario cinco días por semana.',
      },
      {
        title: '6. Tablero mensual',
        intro: 'Relaciona actividad de contenido con resultados comerciales.',
        bullets: ['Piezas publicadas', 'Alcance', 'Guardados', 'Mensajes', 'Clics', 'Cotizaciones', 'Ventas'],
        example: 'Si suben mensajes pero no ventas, revisa recomendación, oferta y seguimiento.',
        action: 'Cierra el mes con tres decisiones concretas para el siguiente.',
      },
    ],
  },
  {
    file: 'banco-captions-hashtags.pdf',
    category: 'COPY Y CONVERSIÓN',
    title: 'Captions que mueven a actuar',
    subtitle: 'Fórmulas, llamados a la acción y hashtags con estrategia',
    promise: 'Escribe textos humanos y claros que conectan contenido con ventas.',
    sections: [
      {
        title: '1. Fórmula problema–cambio–acción',
        intro: 'Empieza desde una situación reconocible y termina con un siguiente paso.',
        bullets: ['Primera línea que abre curiosidad', 'Problema específico', 'Idea o solución', 'Prueba o ejemplo', 'CTA'],
        example: '“Publicar más no siempre vende más. Si tu contenido no lleva a una acción, solo entretiene…”',
        action: 'Escribe primero la primera y la última línea.',
      },
      {
        title: '2. Caption educativo',
        intro: 'Entrega una victoria rápida y demuestra criterio.',
        bullets: ['Gancho', 'Por qué importa', '3 pasos', 'Error a evitar', 'Invitación a guardar'],
        example: '“Guarda esta lista antes de diseñar tu próxima publicación…”',
        action: 'Usa saltos de línea y frases cortas para lectura móvil.',
      },
      {
        title: '3. Caption de historia',
        intro: 'La historia funciona cuando conecta experiencia con aprendizaje.',
        bullets: ['Momento inicial', 'Tensión', 'Decisión', 'Resultado', 'Lección para el cliente'],
        example: '“Hace un año tardábamos tres horas en responder cada consulta. Cambiamos ___ y pasó ___.”',
        action: 'El cliente debe verse reflejado; evita convertir todo en autobiografía.',
      },
      {
        title: '4. Caption de venta',
        intro: 'La oferta debe ser fácil de evaluar.',
        bullets: ['Para quién es', 'Resultado', 'Qué incluye', 'Prueba', 'Precio o forma de cotizar', 'CTA'],
        example: '“Si necesitas ___ sin ___, este kit incluye ___. Escribe INFO y te recomiendo la opción correcta.”',
        action: 'No escondas condiciones importantes.',
      },
      {
        title: '5. Banco de CTA',
        intro: 'Elige la acción según la etapa del cliente.',
        bullets: ['Guarda esta guía', 'Compártelo con alguien', 'Cuéntame cuál eliges', 'Escribe CATÁLOGO', 'Reserva tu espacio', 'Visita el enlace', 'Responde esta Story'],
        example: 'Evita “¿Qué opinas?” si necesitas una respuesta concreta. Pregunta A o B.',
        action: 'Un contenido, un CTA principal.',
      },
      {
        title: '6. Hashtags y palabras clave',
        intro: 'Ayudan a clasificar; no reemplazan un buen tema.',
        bullets: ['3–5 de nicho', '2–3 del problema', '1–2 locales', '1–2 de formato', 'Palabras clave en título y caption'],
        example: 'Combina #MarketingParaRestaurantes con ciudad, servicio y problema; evita 30 etiquetas genéricas.',
        action: 'Crea tres grupos y rota según el tema. Mide búsquedas y alcance.',
      },
    ],
  },
];

function text(doc, value, options = {}) {
  doc.fillColor(C.ink).font('Helvetica').fontSize(11).text(value, {
    lineGap: 4,
    ...options,
  });
}

function addFooter(doc, guide, pageNumber) {
  const y = doc.page.height - 34;
  doc
    .moveTo(54, y - 8)
    .lineTo(doc.page.width - 54, y - 8)
    .strokeColor('#DCE8EA')
    .lineWidth(0.7)
    .stroke();
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(C.muted)
    .text(`KitNegocio · ${guide.title}`, 54, y, { width: 360 })
    .text(String(pageNumber).padStart(2, '0'), doc.page.width - 90, y, {
      width: 36,
      align: 'right',
    });
}

function addCover(doc, guide) {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.navy);
  doc.circle(doc.page.width + 15, 90, 210).fill(C.tealDark);
  doc.circle(-55, doc.page.height - 45, 180).fill(C.orange);
  doc.roundedRect(54, 58, 170, 24, 12).fill(C.teal);
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(C.white)
    .text(guide.category, 67, 66, { characterSpacing: 1.2 });
  doc
    .font('Helvetica-Bold')
    .fontSize(42)
    .fillColor(C.white)
    .text(guide.title, 54, 145, { width: 470, lineGap: 4 });
  doc
    .font('Helvetica')
    .fontSize(18)
    .fillColor('#B9DDE3')
    .text(guide.subtitle, 54, 285, { width: 430, lineGap: 6 });
  doc.roundedRect(54, 430, 455, 118, 18).fill('#0C2A35');
  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(C.orange)
    .text('OBJETIVO DEL CATÁLOGO', 76, 455, { characterSpacing: 1 });
  doc
    .font('Helvetica')
    .fontSize(15)
    .fillColor(C.white)
    .text(guide.promise, 76, 480, { width: 405, lineGap: 6 });
  doc
    .font('Helvetica-Bold')
    .fontSize(24)
    .fillColor(C.white)
    .text('Kit', 54, doc.page.height - 95, { continued: true })
    .fillColor(C.orange)
    .text('Negocio');
  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor('#9FB9C0')
    .text('GUÍA PRÁCTICA · EDICIÓN 2026', 54, doc.page.height - 58, {
      characterSpacing: 1.3,
    });
}

function addIntro(doc, guide, pageNumber) {
  doc.addPage();
  doc.roundedRect(54, 54, 486, 80, 18).fill(C.cream);
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(C.orange)
    .text('CÓMO USAR ESTA GUÍA', 76, 75, { characterSpacing: 1 });
  doc
    .font('Helvetica')
    .fontSize(12)
    .fillColor(C.ink)
    .text('Lee una sección, completa su acción y aplícala esta semana. No necesitas hacerlo todo el mismo día.', 76, 98, {
      width: 430,
      lineGap: 4,
    });
  doc
    .font('Helvetica-Bold')
    .fontSize(28)
    .fillColor(C.navy)
    .text('Tu ruta de implementación', 54, 175);
  guide.sections.forEach((section, index) => {
    const y = 235 + index * 78;
    doc.circle(72, y + 13, 14).fill(index % 2 ? C.orange : C.teal);
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(C.white)
      .text(String(index + 1), 66, y + 8, { width: 12, align: 'center' });
    doc
      .font('Helvetica-Bold')
      .fontSize(13)
      .fillColor(C.ink)
      .text(section.title.replace(/^\d+\.\s*/, ''), 100, y + 1, { width: 410 });
    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor(C.muted)
      .text(section.intro, 100, y + 23, { width: 410, height: 34, ellipsis: true });
  });
  addFooter(doc, guide, pageNumber);
}

function addSection(doc, guide, section, index, pageNumber) {
  doc.addPage();
  const accent = index % 2 ? C.orange : C.teal;
  doc.rect(0, 0, 14, doc.page.height).fill(accent);
  doc.roundedRect(54, 54, 62, 62, 18).fill(accent);
  doc
    .font('Helvetica-Bold')
    .fontSize(24)
    .fillColor(C.white)
    .text(String(index + 1).padStart(2, '0'), 65, 72, { width: 40, align: 'center' });
  doc
    .font('Helvetica-Bold')
    .fontSize(27)
    .fillColor(C.navy)
    .text(section.title.replace(/^\d+\.\s*/, ''), 140, 58, { width: 400, lineGap: 2 });
  doc
    .font('Helvetica')
    .fontSize(12)
    .fillColor(C.muted)
    .text(section.intro, 54, 150, { width: 486, lineGap: 5 });

  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(accent)
    .text('PUNTOS CLAVE', 54, 230, { characterSpacing: 1.2 });
  let y = 260;
  section.bullets.forEach((item) => {
    doc.circle(63, y + 6, 4).fill(accent);
    doc
      .font('Helvetica')
      .fontSize(11)
      .fillColor(C.ink)
      .text(item, 80, y, { width: 440, lineGap: 3 });
    y += 36;
  });

  y = Math.max(y + 10, 465);
  doc.roundedRect(54, y, 486, 100, 16).fill('#EAF5F7');
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(C.teal)
    .text('EJEMPLO APLICADO', 74, y + 20, { characterSpacing: 1 });
  doc
    .font('Helvetica-Oblique')
    .fontSize(11)
    .fillColor(C.ink)
    .text(section.example, 74, y + 43, { width: 446, lineGap: 4 });

  const actionY = y + 125;
  doc.roundedRect(54, actionY, 486, 92, 16).fill(C.navy);
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(C.orange)
    .text('ACCIÓN PARA HOY', 74, actionY + 18, { characterSpacing: 1 });
  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(C.white)
    .text(section.action, 74, actionY + 42, { width: 446, lineGap: 4 });
  addFooter(doc, guide, pageNumber);
}

function addFinal(doc, guide, pageNumber) {
  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.cream);
  doc.roundedRect(54, 58, 486, 170, 24).fill(C.navy);
  doc
    .font('Helvetica-Bold')
    .fontSize(28)
    .fillColor(C.white)
    .text('Plan de implementación', 80, 88);
  doc
    .font('Helvetica')
    .fontSize(13)
    .fillColor('#B9DDE3')
    .text('Convierte lo aprendido en una rutina medible.', 80, 130);
  ['Elige una sección prioritaria', 'Aplica la acción durante 7 días', 'Mide respuestas, mensajes y ventas'].forEach(
    (item, index) => {
      doc.circle(93, 174 + index * 28, 8).fill(index === 2 ? C.orange : C.teal);
      doc
        .font('Helvetica-Bold')
        .fontSize(9)
        .fillColor(C.white)
        .text(String(index + 1), 89, 170 + index * 28, { width: 8, align: 'center' });
      doc.font('Helvetica').fontSize(11).fillColor(C.white).text(item, 114, 168 + index * 28);
    }
  );

  doc
    .font('Helvetica-Bold')
    .fontSize(20)
    .fillColor(C.navy)
    .text('Checklist semanal', 54, 285);
  const checklist = [
    'Mi perfil explica claramente qué vendo y para quién.',
    'Cada contenido tiene un objetivo y un CTA.',
    'Respondí comentarios y mensajes con contexto.',
    'Registré las piezas que generaron conversaciones.',
    'Elegí una mejora concreta para la próxima semana.',
  ];
  checklist.forEach((item, index) => {
    const y = 335 + index * 55;
    doc.roundedRect(54, y, 32, 32, 8).lineWidth(1.2).strokeColor(C.teal).stroke();
    doc.font('Helvetica').fontSize(11).fillColor(C.ink).text(item, 105, y + 8, { width: 420 });
  });

  doc.roundedRect(54, 650, 486, 74, 16).fill(C.white);
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(C.teal)
    .text('RECUERDA', 74, 670, { characterSpacing: 1 });
  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(C.ink)
    .text('Crecer no significa publicar más. Significa comunicar mejor, conversar y repetir lo que aporta resultados.', 160, 666, {
      width: 355,
      lineGap: 3,
    });
  addFooter(doc, guide, pageNumber);
}

async function generate(guide) {
  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 54, right: 54, bottom: 54, left: 54 },
      info: {
        Title: guide.title,
        Author: 'KitNegocio',
        Subject: guide.subtitle,
      },
      autoFirstPage: true,
    });
    const output = fs.createWriteStream(path.join(OUT, guide.file));
    output.on('finish', resolve);
    output.on('error', reject);
    doc.pipe(output);
    addCover(doc, guide);
    addIntro(doc, guide, 2);
    guide.sections.forEach((section, index) => addSection(doc, guide, section, index, index + 3));
    addFinal(doc, guide, guide.sections.length + 3);
    doc.end();
  });
}

for (const guide of guides) {
  await generate(guide);
  console.log(`Generado: ${guide.file}`);
}
