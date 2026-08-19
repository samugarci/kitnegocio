export type LegalPageType = 'terms' | 'privacy' | 'cookies' | 'legalNotice';

const supportEmail = 'soporte@kitnegocio.com';
const companyName = 'KitNegocio Digital S.A.S.';
const companyCity = 'Ciudad de México, Estados Unidos Mexicanos';
const productNameEs = 'Acceso Completo';
const productNameEn = 'Full Access';
const priceLabel = 'USD $19.99';
const lastUpdatedEs = '2 de agosto de 2026';
const lastUpdatedEn = 'August 2, 2026';

const content: Record<string, Record<LegalPageType, { title: string; body: string }>> = {
  es: {
    terms: {
      title: 'Términos y Condiciones',
      body: `<div class="rounded-2xl border border-brand/15 bg-brand-light/40 p-4 text-sm"><strong>Resumen comercial:</strong> compra única de ${priceLabel}. Sin suscripción. Sin devoluciones de dinero. Producto digital de acceso inmediato.</div>

<h2>1. Identificación del proveedor</h2>
<p><strong>${companyName}</strong> ("KitNegocio", "nosotros" o "el Proveedor"), con domicilio en ${companyCity}, opera la plataforma digital KitNegocio y comercializa el producto digital denominado <strong>${productNameEs}</strong>.</p>
<p><strong>Correo de contacto:</strong> <a href="mailto:${supportEmail}">${supportEmail}</a></p>
<p>Estos Términos y Condiciones regulan el acceso y uso del sitio web, la creación de cuentas, la compra del ${productNameEs} y el uso del área privada de miembros.</p>

<h2>2. Aceptación vinculante</h2>
<p>Al crear una cuenta, marcar las casillas de aceptación, completar el pago o utilizar el servicio, usted declara haber leído, comprendido y aceptado estos Términos en su integridad, junto con la <a href="/es/privacidad">Política de Privacidad</a>, la <a href="/es/cookies">Política de Cookies</a> y el <a href="/es/aviso-legal">Aviso Legal</a>.</p>
<p>Si no está de acuerdo, no debe adquirir ni utilizar el servicio. Estos Términos constituyen un contrato electrónico vinculante entre usted ("Usuario", "Cliente" o "Comprador") y ${companyName}.</p>
<p>El Usuario declara ser mayor de edad y tener capacidad legal para contratar conforme a la legislación aplicable.</p>

<h2>3. Naturaleza del producto y servicios incluidos</h2>
<p>KitNegocio ofrece una <strong>compra única</strong> de acceso digital a catálogos, guías educativas, plantillas y materiales de contenido para Instagram y WhatsApp Business, destinados a que el Usuario publique, atienda y venda a <strong>sus propios clientes</strong>.</p>
<p>El precio vigente del ${productNameEs} es de <strong>diecinueve dólares con noventa y nueve centavos de los Estados Unidos de América (${priceLabel})</strong>, salvo oferta promocional expresamente publicada.</p>
<p><strong>Servicios incluidos en el ${productNameEs}:</strong></p>
<ul>
<li>Acceso privado al área de miembros (biblioteca con licencia).</li>
<li>Guías PDF para feed de Instagram, Reels, Stories y WhatsApp Business.</li>
<li>Calendarios / planes de publicación y bancos de captions y hashtags.</li>
<li>Descarga individual o por pack completo, según disponibilidad técnica.</li>
<li>Soporte por correo sobre compra, acceso y descargas.</li>
</ul>
<p><strong>Servicios no incluidos:</strong> gestión de redes por agencia, publicidad pagada, diseño a medida, garantías de ventas o herramientas de acceso a cuentas/datos de terceros.</p>
<p>El servicio <strong>no</strong> incluye herramientas para acceder, leer, interceptar, monitorear o controlar cuentas, chats, dispositivos o datos de terceros. Cualquier uso ilícito queda estrictamente prohibido.</p>
<p>KitNegocio no garantiza resultados comerciales, ventas, alcance en redes sociales ni ingresos específicos. El contenido es educativo y de apoyo operativo. La descripción completa de servicios consta también en el <a href="/es/aviso-legal">Aviso Legal y Descripción de Servicios</a>.</p>

<h2>4. Compra única — sin suscripción</h2>
<p>El modelo comercial es de <strong>pago único</strong>. No existe cobro recurrente automático, renovación mensual ni periodo de prueba gratuito asociado a esta oferta.</p>
<p>Una vez confirmado el pago, se otorga acceso al área privada de miembros y a los materiales incluidos en el ${productNameEs}, conforme a la disponibilidad técnica y a estos Términos.</p>
<p>El acceso se mantiene mientras la cuenta del Usuario permanezca activa y no haya sido suspendida o cancelada por incumplimiento.</p>

<h2>5. Proceso de pago y facturación</h2>
<p>Los pagos se procesan a través de proveedores de pago seguros (incluyendo Stripe u otros equivalentes). KitNegocio no almacena el número completo de tarjeta, CVC ni datos de autenticación bancaria.</p>
<p>El Usuario es responsable de suministrar información de facturación veraz y de disponer de fondos suficientes. Un pago rechazado, fallido o revertido por el emisor de la tarjeta no genera obligación de entrega del acceso hasta la confirmación efectiva del cobro.</p>
<p>Los precios se muestran en dólares de los Estados Unidos de América (USD). Cualquier conversión, comisión bancaria o impuesto aplicable según el país del Usuario será de su responsabilidad, salvo que la ley disponga lo contrario.</p>

<h2>6. Política de no reembolsos (cláusula esencial)</h2>
<p><strong>Dado el carácter digital e inmediato del producto, NO SE REALIZAN DEVOLUCIONES, REEMBOLSOS NI COMPENSACIONES DE NINGÚN DINERO</strong>, bajo ninguna circunstancia, incluyendo, sin limitarse a:</p>
<ul>
<li>Arrepentimiento o cambio de opinión tras la compra.</li>
<li>Desconocimiento de estos Términos o de la naturaleza digital del producto.</li>
<li>Falta de uso, uso parcial o insatisfacción subjetiva con los resultados comerciales.</li>
<li>Errores del Usuario al proporcionar datos de cuenta o de pago.</li>
<li>Incompatibilidad con dispositivos, navegadores o aplicaciones de terceros (incluido Canva), salvo falla imputable exclusivamente a KitNegocio que impida de forma total e irreparable el acceso durante un periodo prolongado.</li>
<li>Duplicidad de compra ocasionada por el Usuario.</li>
</ul>
<p>Al completar la compra, el Usuario reconoce expresamente que:</p>
<ul>
<li>Adquiere un bien digital de entrega inmediata o cuasi inmediata.</li>
<li>Renuncia a cualquier derecho de retracto o reembolso en la máxima medida permitida por la ley aplicable.</li>
<li>Ha tenido la oportunidad de revisar el contenido comercial del sitio y estos Términos antes de pagar.</li>
</ul>
<p>Únicamente en caso de cobro duplicado demostrable por error técnico del sistema de pagos, KitNegocio podrá, a su exclusivo criterio, corregir el cobro indebido previa verificación. Ello no constituye una política general de reembolsos.</p>

<h2>7. Licencia de uso</h2>
<p>Se concede al Usuario una licencia personal, limitada, no exclusiva, intransferible y revocable para usar los materiales adquiridos en el marco de su actividad comercial propia.</p>
<p>Queda prohibido: revender, redistribuir, sublicenciar, publicar en repositorios públicos, compartir credenciales de acceso, o comercializar los archivos como producto independiente.</p>

<h2>8. Cuenta, seguridad y uso prohibido</h2>
<p>El Usuario es responsable de la confidencialidad de su correo y contraseña, y de toda actividad realizada bajo su cuenta. Debe notificar de inmediato cualquier uso no autorizado a ${supportEmail}.</p>
<p>Está prohibido usar el servicio para actividades ilícitas, spam, fraude, suplantación, violación de derechos de terceros o cualquier conducta contraria a la ley o a estos Términos.</p>
<p>KitNegocio podrá suspender o cancelar el acceso ante sospecha razonable de fraude, abuso, incumplimiento o uso ilícito, sin derecho a reembolso.</p>

<h2>9. Propiedad intelectual</h2>
<p>Todo el contenido, diseño, marcas, textos, estructuras y materiales de KitNegocio son propiedad de ${companyName} o de sus licenciantes. La compra no transfiere titularidad de derechos de autor ni de marcas.</p>

<h2>10. Disponibilidad y modificaciones</h2>
<p>KitNegocio podrá actualizar, ampliar o reorganizar el contenido del ${productNameEs}. Tales mejoras no generan obligación de reembolso ni de compensación adicional.</p>
<p>Podremos modificar estos Términos publicando la versión actualizada en el sitio. El uso continuado tras la publicación implica aceptación de los cambios, salvo que la ley exija consentimiento expreso adicional.</p>

<h2>11. Limitación de responsabilidad</h2>
<p>El servicio se ofrece "tal cual" y "según disponibilidad". KitNegocio no garantiza resultados de ventas, alcance en redes sociales ni ingresos específicos.</p>
<p>En la máxima medida permitida por la ley, la responsabilidad total de KitNegocio frente al Usuario por cualquier reclamo relacionado con la compra no excederá el monto efectivamente pagado por el ${productNameEs} (${priceLabel} o el precio promocional abonado).</p>
<p>No seremos responsables por daños indirectos, lucro cesante, pérdida de datos o interrupciones causadas por terceros (pasarelas de pago, hosting, Canva, Meta, WhatsApp, etc.).</p>

<h2>12. Protección de datos</h2>
<p>El tratamiento de datos personales se rige por nuestra <a href="/es/privacidad">Política de Privacidad</a> y la normativa mexicana aplicable (incluida la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento).</p>

<h2>13. Ley aplicable y disputas</h2>
<p>Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia se someterá a los tribunales competentes de la Ciudad de México, sin perjuicio de derechos irrenunciables del consumidor cuando resulten aplicables y no hayan sido válidamente limitados.</p>

<h2>14. Contacto</h2>
<p>Para consultas legales o de soporte: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
<p><em>Última actualización: ${lastUpdatedEs}</em></p>`,
    },
    privacy: {
      title: 'Política de Privacidad',
      body: `<div class="rounded-2xl border border-brand/15 bg-brand-light/40 p-4 text-sm">Esta Política informa cómo ${companyName} trata datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y demás normas aplicables en México.</div>

<h2>1. Responsable del tratamiento</h2>
<p><strong>Razón social:</strong> ${companyName}<br/>
<strong>Domicilio:</strong> ${companyCity}<br/>
<strong>Correo de contacto / derechos ARCO:</strong> <a href="mailto:${supportEmail}">${supportEmail}</a></p>

<h2>2. Alcance</h2>
<p>Aplica a visitantes del sitio, compradores del ${productNameEs}, usuarios del área de miembros y personas que contacten soporte.</p>

<h2>3. Datos personales que tratamos</h2>
<ul>
<li><strong>Identificación y contacto:</strong> nombre completo, correo electrónico, teléfono (opcional).</li>
<li><strong>Cuenta:</strong> credenciales cifradas (hash de contraseña), rol, estado de acceso, fechas de registro y último ingreso.</li>
<li><strong>Pago:</strong> datos de facturación y confirmación de pago procesados por Stripe u otro procesador. KitNegocio no almacena número completo de tarjeta, CVC ni claves bancarias.</li>
<li><strong>Uso del servicio:</strong> registros de actividad interna (inicio de sesión, descargas, cambios administrativos) y preferencias técnicas (idioma, consentimiento de cookies).</li>
<li><strong>Soporte:</strong> mensajes enviados a través de formularios o correo.</li>
</ul>

<h2>4. Finalidades del tratamiento</h2>
<ul>
<li>Crear y administrar la cuenta del Usuario.</li>
<li>Procesar la compra única del ${productNameEs} y otorgar acceso digital.</li>
<li>Permitir descargas protegidas y soporte técnico.</li>
<li>Cumplir obligaciones legales, contables, de seguridad y prevención de fraude.</li>
<li>Mejorar la experiencia del sitio y, solo si el Usuario lo autoriza, usar cookies analíticas.</li>
<li>Enviar comunicaciones operativas relacionadas con la compra o la cuenta (no spam comercial no solicitado).</li>
</ul>

<h2>5. Base legal / legitimación</h2>
<p>El tratamiento se fundamenta en: (i) la ejecución del contrato de compra y prestación del acceso digital; (ii) el consentimiento del titular cuando corresponda (por ejemplo, cookies no esenciales); (iii) el cumplimiento de obligaciones legales; y (iv) el interés legítimo de seguridad, soporte y mejora del servicio, sin menoscabar derechos del titular.</p>

<h2>6. Encargados y terceros</h2>
<p>Podemos compartir datos estrictamente necesarios con:</p>
<ul>
<li><strong>Stripe</strong> u otro procesador de pagos, para cobrar y confirmar la compra.</li>
<li><strong>Proveedores de hosting / infraestructura</strong> (por ejemplo, plataforma de despliegue o base de datos), bajo obligaciones de confidencialidad y seguridad.</li>
<li><strong>Autoridades</strong>, cuando exista requerimiento legal válido.</li>
</ul>
<p>No vendemos bases de datos de usuarios.</p>

<h2>7. Transferencias internacionales</h2>
<p>Algunos proveedores pueden procesar datos fuera de México. En ese caso, KitNegocio adoptará medidas razonables para que el tratamiento observe estándares de seguridad y confidencialidad compatibles con la normativa aplicable.</p>

<h2>8. Conservación</h2>
<p>Conservaremos los datos mientras la cuenta esté activa y durante el tiempo adicional necesario para: cumplir obligaciones legales, resolver disputas, prevenir fraude y mantener registros de la relación contractual. Los registros de actividad interna pueden depurarse periódicamente desde el panel administrativo.</p>

<h2>9. Seguridad</h2>
<p>Aplicamos medidas técnicas y organizativas razonables: cifrado SSL/TLS en tránsito, hash de contraseñas, cookies de sesión httpOnly, control de acceso al área de miembros y restricción de descargas a usuarios autenticados con acceso activo.</p>
<p>Ningún sistema es 100% seguro; el Usuario también debe proteger sus credenciales.</p>

<h2>10. Derechos ARCO del titular</h2>
<p>Conforme a la LFPDPPP, usted puede ejercer los derechos de:</p>
<ul>
<li><strong>Acceso:</strong> conocer qué datos personales tenemos sobre usted.</li>
<li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
<li><strong>Cancelación:</strong> pedir la eliminación de sus datos cuando proceda.</li>
<li><strong>Oposición:</strong> oponerse al tratamiento en los supuestos que permita la ley.</li>
<li>Revocar el consentimiento y presentar quejas ante el INAI cuando corresponda.</li>
</ul>
<p>Para ejercer estos derechos, escriba a <a href="mailto:${supportEmail}">${supportEmail}</a> indicando nombre, correo registrado y solicitud concreta. Responderemos en los plazos legales aplicables.</p>

<h2>11. Menores de edad</h2>
<p>El servicio está dirigido a personas con capacidad legal para contratar. No recopilamos conscientemente datos de menores. Si detectamos un registro indebido, podremos eliminarlo.</p>

<h2>12. Cookies</h2>
<p>El uso de cookies se regula en la <a href="/es/cookies">Política de Cookies</a> y en el banner de consentimiento del sitio.</p>

<h2>13. Cambios</h2>
<p>Podremos actualizar esta Política publicando la versión vigente en esta página. La fecha de actualización aparecerá al final del documento.</p>

<h2>14. Contacto</h2>
<p>Canal oficial: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
<p><em>Última actualización: ${lastUpdatedEs}</em></p>`,
    },
    cookies: {
      title: 'Política de Cookies',
      body: `<div class="rounded-2xl border border-brand/15 bg-brand-light/40 p-4 text-sm">Usamos cookies esenciales para el funcionamiento del sitio y cookies opcionales solo si usted las acepta.</div>

<h2>1. ¿Qué son las cookies?</h2>
<p>Las cookies son pequeños archivos que se almacenan en su navegador o dispositivo cuando visita un sitio web. Permiten recordar preferencias, mantener la sesión iniciada y, si usted lo autoriza, medir el uso del sitio de forma agregada.</p>

<h2>2. Responsable</h2>
<p>${companyName}, ${companyCity}. Contacto: <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>

<h2>3. Tipos de cookies que utilizamos</h2>
<table>
<thead><tr><th>Tipo</th><th>Finalidad</th><th>¿Requiere consentimiento?</th></tr></thead>
<tbody>
<tr><td><strong>Esenciales / técnicas</strong></td><td>Idioma (next-intl), sesión de miembros (<code>kitnegocio_session</code>), preferencia de consentimiento de cookies.</td><td>No (necesarias para el servicio)</td></tr>
<tr><td><strong>Analíticas (opcionales)</strong></td><td>Medición anónima o agregada de uso del sitio para mejorar la experiencia.</td><td>Sí</td></tr>
</tbody>
</table>
<p>Actualmente, las cookies analíticas solo se activan si usted las acepta o configura desde el banner. KitNegocio no usa cookies publicitarias de terceros para remarketing en esta versión del sitio.</p>

<h2>4. Cookies y almacenamiento local relevantes</h2>
<ul>
<li><strong>kitnegocio_session:</strong> cookie httpOnly de autenticación del área privada.</li>
<li><strong>cookie-consent / cookie-analytics:</strong> preferencias guardadas en el navegador sobre su decisión de cookies.</li>
<li>Preferencias de idioma asociadas a la navegación del sitio.</li>
</ul>

<h2>5. Base legal</h2>
<p>Las cookies esenciales se usan porque son necesarias para prestar el servicio solicitado. Las cookies no esenciales se usan solo con su consentimiento, que puede retirar en cualquier momento borrando el almacenamiento del sitio o rechazando cookies en una nueva visita tras limpiar preferencias.</p>

<h2>6. Cómo gestionar cookies</h2>
<ul>
<li>Desde el banner de cookies: Aceptar, Rechazar o Configurar.</li>
<li>Desde la configuración de su navegador (bloqueo, eliminación o modo privado).</li>
<li>Consultando esta Política en <a href="/es/cookies">/es/cookies</a>.</li>
</ul>
<p>Si rechaza cookies no esenciales, el sitio seguirá funcionando; solo se limitarán mediciones opcionales.</p>

<h2>7. Conservación</h2>
<p>La sesión de miembros tiene vigencia limitada (renovable al iniciar sesión). Las preferencias de consentimiento se conservan en su navegador hasta que usted las elimine o las modifique.</p>

<h2>8. Más información</h2>
<p>Para datos personales, consulte la <a href="/es/privacidad">Política de Privacidad</a>. Para consultas: <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
<p><em>Última actualización: ${lastUpdatedEs}</em></p>`,
    },
    legalNotice: {
      title: 'Aviso Legal y Descripción de Servicios',
      body: `<div class="rounded-2xl border border-brand/15 bg-brand-light/40 p-4 text-sm"><strong>Documento oficial de la empresa:</strong> identifica al titular del sitio, describe los servicios comerciales de KitNegocio y establece las condiciones generales de uso legales del producto digital <strong>${productNameEs}</strong>.</div>

<h2>1. Datos identificativos del titular</h2>
<p><strong>Razón social / titular del sitio:</strong> ${companyName}<br/>
<strong>Nombre comercial:</strong> KitNegocio<br/>
<strong>Domicilio:</strong> ${companyCity}<br/>
<strong>Correo electrónico de contacto:</strong> <a href="mailto:${supportEmail}">${supportEmail}</a><br/>
<strong>Sitio web:</strong> plataforma digital KitNegocio (versión web bilingüe ES/EN)<br/>
<strong>Actividad económica:</strong> comercialización de productos digitales educativos y de apoyo comercial para emprendedores y negocios que publican y venden en Instagram y WhatsApp Business.</p>

<h2>2. Objeto de este documento</h2>
<p>El presente Aviso Legal tiene por objeto:</p>
<ul>
<li>Identificar legalmente a ${companyName} como responsable del sitio y de la prestación del servicio digital.</li>
<li>Describir de forma clara y concreta los <strong>servicios</strong> que ofrece KitNegocio.</li>
<li>Informar las condiciones generales de acceso, uso, propiedad intelectual, responsabilidad y jurisdicción aplicables.</li>
<li>Remitir a los documentos contractuales complementarios: <a href="/es/terminos">Términos y Condiciones</a>, <a href="/es/privacidad">Política de Privacidad</a> y <a href="/es/cookies">Política de Cookies</a>.</li>
</ul>

<h2>3. Descripción de los servicios de KitNegocio</h2>
<p>KitNegocio comercializa el producto digital denominado <strong>${productNameEs}</strong>, mediante <strong>compra única</strong> de <strong>${priceLabel}</strong> (salvo promoción publicada), con acceso inmediato al área privada de miembros.</p>

<h3>3.1 Qué incluye el servicio</h3>
<ul>
<li><strong>Biblioteca digital con licencia:</strong> acceso privado, autenticado y protegido a materiales descargables.</li>
<li><strong>Guías PDF de Instagram:</strong> sistemas de publicaciones (posts), guiones de Reels y secuencias de Stories orientadas a publicar y vender.</li>
<li><strong>Catálogo / guías de WhatsApp Business:</strong> mensajes, flujos de atención, seguimiento y apoyo comercial para conversaciones con clientes propios del Usuario.</li>
<li><strong>Planificación de contenido:</strong> calendarios y rutinas de publicación (por ejemplo, planes de 30 días).</li>
<li><strong>Banco de captions y hashtags:</strong> textos y fórmulas de copy para acompañar publicaciones.</li>
<li><strong>Packs archivados:</strong> materiales de periodos anteriores incluidos en el Acceso Completo, según disponibilidad en el área de miembros.</li>
<li><strong>Soporte por correo:</strong> asistencia operativa sobre compra, acceso o descargas a través de <a href="mailto:${supportEmail}">${supportEmail}</a>, en horarios y plazos publicados en la página de Soporte.</li>
</ul>

<h3>3.2 Qué NO incluye el servicio</h3>
<ul>
<li>No es una agencia de marketing ni incluye gestión humana continua de redes sociales.</li>
<li>No garantiza ventas, alcance, viralidad ni ingresos específicos.</li>
<li>No incluye diseño personalizado a medida, ni cuenta Canva Pro, ni publicidad pagada (Meta Ads).</li>
<li>No incluye herramientas para acceder, leer, interceptar, monitorear o controlar cuentas, chats, dispositivos o datos de terceros.</li>
<li>No es un software de espionaje, vigilancia o extracción de información ajena.</li>
<li>No incluye suscripción mensual ni renovaciones automáticas asociadas a esta oferta de compra única.</li>
</ul>

<h3>3.3 Destinatarios del servicio</h3>
<p>El servicio está dirigido a personas físicas o jurídicas con capacidad legal para contratar, en particular emprendedores, freelancers, negocios locales y marcas que deseen usar contenido propio en Instagram y WhatsApp Business. El Usuario debe ser mayor de edad conforme a la legislación aplicable.</p>

<h3>3.4 Licencia de uso del contenido</h3>
<p>Tras la compra, se concede una licencia <strong>personal, limitada, no exclusiva, intransferible y revocable</strong> para usar los materiales en la actividad comercial propia del Usuario. Queda prohibido revender, redistribuir, sublicenciar, publicar los archivos como producto independiente o compartir credenciales de acceso.</p>

<h2>4. Objeto del sitio web</h2>
<p>El sitio web de KitNegocio permite: (i) informar sobre el producto y sus condiciones; (ii) procesar la compra única del ${productNameEs}; (iii) crear y autenticar cuentas de usuario; (iv) entregar acceso al área privada; y (v) facilitar descargas protegidas de los materiales adquiridos.</p>

<h2>5. Condiciones de uso del sitio</h2>
<p>El acceso y uso del sitio implica la aceptación del <a href="/es/terminos">Términos y Condiciones</a>, la <a href="/es/privacidad">Política de Privacidad</a> y la <a href="/es/cookies">Política de Cookies</a>.</p>
<p>El Usuario se compromete a un uso lícito, diligente y de buena fe, sin dañar, inutilizar o sobrecargar el sitio ni vulnerar derechos de terceros.</p>

<h2>6. Condiciones comerciales esenciales</h2>
<ul>
<li><strong>Precio:</strong> ${priceLabel} por compra única (salvo oferta publicada).</li>
<li><strong>Modalidad:</strong> producto digital de acceso inmediato o cuasi inmediato tras confirmación de pago.</li>
<li><strong>Pagos:</strong> procesados por Stripe u otro procesador seguro. KitNegocio no almacena el número completo de tarjeta ni el CVC.</li>
<li><strong>No reembolsos:</strong> por la naturaleza digital e inmediata del producto, <strong>no se realizan devoluciones ni reembolsos de dinero</strong>, en los términos detallados en los Términos y Condiciones.</li>
</ul>

<h2>7. Propiedad intelectual e industrial</h2>
<p>Todos los contenidos del sitio y de los packs (textos, diseños, logotipos, tipografías, estructuras, plantillas, guías, catálogos y demás materiales) están protegidos por derechos de propiedad intelectual e industrial de ${companyName} o de terceros licenciantes.</p>
<p>La compra del ${productNameEs} <strong>no transfiere</strong> la titularidad de derechos de autor ni de marcas; únicamente concede la licencia de uso descrita.</p>

<h2>8. Protección de datos personales</h2>
<p>El tratamiento de datos personales se rige por la <a href="/es/privacidad">Política de Privacidad</a> y la normativa mexicana aplicable (incluida la LFPDPPP). Canal ARCO / contacto: <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>

<h2>9. Exclusión de garantías y responsabilidad</h2>
<p>KitNegocio procura la continuidad y seguridad del sitio, pero no garantiza disponibilidad ininterrumpida ni ausencia total de errores técnicos. No responde por daños derivados de:</p>
<ul>
<li>Uso indebido del sitio o de los materiales por parte del Usuario.</li>
<li>Fallos de terceros (pasarelas de pago, hosting, redes sociales, Canva, Meta, WhatsApp, operadores de internet).</li>
<li>Decisiones comerciales tomadas con base en el contenido educativo o de apoyo.</li>
</ul>
<p>La limitación cuantitativa de responsabilidad contractual se detalla en los <a href="/es/terminos">Términos y Condiciones</a>.</p>

<h2>10. Enlaces a terceros</h2>
<p>El sitio puede contener enlaces a terceros. KitNegocio no controla ni responde por el contenido, políticas o prácticas de sitios externos.</p>

<h2>11. Legislación y jurisdicción</h2>
<p>Este Aviso Legal se rige por las leyes de los Estados Unidos Mexicanos. Salvo norma imperativa en contrario, las controversias se someterán a los tribunales competentes de la Ciudad de México.</p>

<h2>12. Contacto oficial</h2>
<p>Para notificaciones legales, solicitudes de información sobre servicios o dudas sobre este Aviso: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
<p><em>Última actualización: ${lastUpdatedEs}</em></p>`,
    },
  },
  en: {
    terms: {
      title: 'Terms and Conditions',
      body: `<div class="rounded-2xl border border-brand/15 bg-brand-light/40 p-4 text-sm"><strong>Commercial summary:</strong> one-time purchase of ${priceLabel}. No subscription. No money refunds. Digital product with immediate access.</div>

<h2>1. Provider identification</h2>
<p><strong>${companyName}</strong> ("KitNegocio", "we" or "the Provider"), based in ${companyCity}, operates the KitNegocio digital platform and sells the digital product called <strong>${productNameEn}</strong>.</p>
<p><strong>Contact email:</strong> <a href="mailto:${supportEmail}">${supportEmail}</a></p>
<p>These Terms govern access to and use of the website, account creation, purchase of ${productNameEn}, and use of the private members area.</p>

<h2>2. Binding acceptance</h2>
<p>By creating an account, checking the acceptance boxes, completing payment or using the service, you confirm that you have read, understood and accepted these Terms in full, together with the <a href="/en/privacidad">Privacy Policy</a>, <a href="/en/cookies">Cookie Policy</a> and <a href="/en/aviso-legal">Legal Notice</a>.</p>
<p>If you do not agree, you must not purchase or use the service. These Terms form a binding electronic contract between you ("User", "Customer" or "Buyer") and ${companyName}.</p>
<p>The User represents that they are of legal age and have capacity to contract under applicable law.</p>

<h2>3. Nature of the product and included services</h2>
<p>KitNegocio offers a <strong>one-time purchase</strong> of digital access to catalogs, educational guides, templates and content materials for Instagram and WhatsApp Business, so the User can publish, serve and sell to <strong>their own customers</strong>.</p>
<p>The current ${productNameEn} price is <strong>nineteen United States dollars and ninety-nine cents (${priceLabel})</strong>, unless an expressly published promotion applies.</p>
<p><strong>Services included in ${productNameEn}:</strong></p>
<ul>
<li>Private access to the members area (licensed library).</li>
<li>PDF guides for Instagram feed, Reels, Stories and WhatsApp Business.</li>
<li>Publishing calendars/plans and caption/hashtag banks.</li>
<li>Individual or full-pack downloads, subject to technical availability.</li>
<li>Email support regarding purchase, access and downloads.</li>
</ul>
<p><strong>Services not included:</strong> agency social-media management, paid advertising, custom design, sales guarantees, or tools to access third-party accounts/data.</p>
<p>The service does <strong>not</strong> include tools to access, read, intercept, monitor or control third-party accounts, chats, devices or data. Any unlawful use is strictly prohibited.</p>
<p>KitNegocio does not guarantee commercial results, sales, social-media reach or specific income. The content is educational and operational support. The full service description is also set out in the <a href="/en/aviso-legal">Legal Notice and Service Description</a>.</p>

<h2>4. One-time purchase — no subscription</h2>
<p>The commercial model is a <strong>single payment</strong>. There is no automatic recurring charge, monthly renewal or free trial associated with this offer.</p>
<p>Once payment is confirmed, access is granted to the private members area and the materials included in ${productNameEn}, subject to technical availability and these Terms.</p>
<p>Access remains available while the User's account stays active and has not been suspended or terminated for breach.</p>

<h2>5. Payment and billing</h2>
<p>Payments are processed through secure payment providers (including Stripe or equivalents). KitNegocio does not store full card numbers, CVC or bank authentication data.</p>
<p>The User is responsible for providing accurate billing information and sufficient funds. A rejected, failed or reversed payment does not create an obligation to deliver access until the charge is effectively confirmed.</p>
<p>Prices are shown in United States dollars (USD). Any conversion, bank fee or applicable tax according to the User's country is the User's responsibility, unless otherwise required by law.</p>

<h2>6. No-refund policy (essential clause)</h2>
<p><strong>Because of the digital and immediate nature of the product, NO REFUNDS, RETURNS OR MONEY COMPENSATION OF ANY KIND ARE PROVIDED</strong>, under any circumstances, including without limitation:</p>
<ul>
<li>Buyer's remorse or change of mind after purchase.</li>
<li>Failure to read these Terms or misunderstanding the digital nature of the product.</li>
<li>Non-use, partial use or subjective dissatisfaction with business results.</li>
<li>User errors when providing account or payment data.</li>
<li>Incompatibility with devices, browsers or third-party apps (including Canva), except a failure exclusively attributable to KitNegocio that totally and irreparably prevents access for a prolonged period.</li>
<li>Duplicate purchase caused by the User.</li>
</ul>
<p>By completing the purchase, the User expressly acknowledges that:</p>
<ul>
<li>They are acquiring a digital good with immediate or near-immediate delivery.</li>
<li>They waive any right of withdrawal or refund to the maximum extent permitted by applicable law.</li>
<li>They had the opportunity to review the site's commercial content and these Terms before paying.</li>
</ul>
<p>Only in the event of a demonstrable duplicate charge caused by a payment-system technical error may KitNegocio, at its sole discretion, correct the improper charge after verification. This does not constitute a general refund policy.</p>

<h2>7. License of use</h2>
<p>The User is granted a personal, limited, non-exclusive, non-transferable and revocable license to use the purchased materials within their own commercial activity.</p>
<p>It is prohibited to resell, redistribute, sublicense, publish in public repositories, share access credentials, or commercialize the files as a standalone product.</p>

<h2>8. Account, security and prohibited use</h2>
<p>The User is responsible for the confidentiality of their email and password and for all activity under their account. Any unauthorized use must be reported immediately to ${supportEmail}.</p>
<p>It is prohibited to use the service for unlawful activities, spam, fraud, impersonation, infringement of third-party rights or any conduct contrary to law or these Terms.</p>
<p>KitNegocio may suspend or terminate access upon reasonable suspicion of fraud, abuse, breach or unlawful use, without any right to a refund.</p>

<h2>9. Intellectual property</h2>
<p>All KitNegocio content, design, trademarks, texts, structures and materials are owned by ${companyName} or its licensors. Purchase does not transfer copyright or trademark ownership.</p>

<h2>10. Availability and changes</h2>
<p>KitNegocio may update, expand or reorganize ${productNameEn} content. Such improvements do not create any refund or additional compensation obligation.</p>
<p>We may amend these Terms by publishing the updated version on the site. Continued use after publication constitutes acceptance of the changes, unless applicable law requires additional express consent.</p>

<h2>11. Limitation of liability</h2>
<p>The service is provided "as is" and "as available". KitNegocio does not guarantee sales results, social-media reach or specific income.</p>
<p>To the maximum extent permitted by law, KitNegocio's total liability to the User for any claim related to the purchase shall not exceed the amount actually paid for ${productNameEn} (${priceLabel} or the promotional price paid).</p>
<p>We are not liable for indirect damages, lost profits, data loss or interruptions caused by third parties (payment gateways, hosting, Canva, Meta, WhatsApp, etc.).</p>

<h2>12. Data protection</h2>
<p>Personal-data processing is governed by our <a href="/en/privacidad">Privacy Policy</a> and applicable Mexican law (including the Federal Law on Protection of Personal Data Held by Private Parties and its Regulations).</p>

<h2>13. Governing law and disputes</h2>
<p>These Terms are governed by the laws of the United Mexican States. Any dispute shall be submitted to the competent courts of Mexico City, without prejudice to non-waivable consumer rights where applicable and not validly limited.</p>

<h2>14. Contact</h2>
<p>For legal or support inquiries: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
<p><em>Last updated: ${lastUpdatedEn}</em></p>`,
    },
    privacy: {
      title: 'Privacy Policy',
      body: `<div class="rounded-2xl border border-brand/15 bg-brand-light/40 p-4 text-sm">This Policy explains how ${companyName} processes personal data under Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP) and other applicable rules.</div>

<h2>1. Data controller</h2>
<p><strong>Company:</strong> ${companyName}<br/>
<strong>Address:</strong> ${companyCity}<br/>
<strong>Contact / ARCO rights channel:</strong> <a href="mailto:${supportEmail}">${supportEmail}</a></p>

<h2>2. Scope</h2>
<p>Applies to website visitors, ${productNameEn} buyers, members-area users and people who contact support.</p>

<h2>3. Personal data we process</h2>
<ul>
<li><strong>Identity and contact:</strong> full name, email, phone (optional).</li>
<li><strong>Account:</strong> hashed password credentials, role, access status, registration and last-login dates.</li>
<li><strong>Payment:</strong> billing and payment confirmation data processed by Stripe or another processor. KitNegocio does not store full card numbers, CVC or bank credentials.</li>
<li><strong>Service use:</strong> internal activity logs (login, downloads, admin changes) and technical preferences (language, cookie consent).</li>
<li><strong>Support:</strong> messages sent through forms or email.</li>
</ul>

<h2>4. Purposes</h2>
<ul>
<li>Create and manage the User account.</li>
<li>Process the one-time ${productNameEn} purchase and grant digital access.</li>
<li>Enable protected downloads and technical support.</li>
<li>Meet legal, accounting, security and fraud-prevention obligations.</li>
<li>Improve the site experience and, only if authorized, use analytics cookies.</li>
<li>Send operational communications related to the purchase or account.</li>
</ul>

<h2>5. Legal bases</h2>
<p>Processing is based on: (i) performance of the purchase/access contract; (ii) the data subject's consent when required (e.g., non-essential cookies); (iii) compliance with legal obligations; and (iv) legitimate interests in security, support and service improvement, without overriding the data subject's rights.</p>

<h2>6. Processors and third parties</h2>
<p>We may share strictly necessary data with:</p>
<ul>
<li><strong>Stripe</strong> or another payment processor, to charge and confirm the purchase.</li>
<li><strong>Hosting / infrastructure providers</strong>, under confidentiality and security obligations.</li>
<li><strong>Authorities</strong>, when a valid legal request exists.</li>
</ul>
<p>We do not sell user databases.</p>

<h2>7. International transfers</h2>
<p>Some providers may process data outside Mexico. In that case, KitNegocio will take reasonable measures so processing observes security and confidentiality standards compatible with applicable law.</p>

<h2>8. Retention</h2>
<p>We keep data while the account is active and for the additional time needed to meet legal duties, resolve disputes, prevent fraud and keep contractual records. Internal activity logs may be purged periodically from the admin panel.</p>

<h2>9. Security</h2>
<p>We apply reasonable technical and organizational measures: SSL/TLS in transit, password hashing, httpOnly session cookies, members-area access control and download restriction to authenticated users with active access.</p>
<p>No system is 100% secure; the User must also protect their credentials.</p>

<h2>10. ARCO rights</h2>
<p>Under the LFPDPPP, you may exercise the rights of:</p>
<ul>
<li><strong>Access:</strong> know what personal data we hold about you.</li>
<li><strong>Rectification:</strong> request correction of inaccurate or incomplete data.</li>
<li><strong>Cancellation:</strong> request deletion of your data when appropriate.</li>
<li><strong>Opposition:</strong> object to processing in the cases allowed by law.</li>
<li>Revoke consent and file complaints with INAI when applicable.</li>
</ul>
<p>To exercise these rights, email <a href="mailto:${supportEmail}">${supportEmail}</a> with your name, registered email and specific request. We will respond within applicable legal timeframes.</p>

<h2>11. Minors</h2>
<p>The service is intended for persons with legal capacity to contract. We do not knowingly collect minors' data. If an improper registration is detected, we may delete it.</p>

<h2>12. Cookies</h2>
<p>Cookie use is governed by the <a href="/en/cookies">Cookie Policy</a> and the site consent banner.</p>

<h2>13. Changes</h2>
<p>We may update this Policy by publishing the current version on this page. The update date appears at the end of the document.</p>

<h2>14. Contact</h2>
<p>Official channel: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
<p><em>Last updated: ${lastUpdatedEn}</em></p>`,
    },
    cookies: {
      title: 'Cookie Policy',
      body: `<div class="rounded-2xl border border-brand/15 bg-brand-light/40 p-4 text-sm">We use essential cookies for site operation and optional cookies only if you accept them.</div>

<h2>1. What are cookies?</h2>
<p>Cookies are small files stored in your browser or device when you visit a website. They help remember preferences, keep you signed in and, if you authorize it, measure aggregated site usage.</p>

<h2>2. Controller</h2>
<p>${companyName}, ${companyCity}. Contact: <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>

<h2>3. Types of cookies we use</h2>
<table>
<thead><tr><th>Type</th><th>Purpose</th><th>Consent required?</th></tr></thead>
<tbody>
<tr><td><strong>Essential / technical</strong></td><td>Language (next-intl), members session (<code>kitnegocio_session</code>), cookie-consent preference.</td><td>No (necessary for the service)</td></tr>
<tr><td><strong>Analytics (optional)</strong></td><td>Anonymous or aggregated usage measurement to improve the experience.</td><td>Yes</td></tr>
</tbody>
</table>
<p>Analytics cookies are enabled only if you accept or configure them from the banner. This version of the site does not use third-party advertising/remarketing cookies.</p>

<h2>4. Relevant cookies and local storage</h2>
<ul>
<li><strong>kitnegocio_session:</strong> httpOnly authentication cookie for the private area.</li>
<li><strong>cookie-consent / cookie-analytics:</strong> browser-stored preferences about your cookie decision.</li>
<li>Language preferences associated with site navigation.</li>
</ul>

<h2>5. Legal basis</h2>
<p>Essential cookies are used because they are necessary to provide the requested service. Non-essential cookies are used only with your consent, which you may withdraw at any time by clearing site storage or rejecting cookies on a later visit after clearing preferences.</p>

<h2>6. How to manage cookies</h2>
<ul>
<li>From the cookie banner: Accept, Reject or Configure.</li>
<li>From your browser settings (block, delete or private mode).</li>
<li>By reading this Policy at <a href="/en/cookies">/en/cookies</a>.</li>
</ul>
<p>If you reject non-essential cookies, the site will still work; only optional measurement will be limited.</p>

<h2>7. Retention</h2>
<p>The members session has a limited lifetime (renewable on sign-in). Consent preferences remain in your browser until you delete or change them.</p>

<h2>8. More information</h2>
<p>For personal data, see the <a href="/en/privacidad">Privacy Policy</a>. For inquiries: <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
<p><em>Last updated: ${lastUpdatedEn}</em></p>`,
    },
    legalNotice: {
      title: 'Legal Notice and Service Description',
      body: `<div class="rounded-2xl border border-brand/15 bg-brand-light/40 p-4 text-sm"><strong>Official company document:</strong> identifies the website owner, describes KitNegocio's commercial services and sets the general legal terms of use for the digital product <strong>${productNameEn}</strong>.</div>

<h2>1. Website owner identification</h2>
<p><strong>Legal name / site owner:</strong> ${companyName}<br/>
<strong>Trade name:</strong> KitNegocio<br/>
<strong>Address:</strong> ${companyCity}<br/>
<strong>Contact email:</strong> <a href="mailto:${supportEmail}">${supportEmail}</a><br/>
<strong>Website:</strong> KitNegocio digital platform (bilingual ES/EN web version)<br/>
<strong>Business activity:</strong> sale of educational and commercial-support digital products for entrepreneurs and businesses that publish and sell on Instagram and WhatsApp Business.</p>

<h2>2. Purpose of this document</h2>
<p>This Legal Notice is intended to:</p>
<ul>
<li>Legally identify ${companyName} as responsible for the site and the digital service.</li>
<li>Clearly describe the <strong>services</strong> offered by KitNegocio.</li>
<li>Inform the general conditions of access, use, intellectual property, liability and jurisdiction.</li>
<li>Point to the complementary contractual documents: <a href="/en/terminos">Terms and Conditions</a>, <a href="/en/privacidad">Privacy Policy</a> and <a href="/en/cookies">Cookie Policy</a>.</li>
</ul>

<h2>3. Description of KitNegocio services</h2>
<p>KitNegocio sells the digital product called <strong>${productNameEn}</strong>, through a <strong>one-time purchase</strong> of <strong>${priceLabel}</strong> (unless a published promotion applies), with immediate access to the private members area.</p>

<h3>3.1 What the service includes</h3>
<ul>
<li><strong>Licensed digital library:</strong> private, authenticated and protected access to downloadable materials.</li>
<li><strong>Instagram PDF guides:</strong> post systems, Reel scripts and Story sequences designed to publish and sell.</li>
<li><strong>WhatsApp Business catalogs/guides:</strong> messages, service flows, follow-up and commercial support for conversations with the User's own customers.</li>
<li><strong>Content planning:</strong> calendars and publishing routines (for example, 30-day plans).</li>
<li><strong>Captions and hashtag bank:</strong> copy formulas to accompany posts.</li>
<li><strong>Archived packs:</strong> prior-period materials included with Full Access, as available in the members area.</li>
<li><strong>Email support:</strong> operational help about purchase, access or downloads via <a href="mailto:${supportEmail}">${supportEmail}</a>, under the Support page timelines.</li>
</ul>

<h3>3.2 What the service does NOT include</h3>
<ul>
<li>It is not a marketing agency and does not include ongoing human social-media management.</li>
<li>It does not guarantee sales, reach, virality or specific income.</li>
<li>It does not include custom design, Canva Pro accounts or paid ads (Meta Ads).</li>
<li>It does not include tools to access, read, intercept, monitor or control third-party accounts, chats, devices or data.</li>
<li>It is not spyware, surveillance software or a tool to extract other people's information.</li>
<li>It does not include a monthly subscription or automatic renewals associated with this one-time offer.</li>
</ul>

<h3>3.3 Intended users</h3>
<p>The service is intended for natural or legal persons with capacity to contract, especially entrepreneurs, freelancers, local businesses and brands that want to use their own content on Instagram and WhatsApp Business. The User must be of legal age under applicable law.</p>

<h3>3.4 Content license</h3>
<p>After purchase, a <strong>personal, limited, non-exclusive, non-transferable and revocable</strong> license is granted to use the materials within the User's own commercial activity. Reselling, redistributing, sublicensing, publishing the files as a standalone product or sharing access credentials is prohibited.</p>

<h2>4. Purpose of the website</h2>
<p>The KitNegocio website allows users to: (i) learn about the product and its conditions; (ii) complete the one-time ${productNameEn} purchase; (iii) create and authenticate accounts; (iv) receive private-area access; and (v) download purchased materials securely.</p>

<h2>5. Website terms of use</h2>
<p>Access to and use of the site implies acceptance of the <a href="/en/terminos">Terms and Conditions</a>, <a href="/en/privacidad">Privacy Policy</a> and <a href="/en/cookies">Cookie Policy</a>.</p>
<p>The User agrees to use the site lawfully, diligently and in good faith, without damaging, disabling or overloading the site or infringing third-party rights.</p>

<h2>6. Essential commercial terms</h2>
<ul>
<li><strong>Price:</strong> ${priceLabel} for a one-time purchase (unless a published offer applies).</li>
<li><strong>Format:</strong> digital product with immediate or near-immediate access after payment confirmation.</li>
<li><strong>Payments:</strong> processed by Stripe or another secure processor. KitNegocio does not store full card numbers or CVC.</li>
<li><strong>No refunds:</strong> due to the digital and immediate nature of the product, <strong>no money refunds are provided</strong>, as detailed in the Terms and Conditions.</li>
</ul>

<h2>7. Intellectual and industrial property</h2>
<p>All site and pack contents (texts, designs, logos, fonts, structures, templates, guides, catalogs and other materials) are protected by intellectual and industrial property rights of ${companyName} or third-party licensors.</p>
<p>Purchase of ${productNameEn} does <strong>not transfer</strong> copyright or trademark ownership; it only grants the license described above.</p>

<h2>8. Personal data protection</h2>
<p>Personal-data processing is governed by the <a href="/en/privacidad">Privacy Policy</a> and applicable Mexican law (including the LFPDPPP). ARCO / contact channel: <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>

<h2>9. Disclaimer of warranties and liability</h2>
<p>KitNegocio seeks continuity and security of the site, but does not guarantee uninterrupted availability or total absence of technical errors. It is not liable for damages arising from:</p>
<ul>
<li>Improper use of the site or materials by the User.</li>
<li>Failures of third parties (payment gateways, hosting, social networks, Canva, Meta, WhatsApp, internet providers).</li>
<li>Business decisions made based on the educational or support content.</li>
</ul>
<p>Quantitative contractual liability limits are detailed in the <a href="/en/terminos">Terms and Conditions</a>.</p>

<h2>10. Third-party links</h2>
<p>The site may contain third-party links. KitNegocio does not control or accept responsibility for external sites' content, policies or practices.</p>

<h2>11. Governing law and jurisdiction</h2>
<p>This Legal Notice is governed by the laws of the United Mexican States. Unless mandatory law provides otherwise, disputes shall be submitted to the competent courts of Mexico City.</p>

<h2>12. Official contact</h2>
<p>For legal notices, service information requests or questions about this Notice: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
<p><em>Last updated: ${lastUpdatedEn}</em></p>`,
    },
  },
};

export default function LegalContent({
  page,
  locale,
}: {
  page: LegalPageType;
  locale: string;
}) {
  const lang = locale === 'en' ? 'en' : 'es';
  const pageContent = content[lang][page];
  const links =
    lang === 'en'
      ? [
          { href: `/${locale}/terminos`, label: 'Terms and Conditions', key: 'terms' },
          { href: `/${locale}/privacidad`, label: 'Privacy Policy', key: 'privacy' },
          { href: `/${locale}/cookies`, label: 'Cookie Policy', key: 'cookies' },
          { href: `/${locale}/aviso-legal`, label: 'Legal Notice & Services', key: 'legalNotice' },
        ]
      : [
          { href: `/${locale}/terminos`, label: 'Términos y Condiciones', key: 'terms' },
          { href: `/${locale}/privacidad`, label: 'Política de Privacidad', key: 'privacy' },
          { href: `/${locale}/cookies`, label: 'Política de Cookies', key: 'cookies' },
          { href: `/${locale}/aviso-legal`, label: 'Aviso Legal y Servicios', key: 'legalNotice' },
        ];

  return (
    <article>
      <div className="mb-8 border-b border-brand/10 pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
          {lang === 'en' ? 'Legal documents' : 'Documentos legales'}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
          {pageContent.title}
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          {`${companyName} · Ciudad de México, México · ${supportEmail}`}
        </p>
      </div>

      <nav
        aria-label={lang === 'en' ? 'Legal navigation' : 'Navegación legal'}
        className="mb-8 flex flex-wrap gap-2"
      >
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              link.key === page
                ? 'border-brand bg-brand text-white'
                : 'border-brand/15 bg-white text-brand hover:border-brand/40'
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="legal-content" dangerouslySetInnerHTML={{ __html: pageContent.body }} />

      {page === 'legalNotice' && (
        <div className="mt-8 rounded-2xl border border-brand/15 bg-brand-light/50 p-5">
          <p className="text-sm font-bold text-ink">
            {lang === 'en' ? 'Downloadable company legal summary' : 'Resumen legal descargable de la empresa'}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {lang === 'en'
              ? 'Keep a copy of the service description and commercial framework for your records.'
              : 'Conserva una copia de la descripción de servicios y el marco comercial para tus archivos.'}
          </p>
          <a
            href="/legal/DOCUMENTO-LEGAL-KITNEGOCIO.md"
            download
            className="mt-3 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            {lang === 'en' ? 'Download legal document (.md)' : 'Descargar documento legal (.md)'}
          </a>
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-ink-faint">
        {lang === 'en'
          ? 'This document is provided for transparency and contractual clarity. For specific legal advice about your situation, consult a qualified attorney. Commercial operations use a one-time USD $19.99 purchase with no money refunds.'
          : 'Este documento se publica para transparencia y claridad contractual. Para asesoría jurídica específica sobre su caso, consulte a un abogado calificado. La operación comercial es compra única de USD $19.99 sin devoluciones de dinero.'}
      </div>
    </article>
  );
}
