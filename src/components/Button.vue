<template>
    <div :class="buttonClasses" :style="buttonStyle">
        <span class="button-content" :class="{ 'button-content--loading': loading }">
        <i v-if="icon" :class="icon" class="button-icon"></i>
        <span v-if="loading" class="loading-spinner"></span>
        <slot></slot>
        </span>
    </div>
</template>
  
<script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    color: {
      type: String,
      default: 'default'
    },
    variant: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: undefined
    }
  })
  
  const colorConfig = {
    default: {
      border: 'rgba(255, 255, 255, 0.35)',
      borderSolid: 'rgba(255, 255, 255, 0.5)',
      color: '#f5f5f5',
      bg: 'rgba(4, 4, 4, 0.75)',
      bgDotted: 'rgba(255, 255, 255, 0.1)',
      bgSolid: 'rgba(12, 12, 12, 0.85)'
    },
    primary: {
      border: 'rgba(0, 0, 255, 0.5)',
      borderSolid: 'rgba(0, 0, 255, 1)',
      color: '#fff',
      bg: 'rgba(0, 0, 255, 0.2)',
      bgDotted: 'rgba(0, 0, 255, 0.4)',
      bgSolid: 'rgba(0, 0, 255, 0.4)'
    },
    danger: {
      border: 'rgba(255, 0, 0, 0.8)',
      borderSolid: 'rgba(255, 0, 0, 1)',
      color: 'rgba(255, 0, 0, 1)',
      bg: 'rgba(255, 0, 0, 0.2)',
      bgDotted: 'rgba(255, 0, 0, 0.2)',
      bgSolid: 'rgba(255, 0, 0, 0.2)'
    },
    success: {
      border: 'rgba(0, 255, 0, 0.8)',
      borderSolid: 'rgba(0, 255, 0, 1)',
      color: 'rgba(0, 255, 0, 1)',
      bg: 'rgba(0, 255, 0, 0.2)',
      bgDotted: 'rgba(0, 255, 0, 0.2)',
      bgSolid: 'rgba(0, 255, 0, 0.2)'
    },
    warning: {
      border: 'rgba(184, 134, 11, 0.8)',
      borderSolid: 'rgba(255, 183, 0, 0.8)',
      color: 'rgba(255, 183, 0, 1)',
      bg: 'rgba(255, 183, 0, 0.2)',
      bgDotted: 'rgba(255, 183, 0, 0.2)',
      bgSolid: 'rgba(255, 183, 0, 0.2)'
    }
  }
  
  const disabledConfig = {
    border: 'rgba(204, 204, 204, 0.5)',
    borderSolid: 'rgba(204, 204, 204, 0.7)',
    color: 'rgba(204, 204, 204, 0.5)',
    bg: 'rgba(204, 204, 204, 0.2)',
    bgDotted: 'rgba(204, 204, 204, 0.2)',
    bgSolid: 'rgba(204, 204, 204, 0.2)'
  }
  
  const currentConfig = computed(() => {
    return (props.disabled || props.loading)
      ? disabledConfig
      : colorConfig[props.color]
  })
  
  const buttonClasses = computed(() => {
    const classes = ['button']
  
    if (props.disabled || props.loading) {
      classes.push('button--disabled')
    } else {
      classes.push(`button--${props.color}`)
    }
  
    classes.push(`button--${props.variant}`)
  
    if (props.loading) {
      classes.push('button--loading')
    }
  
    return classes.join(' ')
  })
  
  const buttonStyle = computed(() => {
    const config = currentConfig.value
    return {
      '--button-border': config.border,
      '--button-border-solid': config.borderSolid,
      '--button-color': config.color,
      '--button-bg': config.bg,
      '--button-bg-dotted': config.bgDotted,
      '--button-bg-solid': config.bgSolid
    }
  })
</script>

<style scoped>
    .button {
        padding: 10px 20px;
        border: 1px solid var(--button-border);
        color: var(--button-color);
        background-color: var(--button-bg);
        backdrop-filter: blur(5px);
        position: relative;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        user-select: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, opacity 0.2s ease, transform 0.1s ease;
        font-family: 'IBM Plex Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-size: 16px;
    }

    .button-content {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
    }

    .button span {
        position: relative;
        white-space: nowrap;
    }

    .button-icon {
        display: inline-flex;
        align-items: center;
        font-size: 18px;
    }

    .button--disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    .button--loading {
        cursor: wait;
    }

    .button-content--loading {
        opacity: 0.7;
    }

    /* Variant: button (default) */
    .button--button {
        background-color: var(--button-bg-solid);
    }

    /* Estilo padrão (default) com hover similar aos inputs */
    .button--default.button--button:hover {
        background-color: rgba(12, 12, 12, 0.95);
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    .button--default.button--outline:hover {
        background-color: rgba(12, 12, 12, 0.95);
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    .button--default.button--dotted:hover {
        background-color: rgba(12, 12, 12, 0.95);
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    /* Hover para outras cores - background mais sólido */
    .button--primary.button--button:hover {
        background-color: rgba(0, 0, 255, 0.6);
    }

    .button--primary.button--outline:hover {
        background-color: rgba(0, 0, 255, 0.3);
    }

    .button--primary.button--dotted:hover {
        background-color: rgba(0, 0, 255, 0.5);
    }

    .button--danger.button--button:hover {
        background-color: rgba(255, 0, 0, 0.35);
    }

    .button--danger.button--outline:hover {
        background-color: rgba(255, 0, 0, 0.3);
    }

    .button--danger.button--dotted:hover {
        background-color: rgba(255, 0, 0, 0.3);
    }

    .button--success.button--button:hover {
        background-color: rgba(0, 255, 0, 0.35);
    }

    .button--success.button--outline:hover {
        background-color: rgba(0, 255, 0, 0.3);
    }

    .button--success.button--dotted:hover {
        background-color: rgba(0, 255, 0, 0.3);
    }

    .button--warning.button--button:hover {
        background-color: rgba(255, 183, 0, 0.35);
    }

    .button--warning.button--outline:hover {
        background-color: rgba(255, 183, 0, 0.3);
    }

    .button--warning.button--dotted:hover {
        background-color: rgba(255, 183, 0, 0.3);
    }

    /* Estado :active (clicado) */
    .button:not(.button--disabled):not(.button--loading):active {
        transform: scale(0.98);
        opacity: 0.9;
    }

    .button--default.button--button:active {
        background-color: rgba(12, 12, 12, 1);
    }

    .button--default.button--outline:active {
        background-color: rgba(12, 12, 12, 1);
    }

    .button--default.button--dotted:active {
        background-color: rgba(12, 12, 12, 1);
    }

    .button--primary.button--button:active {
        background-color: rgba(0, 0, 255, 0.7);
    }

    .button--primary.button--outline:active {
        background-color: rgba(0, 0, 255, 0.4);
    }

    .button--primary.button--dotted:active {
        background-color: rgba(0, 0, 255, 0.6);
    }

    .button--danger.button--button:active {
        background-color: rgba(255, 0, 0, 0.4);
    }

    .button--danger.button--outline:active {
        background-color: rgba(255, 0, 0, 0.35);
    }

    .button--danger.button--dotted:active {
        background-color: rgba(255, 0, 0, 0.35);
    }

    .button--success.button--button:active {
        background-color: rgba(0, 255, 0, 0.4);
    }

    .button--success.button--outline:active {
        background-color: rgba(0, 255, 0, 0.35);
    }

    .button--success.button--dotted:active {
        background-color: rgba(0, 255, 0, 0.35);
    }

    .button--warning.button--button:active {
        background-color: rgba(255, 183, 0, 0.4);
    }

    .button--warning.button--outline:active {
        background-color: rgba(255, 183, 0, 0.35);
    }

    .button--warning.button--dotted:active {
        background-color: rgba(255, 183, 0, 0.35);
    }

    /* Variant: outline */
    .button--outline {
        background-color: var(--button-bg);
    }

    /* Variant: dotted */
    .button--dotted {
        background-color: var(--button-bg);
        background-image: radial-gradient(circle, var(--button-bg-dotted) 1px, transparent 1px);
        background-size: 5px 5px;
    }

    /* Cantos em L - apenas no hover */
    .button:not(.button--disabled):not(.button--loading):hover::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        width: 12px;
        height: 12px;
        border-top: 2px solid var(--button-border-solid);
        border-left: 2px solid var(--button-border-solid);
        pointer-events: none;
        z-index: 2;
    }

    .button:not(.button--disabled):not(.button--loading):hover::after {
        content: '';
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        border-bottom: 2px solid var(--button-border-solid);
        border-right: 2px solid var(--button-border-solid);
        pointer-events: none;
        z-index: 2;
    }

    .button:not(.button--disabled):not(.button--loading):hover .button-content::before {
        content: '';
        position: absolute;
        top: -12px;
        right: -22px;
        width: 12px;
        height: 12px;
        border-top: 2px solid var(--button-border-solid);
        border-right: 2px solid var(--button-border-solid);
        pointer-events: none;
    }

    .button:not(.button--disabled):not(.button--loading):hover .button-content::after {
        content: '';
        position: absolute;
        bottom: -12px;
        left: -22px;
        width: 12px;
        height: 12px;
        border-bottom: 2px solid var(--button-border-solid);
        border-left: 2px solid var(--button-border-solid);
        pointer-events: none;
    }

    /* Loading spinner */
    .loading-spinner {
        width: 14px;
        height: 14px;
        border: 2px solid var(--button-color);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        display: inline-block;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Altura específica para primary-highlight (equivalente ao antigo) */
    .button--primary.button--button {
        height: 46px;
    }
</style>
