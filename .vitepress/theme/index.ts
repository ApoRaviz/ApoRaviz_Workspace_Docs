import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { onMounted, onUnmounted } from 'vue';
import KnowledgeHome from './KnowledgeHome.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('KnowledgeHome', KnowledgeHome);
  },
  setup() {
    let frame = 0;
    // VitePress 1.6 local search can leave focus on body after Escape.
    const restoreSearchFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !(event.target instanceof Element)
        || !event.target.closest('.VPLocalSearchBox')) return;
      frame = requestAnimationFrame(() => {
        if (!document.querySelector('.VPLocalSearchBox') && document.activeElement === document.body) {
          document.querySelector<HTMLButtonElement>('.DocSearch-Button')?.focus();
        }
      });
    };
    onMounted(() => document.addEventListener('keydown', restoreSearchFocus, true));
    onUnmounted(() => {
      document.removeEventListener('keydown', restoreSearchFocus, true);
      cancelAnimationFrame(frame);
    });
  },
} satisfies Theme;
