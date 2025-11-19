// src/index.ts

// Exportação de Componentes
export * from './components/Button';
export * from './components/Header';

// Exportação de Tokens/Estilos (Opcional, mas recomendado)
import './styles/tokens/variables.css'; 
// Nota: A importação do CSS aqui garante que quem usar a lib já receba as variáveis,
// mas em setups avançados, preferimos deixar o consumidor importar o CSS separadamente.
// Por enquanto, para facilitar, pode manter ou apenas documentar que o usuário deve importar o CSS.