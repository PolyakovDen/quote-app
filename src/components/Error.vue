<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="error-container">
    <div class="error-message">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      <span class="error-text">{{ message }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  min-width: 320px;
  max-width: 90%;
  animation: slideDown 0.5s ease-out forwards;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(to right, #fff1f1, #fff5f5);
  border-left: 4px solid #ff3b3b;
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 59, 59, 0.1);
  backdrop-filter: blur(8px);
}

.error-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: #ff3b3b;
  animation: pulse 2s infinite;

  svg {
    width: 100%;
    height: 100%;
  }
}

.error-text {
  color: #dc2626;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.01em;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
