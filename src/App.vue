<script setup lang="ts">
import { ref } from 'vue';
import { useQuotes } from './composables/useQuotes';
import Error from './components/Error.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import QuoteCard from './components/QuoteCard.vue';
import QuoteHistory from './components/QuoteHistory.vue';
import CustomButton from './components/CustomButton.vue';

const { quote, error, isLoading, isFetching, refetch, history } = useQuotes();
const showHistory = ref(false);
</script>

<template>
  <Error v-if="error" :message="error" />
  <LoadingSpinner v-else-if="isLoading" />
  <QuoteCard v-else-if="quote" :quote="quote" :is-fetching="isFetching" @refetch="refetch" />
  <div class="actions-bar" v-if="!isLoading && !error">
    <CustomButton variant="secondary" @click="showHistory = !showHistory">
      {{ showHistory ? 'Hide' : 'Show' }} history
    </CustomButton>
  </div>
  <QuoteHistory v-if="showHistory" :history="history" />
</template>

<style lang="scss" scoped>
.actions-bar {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}
</style>
