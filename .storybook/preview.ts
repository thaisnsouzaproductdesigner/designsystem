import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

// Importação direta dos tokens que geramos
import "../src/styles/tokens/primitives.css";
import "../src/styles/tokens/theme-light.css";
import "../src/styles/tokens/theme-dark.css";

const preview: Preview = {
  parameters: {
    // Removemos configurações complexas temporariamente para isolar o erro
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;