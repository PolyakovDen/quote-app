import { ref, computed } from 'vue';
import { useQuery } from 'vue-query';
import { Quote } from '@/types';

export function useQuotes() {
  const history = ref<Quote[]>([]);

  const fetchRandomQuote = async (): Promise<Quote> => {
    const response = await fetch(import.meta.env.VITE_QUOTES_API_URL);

    if (!response.ok) throw new Error('Error when receiving a quote!');

    return response.json();
  };

  const {
    data: quote,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<Quote>('randomQuote', fetchRandomQuote, {
    onSuccess: (newQuote: Quote) => {
      history.value = [newQuote, ...history.value];
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('A copying error:', err);
      return false;
    }
  };

  const shareToSocial = (platform: string, quote: Quote) => {
    const text = `"${quote.content}" - ${quote.author}`;
    const urls = {
      telegram: `https://t.me/share/url?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}&quote=${encodeURIComponent(text)}`,
    };

    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return {
    quote,
    error,
    isLoading,
    isFetching,
    refetch,
    history: computed(() => history.value),
    copyToClipboard,
    shareToSocial,
  };
}
