export type LegalPageType = 'terms' | 'privacy' | 'cookies' | 'legalNotice';

const supportEmail = 'soporte@kitnegocio.com';

const content: Record<string, Record<LegalPageType, { title: string; body: string }>> = {
  es: {
    terms: {
      title: 'Términos y Condiciones',
      body: `<h2>1. Identificación</h2>
<p>KitNegocio Digital S.A.S. ("KitNegocio"), con domicilio en Bogotá, Colombia, opera el servicio de suscripción mensual de packs de contenido para Instagram y WhatsApp Business.</p>
<h2>2. Naturaleza del servicio</h2>
<p>KitNegocio ofrece acceso mensual a plantillas editables (Canva, PDF, Excel) para que el suscriptor publique y atienda a <strong>sus propios clientes</strong>: posts, Reels, Stories, calendarios y mensajes de WhatsApp Business. El contenido se renueva cada mes y la biblioteca histórica permanece accesible mientras la suscripción esté activa.</p>
<p>El servicio <strong>no</strong> incluye herramientas para acceder, leer o interceptar cuentas, chats o dispositivos de terceros.</p>
<h2>3. Suscripción y pago</h2>
<p>Hay dos planes mensuales en USD: <strong>Starter ($11.99/mes)</strong> con <strong>7 días de prueba gratis</strong>, y <strong>Pro ($25.99/mes)</strong> con <strong>15 días de prueba gratis</strong>. Durante la prueba no se cobra. Al terminar, se cobra el precio del plan elegido cada mes hasta que canceles. Los pagos se procesan de forma segura a través de Stripe.</p>
<p>Al activar la suscripción, autorizas el cobro automático del plan seleccionado al finalizar el periodo de prueba y los cobros mensuales posteriores.</p>
<h2>4. Cancelación</h2>
<p>Puedes cancelar en cualquier momento desde tu área de miembros → "Gestionar suscripción". La cancelación es efectiva al final del periodo de facturación actual. No hay penalización por cancelar.</p>
<h2>5. Uso de plantillas</h2>
<p>Las plantillas son para uso comercial propio. No puedes revenderlas, redistribuirlas ni sublicenciarlas como producto independiente.</p>
<h2>6. Propiedad intelectual</h2>
<p>Todo el contenido, diseño y marcas de KitNegocio son propiedad de KitNegocio Digital S.A.S.</p>
<h2>7. Política de reembolsos</h2>
<p>Los cobros posteriores al periodo de prueba no son reembolsables, salvo error de facturación. Contacta a ${supportEmail} dentro de los 7 días del cobro.</p>
<h2>8. Limitación de responsabilidad</h2>
<p>KitNegocio no se hace responsable por decisiones de negocio tomadas con base en las plantillas o guías proporcionadas.</p>
<h2>9. Ley aplicable</h2>
<p>Estos términos se rigen por las leyes de la República de Colombia.</p>
<p><em>Última actualización: Marzo 2026</em></p>`,
    },
    privacy: {
      title: 'Política de Privacidad',
      body: `<h2>1. Responsable del tratamiento</h2>
<p>KitNegocio Digital S.A.S., Bogotá, Colombia. Contacto: ${supportEmail}</p>
<h2>2. Datos que recopilamos</h2>
<ul><li>Nombre completo</li><li>Correo electrónico</li><li>Teléfono (opcional)</li><li>Datos de pago (procesados por Stripe, no almacenamos tarjetas)</li><li>Datos de uso del área de miembros</li></ul>
<h2>3. Finalidad</h2>
<ul><li>Gestión de suscripciones y pagos</li><li>Acceso al área de miembros</li><li>Envío de packs mensuales y recordatorios</li><li>Soporte al cliente</li></ul>
<h2>4. Derechos del titular</h2>
<p>Conforme a la Ley 1581 de 2012, puedes conocer, actualizar, rectificar y suprimir tus datos escribiendo a ${supportEmail}.</p>
<h2>5. Seguridad</h2>
<p>Implementamos cifrado SSL/TLS y procesamiento seguro de pagos vía Stripe.</p>
<p><em>Última actualización: Marzo 2026</em></p>`,
    },
    cookies: {
      title: 'Política de Cookies',
      body: `<h2>1. ¿Qué son las cookies?</h2>
<p>Archivos de texto almacenados en su dispositivo al visitar nuestro sitio.</p>
<h2>2. Cookies que utilizamos</h2>
<ul><li><strong>Esenciales:</strong> preferencias de idioma, sesión de miembros</li><li><strong>Analíticas (opcionales):</strong> métricas anónimas de uso</li></ul>
<h2>3. Gestión</h2>
<p>Puede aceptar, rechazar o configurar cookies desde el banner del sitio.</p>
<p><em>Última actualización: Marzo 2026</em></p>`,
    },
    legalNotice: {
      title: 'Aviso Legal',
      body: `<h2>1. Datos identificativos</h2>
<p><strong>Titular:</strong> KitNegocio Digital S.A.S.<br/><strong>Domicilio:</strong> Bogotá, Colombia<br/><strong>Email:</strong> ${supportEmail}</p>
<h2>2. Objeto</h2>
<p>Servicio de suscripción digital de plantillas para emprendedores.</p>
<h2>3. Propiedad intelectual</h2>
<p>Contenidos protegidos. Reproducción prohibida sin autorización.</p>
<p><em>Última actualización: Marzo 2026</em></p>`,
    },
  },
  en: {
    terms: {
      title: 'Terms and Conditions',
      body: `<h2>1. Identification</h2>
<p>KitNegocio Digital S.A.S. ("KitNegocio"), Bogotá, Colombia, operates a monthly subscription for Instagram and WhatsApp Business content packs.</p>
<h2>2. Nature of the service</h2>
<p>KitNegocio provides monthly editable templates (Canva, PDF, Excel) so subscribers can publish and serve <strong>their own customers</strong>: posts, Reels, Stories, calendars and WhatsApp Business messages. Content renews monthly and the historical library remains accessible while the subscription is active.</p>
<p>The service does <strong>not</strong> include tools to access, read or intercept third-party accounts, chats or devices.</p>
<h2>3. Subscription and payment</h2>
<p>There are two monthly USD plans: <strong>Starter ($11.99/mo)</strong> with a <strong>7-day free trial</strong>, and <strong>Pro ($25.99/mo)</strong> with a <strong>15-day free trial</strong>. You are not charged during the trial. When it ends, your selected plan price is billed each month until you cancel. Payments are processed securely through Stripe.</p>
<p>By activating the subscription, you authorize automatic billing of the selected plan after the trial and subsequent monthly charges.</p>
<h2>4. Cancellation</h2>
<p>You may cancel anytime from your members area → "Manage subscription". Cancellation takes effect at the end of the current billing period.</p>
<h2>5. Template use</h2>
<p>Templates are for your own commercial use. You may not resell, redistribute, or sublicense them as a standalone product.</p>
<h2>6. Refund policy</h2>
<p>Charges after the trial period are non-refundable except for billing errors. Contact ${supportEmail} within 7 days of the charge.</p>
<h2>7. Applicable law</h2>
<p>Governed by the laws of Colombia.</p>
<p><em>Last updated: March 2026</em></p>`,
    },
    privacy: {
      title: 'Privacy Policy',
      body: `<h2>1. Data controller</h2>
<p>KitNegocio Digital S.A.S., Bogotá, Colombia. ${supportEmail}</p>
<h2>2. Data collected</h2>
<ul><li>Full name, email, phone (optional)</li><li>Payment data (via Stripe — we do not store card numbers)</li><li>Members area usage data</li></ul>
<h2>3. Your rights</h2>
<p>Access, update, rectify, and delete your data by contacting ${supportEmail}.</p>
<h2>4. Security</h2>
<p>SSL/TLS encryption and secure payment processing via Stripe.</p>
<p><em>Last updated: March 2026</em></p>`,
    },
    cookies: {
      title: 'Cookie Policy',
      body: `<h2>1. What are cookies?</h2>
<p>Small text files stored on your device when visiting our site.</p>
<h2>2. Cookies we use</h2>
<ul><li><strong>Essential:</strong> language preferences, members session</li><li><strong>Analytics (optional):</strong> anonymous usage metrics</li></ul>
<h2>3. Management</h2>
<p>Accept, reject, or configure cookies from the site banner.</p>
<p><em>Last updated: March 2026</em></p>`,
    },
    legalNotice: {
      title: 'Legal Notice',
      body: `<h2>1. Identifying information</h2>
<p><strong>Owner:</strong> KitNegocio Digital S.A.S.<br/><strong>Address:</strong> Bogotá, Colombia<br/><strong>Email:</strong> ${supportEmail}</p>
<h2>2. Purpose</h2>
<p>Digital template subscription service for entrepreneurs.</p>
<h2>3. Intellectual property</h2>
<p>Protected contents. Reproduction prohibited without authorization.</p>
<p><em>Last updated: March 2026</em></p>`,
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

  return (
    <article>
      <h1 className="mb-8 font-display text-3xl font-bold text-ink md:text-4xl">{pageContent.title}</h1>
      <div className="legal-content" dangerouslySetInnerHTML={{ __html: pageContent.body }} />
    </article>
  );
}
