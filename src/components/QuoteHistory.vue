<script setup lang="ts">
import { Quote } from '../types';

defineProps<{
  history: Quote[];
}>();
</script>

<template>
  <div class="quote-history">
    <h3 class="history-title">
      <span class="title-icon">📚</span>
      Quote History
    </h3>

    <div ref="listRef" class="history-list">
      <div
        v-for="(item, index) in history"
        :key="item._id"
        class="history-item"
        :style="{
          animationDelay: `${index * 0.1}s`,
        }"
      >
        <blockquote class="quote">
          <p class="quote-text">"{{ item.content }}"</p>
          <footer class="quote-author">
            <span class="author-dash">—</span>
            {{ item.author }}
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quote-history {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;

  .history-title {
    font-size: 1.55rem;
    margin: 0;
    padding: 1rem 1.5rem;
    background: linear-gradient(to right, #f8f9fa, #ffffff);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .title-icon {
      font-size: 1.5rem;
    }
  }

  .history-list {
    max-height: 600px;
    overflow-y: auto;
    padding: 1.5rem;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 4px;

      &:hover {
        background: #a0aec0;
      }
    }
  }

  .history-item {
    animation: slideIn 0.5s ease forwards;
    opacity: 0;
    transform: translateY(20px);

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    .quote {
      background: #f8fafc;
      padding: 1.5rem;
      border-radius: 12px;
      margin: 0;
      border-left: 4px solid #3b82f6;
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(4px);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
      }

      .quote-text {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #1a202c;
        margin: 0 0 1rem 0;
        font-weight: 500;
      }

      .quote-author {
        font-size: 1rem;
        color: #64748b;
        font-style: italic;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .author-dash {
          color: #94a3b8;
          font-style: normal;
        }
      }
    }
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .quote-history {
    margin-top: 2rem;

    .history-title {
      font-size: 1.5rem;
      padding: 1rem;
    }

    .history-list {
      padding: 1rem;
    }

    .history-item .quote {
      padding: 1rem;

      .quote-text {
        font-size: 1rem;
      }

      .quote-author {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
