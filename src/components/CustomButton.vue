<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const buttonClasses = computed(() => {
  return {
    'custom-button': true,
    [`custom-button--${props.variant}`]: true,
    [`custom-button--${props.size}`]: true,
    'custom-button--disabled': props.disabled,
    'custom-button--loading': props.loading,
  };
});
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    @click="e => emit('click', e)"
  >
    <span v-if="loading" class="loader"></span>
    <slot v-else></slot>
  </button>
</template>

<style lang="scss" scoped>
.custom-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &--sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  &--md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  &--lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  &--primary {
    background-color: #3b82f6;
    color: white;

    &:hover:not(:disabled) {
      background-color: #2563eb;
    }

    &:active:not(:disabled) {
      background-color: #1d4ed8;
    }
  }

  &--secondary {
    background-color: #f3f4f6;
    color: #1f2937;

    &:hover:not(:disabled) {
      background-color: #e5e7eb;
    }

    &:active:not(:disabled) {
      background-color: #d1d5db;
    }
  }

  &--icon {
    padding: 0.5rem;
    border-radius: 50%;
    background-color: #f3f4f6;

    &:hover:not(:disabled) {
      background-color: #e5e7eb;
    }

    &:active:not(:disabled) {
      background-color: #d1d5db;
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--loading {
    cursor: wait;

    .loader {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
