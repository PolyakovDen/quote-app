<script setup lang="ts">
import { Quote } from '../types';
import { useQuotes } from '../composables/useQuotes';
import CustomButton from './CustomButton.vue';

const props = defineProps<{
  quote: Quote;
  isFetching: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-history'): void;
  (e: 'refetch'): void;
}>();

const { copyToClipboard, shareToSocial } = useQuotes();

const handleCopy = async () => {
  const success = await copyToClipboard(`"${props.quote.content}" - ${props.quote.author}`);

  if (success) alert('Quote copied!');
};

const onRefetch = () => emit('refetch');
</script>

<template>
  <div class="quote-container">
    <div class="quote-card">
      <blockquote class="quote">
        <p class="quote-text">"{{ quote.content }}"</p>
        <footer class="quote-author">
          <span class="author-dash">—</span>
          {{ quote.author }}
        </footer>
      </blockquote>

      <div class="actions">
        <div class="share">
          <CustomButton variant="icon" @click="shareToSocial('telegram', quote)">
            <img src="../assets/telegram.svg" width="20" height="20" alt="Telegram" />
          </CustomButton>
          <CustomButton variant="icon" @click="shareToSocial('facebook', quote)">
            <img src="../assets/facebook.svg" width="20" height="20" alt="Facebook" />
          </CustomButton>
          <CustomButton variant="icon" @click="handleCopy">
            <img src="../assets/copy.svg" width="20" height="20" alt="Copy" class="share-icon" />
          </CustomButton>
        </div>
        <CustomButton variant="primary" :loading="isFetching" @click="onRefetch">
          New Quote
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quote-container {
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  margin: 0 auto;
}

.quote-card {
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .quote {
    background-color: #f5f5f5;
    padding: 24px;
    border-radius: 8px;
    margin: 0;
    word-break: break-word;

    .quote-text {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .quote-author {
      font-size: 14px;
      color: #666;
      font-style: italic;
      display: flex;
      align-items: center;
      gap: 8px;

      .author-dash {
        color: #94a3b8;
        font-style: normal;
      }
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .share {
    display: flex;
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .quote-container {
    padding: 12px;
  }

  .quote-card {
    padding: 20px;

    .quote {
      padding: 20px;

      .quote-text {
        font-size: 15px;
      }
    }
  }
}

@media (max-width: 480px) {
  .quote-container {
    padding: 8px;
  }

  .quote-card {
    padding: 16px;

    .quote {
      padding: 16px;

      .quote-text {
        font-size: 14px;
      }

      .quote-author {
        font-size: 13px;
      }
    }

    .share {
      gap: 6px;
    }
  }
}

@media (max-width: 320px) {
  .quote-card {
    padding: 12px;

    .quote {
      padding: 12px;
    }

    .share {
      gap: 4px;
    }
  }
}
</style>
