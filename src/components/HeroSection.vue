<script setup>
import { levels } from '../data/site.js'
import { img } from '../utils/img.js'

const photo = img('hero-mujer-lavadora.jpg')
</script>

<template>
  <section id="inicio" class="hero section-pad">
    <div class="container">
      <div class="row align-items-center g-4">
        <div class="col-lg-6">
          <h1 class="m-0">
            <span class="hero-logo d-flex align-items-center flex-wrap" aria-label="LG Best Fin">
              <span class="hero-logo-lg">LG</span>
              <span class="tag-bestfin">Best Fin</span>
            </span>
            <span class="hero-title-sub d-block">Llegamos al</span>
            <span class="hero-pct d-block" aria-label="15 por ciento">15%</span>
          </h1>
          <p class="hero-lead mt-2 mb-0">Ahora haz crecer tu proyecto.</p>

          <ol class="levels-panel list-unstyled" aria-label="Niveles de descuento">
            <li v-for="l in levels" :key="l.pct" class="level" :class="{ 'is-max': l.max }">
              <span class="level-pct">{{ l.pct }}</span>
              <span class="level-ico"><i class="bi" :class="l.icon" aria-hidden="true"></i></span>
              <span class="level-label">{{ l.label }}</span>
            </li>
          </ol>

          <div class="d-flex flex-wrap gap-3">
            <a class="btn btn-lg-red btn-lg" href="#cotizacion">
              Solicita tu cotización <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>
            </a>
            <a class="btn btn-lg-outline btn-lg" href="#equipos">Ver equipos</a>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="hero-photo">
            <img
              :src="photo"
              alt="Emprendedora sonriente sosteniendo toallas junto a una lavadora y secadora comerciales LG"
              width="780"
              height="655"
              fetchpriority="high"
            />
            <p class="hero-script d-none d-md-block m-0">Grandes<br />negocios<br />comienzan<br />aquí.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
