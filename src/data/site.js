// Contenido y datos de contacto centralizados.
// Todo se muestra con interpolación de Vue ({{ }}), que escapa HTML automáticamente.
// Nunca se usa v-html con estos datos.

export const site = {
  phoneDisplay: '33 3797 2486',
  phoneTel: '+523337972486',
  schedule: 'Lunes a Viernes de 9:00 a 18:00 hrs',
  address: ['Calle 22 de abril #63', 'C.P. 45235', 'Zapopan, Jalisco, México'],
  tagline: 'Lavamos Tu Negocio Hacia el Mañana',
  // TODO: reemplazar por las URLs oficiales (solo https).
  social: [
    { name: 'Facebook', icon: 'bi-facebook', url: 'https://www.facebook.com/' },
    { name: 'Instagram', icon: 'bi-instagram', url: 'https://www.instagram.com/' },
    { name: 'YouTube', icon: 'bi-youtube', url: 'https://www.youtube.com/' }
  ],
  // TODO: crear estas páginas (el aviso de privacidad es necesario porque el formulario recolecta datos personales).
  legal: {
    terms: '/terminos-y-condiciones.html',
    privacy: '/aviso-de-privacidad.html'
  }
}

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Best Fin', href: '#best-fin', active: true },
  { label: 'Equipos', href: '#equipos' },
  { label: 'Ventajas', href: '#ventajas' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' }
]

export const levels = [
  { pct: '10%', label: 'Lanzamiento', icon: 'bi-check-lg' },
  { pct: '12%', label: 'Vamos subiendo', icon: 'bi-check-lg' },
  { pct: '15%', label: 'Nivel máximo desbloqueado', icon: 'bi-unlock-fill', max: true }
]

export const benefits = [
  {
    icon: 'bi-stack',
    title: 'Equipos comerciales para crecer',
    text: 'Alta durabilidad, eficiencia y tecnología LG.'
  },
  {
    icon: 'bi-graph-up-arrow',
    title: 'Espacios compactos y rentables',
    text: 'Soluciones que se adaptan a tu espacio y maximizan tu rentabilidad.'
  },
  {
    icon: 'bi-people',
    title: 'Acompañamiento en tu proyecto',
    text: 'Te asesoramos de principio a fin para que tu lavandería sea un éxito.'
  },
  {
    icon: 'bi-tag',
    title: 'Promoción Best Fin por tiempo limitado',
    text: 'Aprovecha hasta 15% de descuento en equipos seleccionados.'
  }
]

export const steps = [
  {
    n: 1,
    icon: 'bi-lightbulb',
    title: 'Idea y planeación',
    text: 'Te asesoramos en la selección de equipos, distribución del espacio y proyección de tu inversión.',
    img: 'proceso-1-planeacion.jpg',
    alt: 'Boceto y planeación de una lavandería'
  },
  {
    n: 2,
    icon: 'bi-tools',
    title: 'Puesta en marcha',
    text: 'Contarás con nuestra asesoría para que realices tu instalación y puesta en marcha correctamente.',
    img: 'proceso-2-puesta-en-marcha.jpg',
    alt: 'Lavadora y secadora comerciales LG listas para instalar'
  },
  {
    n: 3,
    icon: 'bi-bar-chart-line',
    title: 'Tu negocio en operación',
    text: 'Empieza a generar ingresos con equipos confiables y de alto rendimiento.',
    img: 'proceso-3-operacion.jpg',
    alt: 'Lavandería en operación con equipos LG'
  }
]

export const features = [
  { icon: 'bi-shield-check', label: 'Mayor durabilidad' },
  { icon: 'bi-leaf', label: 'Eficiencia en consumo' },
  { icon: 'bi-stopwatch', label: 'Ciclos rápidos de 20-55 minutos' }
]

export const bannerChecks = [
  'Equipos de clase mundial',
  'Asesoría especializada',
  'Asesoría y soporte LG',
  'Tu lavandería, un mejor futuro'
]

// TODO: validar/ajustar estas respuestas con LG antes de publicar (no venían en el PDF).
export const faqs = [
  {
    q: '¿Qué promociones hay en lavadoras comerciales durante el Best Fin?',
    a: 'Durante Best Fin hay descuentos por niveles en equipos comerciales seleccionados, hasta 15%. Solicita tu cotización y un asesor te confirmará modelos participantes, vigencia y condiciones.'
  },
  {
    q: '¿Qué capacidad necesito según mi operación?',
    a: 'Depende del volumen de ropa que esperas atender y del espacio disponible. Un asesor de LG Commercial Laundry México puede ayudarte a dimensionar tus equipos.'
  },
  {
    q: '¿Qué equipo necesito para empezar mi lavandería?',
    a: 'Lo habitual es combinar lavadoras y secadoras comerciales acordes a tu tipo de negocio. Comparte tu proyecto en el formulario y te recomendamos la mejor configuración.'
  },
  {
    q: '¿Me ayudan a planear mi lavandería?',
    a: 'Sí. Te acompañamos desde la idea y la planeación (selección de equipos y distribución del espacio) hasta la puesta en marcha.'
  }
]

export const estados = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México',
  'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit',
  'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
  'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
]

export const localOptions = [
  { value: 'si', label: 'Sí, ya tengo local' },
  { value: 'buscando', label: 'Lo estoy buscando' },
  { value: 'no', label: 'Todavía no' }
]

// TODO: ajustar rangos al criterio comercial.
export const inversionOptions = [
  { value: 'menos-300k', label: 'Menos de $300,000 MXN' },
  { value: '300k-600k', label: '$300,000 – $600,000 MXN' },
  { value: '600k-1m', label: '$600,000 – $1,000,000 MXN' },
  { value: 'mas-1m', label: 'Más de $1,000,000 MXN' }
]
