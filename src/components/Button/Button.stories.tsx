import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button'; // Ajuste o caminho conforme sua estrutura

// Ícone Mock para exemplificação (apenas para o Storybook)
const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// 1. Configuração Metadata (Meta)
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Caminho na sidebar do Storybook
  component: Button,
  tags: ['autodocs'], // Gera a página de documentação automática
  
  // Controles manuais para o Playground
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger'],
      description: 'Estilo visual do botão',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Densidade e escala',
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carregamento (feedback)',
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' }, // Loga o clique na aba "Actions"
  },
  
  // Props padrão para todas as stories
  args: {
    children: 'Label do Botão',
    variant: 'primary',
    size: 'md',
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 2. Stories (Cenários)

// O Playground principal
export const Playground: Story = {};

// Variantes
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Entrar na Conta',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancelar',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Esqueci minha senha',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Excluir Dados',
  },
};

// Tamanhos
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Filtros',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Começar Agora',
  },
};

// Estados Complexos
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Processando...',
  },
};

export const WithIconLeft: Story = {
  args: {
    iconLeft: <IconShield />,
    children: 'Proteção Ativa',
  },
};

export const WithIconRight: Story = {
  args: {
    iconRight: <IconShield />,
    children: 'Próximo Passo',
    variant: 'secondary',
  },
};