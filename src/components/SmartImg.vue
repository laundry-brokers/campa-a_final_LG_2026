<script setup>
import { computed } from 'vue'
const files = import.meta.glob('../assets/img/*.{webp,jpg,jpeg,png,avif,svg,gif,WEBP,JPG,JPEG,PNG}', { eager: true, query: '?url', import: 'default' })
const idx = {}
for (const [p, u] of Object.entries(files)) idx[p.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase()] = u

const props = defineProps({
  name: { type: String, required: true },   
  fallback: String,                         
  alt: { type: String, default: '' },
  pos: { type: String, default: 'center' }, 
  fbClass: String,                          
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
