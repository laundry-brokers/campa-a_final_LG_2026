<script setup>
import { reactive, ref } from 'vue'
import SmartImg from './components/SmartImg.vue'

// ===== CONFIG =====
const ENDPOINT = '' // URL de tu backend (mismo dominio). Vacio = modo demo.
const TEL = { texto: '33 3797 2486', href: 'tel:+523337972486' }
const REDES = [ // pon aqui las URLs reales
  { i: 'bi-facebook', n: 'Facebook', url: '#' }, { i: 'bi-instagram', n: 'Instagram', url: '#' }, { i: 'bi-youtube', n: 'YouTube', url: '#' }
]

const year = new Date().getFullYear()
const menu = [
  { href: '#inicio', t: 'Inicio' }, { href: '#bestfin', t: 'Best Fin' }, { href: '#equipos', t: 'Equipos' },
  { href: '#ventajas', t: 'Ventajas' }, { href: '#faq', t: 'FAQ' }, { href: '#contacto', t: 'Contacto' }
]
// ===== NIVELES POR FECHA (hora de Ciudad de Mexico) 
const NIVELES = [
  { p: '10%', desde: '2026-11-01', f: '1 al 9 nov', t: 'Primer pago', i: 'bi-check-lg' },
  { p: '12%', desde: '2026-11-10', f: '10 al 12 nov', t: 'Esta cerca', i: 'bi-check-lg' },
  { p: '15%', desde: '2026-11-13', f: '13 al 30 nov', t: 'Nivel máximo desbloqueado', i: 'bi-unlock-fill' }
]
function hoyMX () {
  const q = new URLSearchParams(location.search).get('fecha')
  if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) return q
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' }).format(new Date()) // YYYY-MM-DD
}
const hoy = hoyMX()
let nivelActual = 0
NIVELES.forEach((n, k) => { if (hoy >= n.desde) nivelActual = k })
const pctActual = NIVELES[nivelActual].p
// Solo se muestra el descuento vigente (el que corresponde a la fecha de hoy)
const niveles = [NIVELES[nivelActual]]
const beneficios = [
  { i: 'bi-coin', t: 'Equipos comerciales para crecer', d: 'Alta durabilidad, eficiencia y tecnología LG.' },
  { i: 'bi-graph-up-arrow', t: 'Espacios compactos y rentables', d: 'Soluciones que se adaptan a tu espacio y maximizan tu rentabilidad.' },
  { i: 'bi-people', t: 'Acompañamiento en tu proyecto', d: 'Te asesoramos de principio a fin para que tu lavandería sea un éxito.' },
  { i: 'bi-tag', t: 'Promoción Best Fin por tiempo limitado', d: 'Aprovecha hasta 15% de descuento en equipos seleccionados.' }
]
const pasos = [
  { n: 1, i: 'bi-lightbulb', t: 'Idea y planeación', d: 'Te asesoramos en la selección de equipos, distribución del espacio y proyección de tu inversión.', img: 'paso-1' },
  { n: 2, i: 'bi-wrench-adjustable', t: 'Puesta en marcha', d: 'Contarás con nuestra asesoría para que realices tu instalación y puesta en marcha correctamente.', img: 'paso-2' },
  { n: 3, i: 'bi-graph-up-arrow', t: 'Tu negocio en operación', d: 'Empieza a generar ingresos con equipos confiables y de alto rendimiento.', img: 'paso-3', fb: 'carrusel12-4', pos: '50% 18%' }
]
const extras = [
  { i: 'bi-shield-check', t: 'Mayor durabilidad' }, { i: 'bi-leaf', t: 'Eficiencia en consumo' }, { i: 'bi-clock-history', t: 'Ciclos rápidos de 20-55 minutos' }
]
const faqs = [
  { q: '¿Qué promociones hay en lavadoras comerciales durante el Best Fin?', a: 'Durante el Best Fin hay descuentos escalonados en equipos seleccionados, de hasta 15%. Un asesor te confirma modelos y condiciones vigentes.' },
  { q: '¿Qué capacidad necesito según mi operación?', a: 'Depende del volumen de ropa y del espacio disponible. Un asesor te ayuda a calcular la capacidad ideal para tu operación.' },
  { q: '¿Qué equipo necesito para empezar mi lavandería?', a: 'Te recomendamos la combinación de lavadoras y secadoras según tu proyecto, tu local y tu inversión.' },
  { q: '¿Me ayudan a planear mi lavandería?', a: 'Sí. Te acompañamos desde la idea y la distribución del espacio hasta la puesta en marcha.' }
]
const checks = ['Equipos de clase mundial', 'Asesoría especializada', 'Asesoría y soporte LG', 'Tu lavandería, un mejor futuro']
const estados = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila','Colima','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas']
const locales = ['Sí, ya tengo local', 'Lo estoy buscando', 'Aún no']
const montos = ['Menos de $100,000', '$100,000 – $300,000', '$300,000 – $600,000', 'Más de $600,000', 'Aún no lo defino']

// ===== FORMULARIO =====
const f = reactive({ nombre: '', celular: '', correo: '', estado: '', ciudad: '', local: '', monto: '', web: '' })
const err = reactive({})
const tocado = ref(false), enviando = ref(false)
const estado = reactive({ ok: false, msg: '' })
let ultimo = 0
const texto = /^[^<>]{2,}$/, cel = /^[0-9+()\-\s]{8,20}$/, mail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/

function validar () {
  Object.keys(err).forEach(k => delete err[k])
  if (!texto.test(f.nombre.trim())) err.nombre = 'Ingresa tu nombre.'
  if (!cel.test(f.celular.trim())) err.celular = 'Celular no válido.'
  if (!mail.test(f.correo.trim())) err.correo = 'Correo no válido.'
  if (!estados.includes(f.estado)) err.estado = 'Selecciona tu estado.'
  if (!texto.test(f.ciudad.trim())) err.ciudad = 'Ingresa tu ciudad.'
  if (!locales.includes(f.local)) err.local = 'Selecciona una opción.'
  if (!montos.includes(f.monto)) err.monto = 'Selecciona una opción.'
  return !Object.keys(err).length
}
const cls = k => (tocado.value ? { 'is-invalid': !!err[k], 'is-valid': !err[k] } : {})

async function enviar () {
  tocado.value = true; estado.msg = ''
  if (f.web) return                                  // honeypot
  if (!validar()) return
  if (Date.now() - ultimo < 15000) { estado.ok = false; estado.msg = 'Espera unos segundos antes de reenviar.'; return }
  enviando.value = true
  try {
    if (ENDPOINT) {
      const { web, ...datos } = f
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify(datos) })
      if (!r.ok) throw new Error('http')
    }
    ultimo = Date.now(); estado.ok = true; estado.msg = '¡Gracias! Un asesor de LG te contactará pronto.'
    Object.keys(f).forEach(k => (f[k] = '')); tocado.value = false
  } catch { estado.ok = false; estado.msg = 'No se pudo enviar. Inténtalo de nuevo.' }
  finally { enviando.value = false }
}
</script>

<template>
  <!-- NAV -->
  <nav class="navbar navbar-expand-lg nav-lg fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#inicio"><SmartImg name="logo-lg" fallback="logo" fb-class="logo-crop" alt="LG Commercial Laundry México" eager class="logo"><strong class="logo-txt">LG <small>Commercial Laundry México</small></strong></SmartImg></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Abrir menú"><span class="navbar-toggler-icon"></span></button>
      <div id="menu" class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto gap-lg-3">
          <li v-for="l in menu" :key="l.href" class="nav-item"><a class="nav-link" :class="{ on: l.href === '#bestfin' }" :href="l.href">{{ l.t }}</a></li>
        </ul>
        <a class="btn btn-lg-red" href="#contacto">Cotiza ahora <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <header id="inicio" class="hero">
    <div class="hero-bg"><SmartImg name="hero-wide" fallback="carrusel15-3" pos="center 65%" eager alt="" /></div>
    <div class="container hero-in">
      <div class="col-lg-6 px-0">
        <p class="hero-brand"><span>LG</span> <em>Best Fin</em></p>
        <h1 class="hero-h1">Llegamos al <span class="silver">{{ pctActual }}</span></h1>
        <p class="hero-sub">Ahora haz crecer tu proyecto.</p>
        <ul class="niveles list-unstyled">
          <li v-for="(n, k) in niveles" :key="n.p" class="max"><b>{{ n.p }}</b><span class="fecha">{{ n.f }}</span><i class="bi" :class="n.i"></i><small>{{ n.t }}</small></li>
        </ul>
        <div class="d-flex flex-wrap gap-2">
          <a class="btn btn-lg-red btn-cotiza" href="#contacto">Solicita tu cotización <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </div>
  </header>

  <!-- BENEFICIOS -->
  <section id="bestfin" class="sec">
    <div class="container text-center">
      <h2 class="h-lg">Más que equipos, <span class="red">una inversión en tu futuro</span></h2>
      <p class="text-secondary mb-4">Descubre por qué Best Fin es el momento ideal para hacer crecer tu lavandería.</p>
      <div class="row g-3">
        <div v-for="b in beneficios" :key="b.t" class="col-sm-6 col-lg-3">
          <article class="card-b h-100"><i class="bi" :class="b.i"></i><h3>{{ b.t }}</h3><p>{{ b.d }}</p></article>
        </div>
      </div>
    </div>
  </section>

  <!-- DE UNA IDEA A UN GRAN NEGOCIO -->
  <section class="idea">
    <div class="idea-l">
      <SmartImg name="idea-izq" fallback="carrusel12-2" pos="30% 30%" alt="Planeando tu lavandería" />
      <span class="tag-idea">De una idea<br>a un gran negocio</span>
      <ul class="hand-list list-unstyled d-none d-md-block"><li>Idea</li><li>Planeación</li><li>Espacio</li><li>Tu lavandería</li></ul>
    </div>
    <div class="idea-txt">
      <p class="mb-1">Tal vez hoy ves un espacio…</p>
      <h2 class="h-lg red mb-2">Nosotros vemos<br>el comienzo de tu negocio.</h2>
      <p class="small">Te ayudamos a convertir tu idea en una lavandería moderna, rentable y con el respaldo de LG.</p>
      <a class="btn btn-lg-red btn-sm" href="#ventajas">Conoce cómo <i class="bi bi-arrow-right"></i></a>
    </div>
    <div class="idea-img"><SmartImg name="idea-der" fallback="carrusel12-3" pos="50% 25%" alt="Tu lavandería lista" /></div>
  </section>

  <!-- PROCESO -->
  <section id="ventajas" class="sec">
    <div class="container text-center">
      <h2 class="h-lg">Un proceso simple, <span class="red">un gran resultado</span></h2>
      <p class="text-secondary mb-4">Te acompañamos en cada paso para que tu lavandería sea una realidad.</p>
      <div class="row g-4 justify-content-center">
        <div v-for="p in pasos" :key="p.n" class="col-md-4 paso-col">
          <article class="paso h-100">
            <div class="paso-img"><SmartImg :name="p.img" :fallback="p.fb" :pos="p.pos" optional :alt="p.t" /><span class="num">{{ p.n }}</span></div>
            <div class="paso-txt"><i class="bi" :class="p.i"></i><h3>{{ p.t }}</h3><p>{{ p.d }}</p></div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- APROVECHA + FORMULARIO -->
  <section id="equipos" class="split">
    <div class="split-l">
      <div class="wall"><SmartImg name="equipos-pared" alt="Equipos LG" /></div>
      <div class="split-txt">
        <span class="badge-bf">Best Fin</span>
        <h2 class="h-lg">Aprovecha <span class="red">Best Fin</span> y empieza tu lavandería <span class="red">con respaldo LG.</span></h2>
        <p class="small text-secondary">Equipos comerciales de alto rendimiento, ideales para hacer crecer tu negocio.</p>
        <ul class="extras list-unstyled"><li v-for="e in extras" :key="e.t"><i class="bi" :class="e.i"></i>{{ e.t }}</li></ul>
      </div>
    </div>
    <div id="contacto" class="split-r">
      <h2 class="form-h">Solicita tu cotización</h2>
      <p class="small mb-3">Un asesor de LG Commercial Laundry México te contactará para ayudarte a hacer realidad tu proyecto.</p>
      <form novalidate @submit.prevent="enviar">
        <div class="mb-2"><input v-model="f.nombre" class="form-control" :class="cls('nombre')" placeholder="Nombre completo*" aria-label="Nombre completo" maxlength="80" autocomplete="name"><div class="invalid-feedback">{{ err.nombre }}</div></div>
        <div class="mb-2"><input v-model="f.celular" type="tel" class="form-control" :class="cls('celular')" placeholder="Celular*" aria-label="Celular" maxlength="20" autocomplete="tel"><div class="invalid-feedback">{{ err.celular }}</div></div>
        <div class="mb-2"><input v-model="f.correo" type="email" class="form-control" :class="cls('correo')" placeholder="Correo electrónico*" aria-label="Correo electrónico" maxlength="120" autocomplete="email"><div class="invalid-feedback">{{ err.correo }}</div></div>
        <div class="row g-2 mb-2">
          <div class="col-6"><select v-model="f.estado" class="form-select" :class="cls('estado')" aria-label="Estado"><option value="">Estado*</option><option v-for="e in estados" :key="e">{{ e }}</option></select><div class="invalid-feedback">{{ err.estado }}</div></div>
          <div class="col-6"><input v-model="f.ciudad" class="form-control" :class="cls('ciudad')" placeholder="Ciudad*" aria-label="Ciudad" maxlength="60" autocomplete="address-level2"><div class="invalid-feedback">{{ err.ciudad }}</div></div>
        </div>
        <div class="mb-2"><select v-model="f.local" class="form-select" :class="cls('local')" aria-label="¿Ya tienes local?"><option value="">¿Ya tienes local?*</option><option v-for="o in locales" :key="o">{{ o }}</option></select><div class="invalid-feedback">{{ err.local }}</div></div>
        <div class="mb-3"><select v-model="f.monto" class="form-select" :class="cls('monto')" aria-label="Monto de inversión"><option value="">¿Cuál es tu monto de inversión?*</option><option v-for="o in montos" :key="o">{{ o }}</option></select><div class="invalid-feedback">{{ err.monto }}</div></div>
        <div class="hp" aria-hidden="true"><label>No llenar <input v-model="f.web" type="text" tabindex="-1" autocomplete="off"></label></div>
        <button class="btn btn-lg-red w-100 py-2" type="submit" :disabled="enviando">{{ enviando ? 'ENVIANDO…' : 'ENVIAR SOLICITUD' }} <i class="bi bi-arrow-right"></i></button>
        <p v-if="estado.msg" class="small mt-2 mb-0 text-center" :class="estado.ok ? 'text-success' : 'text-warning'" role="status">{{ estado.msg }}</p>
        <p v-else class="small mt-2 mb-0 text-center opacity-75"><i class="bi bi-lock-fill"></i> Tu información está segura con nosotros.</p>
      </form>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="sec">
    <div class="container">
      <div class="row g-4 align-items-start">
        <div class="col-lg-4"><h2 class="h-lg">Preguntas<br>frecuentes</h2><p class="text-secondary">Resuelve tus dudas sobre la promoción Best Fin.</p><a class="btn btn-lg-red btn-sm text-uppercase" href="#contacto">Ver todas las FAQs</a></div>
        <div class="col-lg-8">
          <div id="acc" class="accordion accordion-lg">
            <div v-for="(q, k) in faqs" :key="q.q" class="accordion-item">
              <h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#fq' + k" aria-expanded="false" :aria-controls="'fq' + k">{{ q.q }}</button></h3>
              <div :id="'fq' + k" class="accordion-collapse collapse" data-bs-parent="#acc"><div class="accordion-body">{{ q.a }}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BANNER FINAL -->
  <section class="banner">
    <div class="banner-art d-none d-lg-block"><SmartImg name="banner-15" fallback="carrusel15-3" pos="center 30%" alt="Hasta 15% de descuento" /></div>
    <div class="banner-in">
      <div class="row align-items-center g-3">
        <div class="col-md-6 text-center text-md-start">
          <span class="silver big15 d-lg-none">{{ pctActual }}</span>
          <div class="de-desc">DE<br>DESCUENTO</div>
          <p class="mb-0 mt-2">Ahora es el momento de crecer.</p>
        </div>
        <div class="col-md-6">
          <ul class="list-unstyled small mb-3"><li v-for="c in checks" :key="c" class="mb-1"><i class="bi bi-check-circle-fill text-info me-2"></i>{{ c }}</li></ul>
          <a class="btn btn-lg-red" href="#contacto">COTIZA HOY <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="foot">
    <div class="container">
      <div class="row align-items-center gy-3">
        <div class="col-lg-4"><SmartImg name="logo-lg-blanco" fallback="logo" fb-class="logo-crop logo-foot" alt="LG Commercial Laundry México" class="logo-f"><strong class="logo-txt">LG <small>Commercial Laundry México</small></strong></SmartImg><div class="small">Lavamos tu negocio hacia el mañana</div></div>
        <div class="col-6 col-lg-3"><i class="bi bi-telephone-fill fs-4 me-2"></i><span class="small">Llámanos<br><a :href="TEL.href" class="fw-bold fs-5">{{ TEL.texto }}</a><br>Lunes a Viernes de 9:00 a 18:00 hrs</span></div>
        <div class="col-6 col-lg-3"><i class="bi bi-geo-alt-fill fs-4 me-2"></i><span class="small">Visítanos<br>Calle 22 de abril #63<br>C.P. 45235 Zapopan, Jalisco, México</span></div>
        <div class="col-lg-2"><span class="small d-block">Síguenos</span><a v-for="r in REDES" :key="r.n" :href="r.url" target="_blank" rel="noopener noreferrer" :aria-label="r.n" class="me-2 fs-3"><i class="bi" :class="r.i"></i></a></div>
      </div>
      <hr class="opacity-25">
      <div class="d-flex flex-wrap justify-content-between small gap-2">
        <span><a v-for="l in menu.filter(m => ['#inicio','#equipos','#ventajas','#faq','#contacto'].includes(m.href))" :key="l.href" :href="l.href" class="me-3">{{ l.t }}</a></span>
        <span><a href="#">Términos y Condiciones</a> <span class="mx-2">|</span> <a href="#">Aviso de Privacidad</a> <span class="ms-3 opacity-75">© {{ year }}</span></span>
      </div>
    </div>
  </footer>
</template>
