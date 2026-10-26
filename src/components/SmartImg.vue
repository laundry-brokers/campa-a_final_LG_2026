<script setup>
import { computed } from 'vue'
// Busca en src/assets/img por nombre base, con cualquier extension (webp, jpg, jpeg, png, avif, svg, gif).
const files = import.meta.glob('../assets/img/*.{webp,jpg,jpeg,png,avif,svg,gif,WEBP,JPG,JPEG,PNG}', { eager: true, query: '?url', import: 'default' })
const idx = {}
for (const [p, u] of Object.entries(files)) idx[p.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase()] = u

const props = defineProps({
  name: { type: String, required: true },   // imagen ideal (limpia, sin texto)
  fallback: String,                         // imagen de respaldo si la ideal aun no existe
  alt: { type: String, default: '' },
  pos: { type: String, default: 'center' }, // object-position solo para el respaldo
  fbClass: String,                          // clase extra solo para el respaldo
  eager: Boolean, optional: Boolean
})
const own = computed(() => idx[props.name.toLowerCase()])
const src = computed(() => own.value || (props.fallback && idx[props.fallback.toLowerCase()]) || null)
const usingFb = computed(() => !own.value && !!src.value)
</script>

<template>
  <img v-if="src" :src="src" :alt="alt" :class="usingFb ? fbClass : ''" :style="usingFb ? { objectPosition: pos } : null" :loading="eager ? 'eager' : 'lazy'" decoding="async">
  <span v-else-if="$slots.default"><slot /></span>
  <div v-else-if="!optional" class="img-missing" role="img" :aria-label="alt">Falta imagen: {{ name }}</div>
</template>
