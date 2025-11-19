import StyleDictionary from 'style-dictionary';

// --- 1. TRANSFORMADORES BLINDADOS (ANTI-CRASH) ---

// NOME: Converte path em kebab-case
StyleDictionary.registerTransform({
  name: 'custom/name/kebab',
  type: 'name',
  transform: (token) => token.path.filter(part => !['light', 'dark'].includes(part)).join('-').toLowerCase()
});

// SOMBRA: Com proteção contra valores nulos
StyleDictionary.registerTransform({
  name: 'custom/shadow',
  type: 'value',
  transitive: true,
  matcher: (token) => token.$type === 'boxShadow' || token.type === 'boxShadow',
  transform: (token) => {
    const val = token.value;
    
    // PROTEÇÃO 1: Se o valor não existe
    if (val === undefined || val === null) {
        console.warn(`⚠️ AVISO: Token de sombra [${token.name}] está sem valor. Retornando 'none'.`);
        return 'none';
    }
    
    // PROTEÇÃO 2: Se for string (referência bruta), retorna ela mesma
    if (typeof val === 'string') return val;

    const shadows = Array.isArray(val) ? val : [val];
    
    return shadows.map(shadow => {
      // PROTEÇÃO 3: Se o item do array for inválido
      if (!shadow) return '';

      const { offsetX, offsetY, blur, spread, color, type } = shadow;
      const inset = type === 'innerShadow' ? 'inset ' : '';
      const x = typeof offsetX === 'number' ? `${offsetX}px` : (offsetX || '0px');
      const y = typeof offsetY === 'number' ? `${offsetY}px` : (offsetY || '0px');
      const b = typeof blur === 'number' ? `${blur}px` : (blur || '0px');
      const s = typeof spread === 'number' ? `${spread}px` : (spread || '0px');
      // Fallback de cor se vier undefined
      const c = color || '#000000'; 
      
      return `${inset}${x} ${y} ${b} ${s} ${c}`;
    }).filter(Boolean).join(', ');
  }
});

// TIPOGRAFIA: Com proteção
StyleDictionary.registerTransform({
  name: 'custom/typography',
  type: 'value',
  transitive: true,
  matcher: (token) => token.$type === 'typography' || token.type === 'typography',
  transform: (token) => {
    const val = token.value;
    if (typeof val !== 'object' || !val) return val; // Retorna original se não for objeto
    
    const fw = val.fontWeight || 400;
    const fs = typeof val.fontSize === 'number' ? `${val.fontSize}px` : val.fontSize;
    const lh = val.lineHeight || 1.2;
    const ff = val.fontFamily ? `'${val.fontFamily}', sans-serif` : 'sans-serif';
    
    return `${fw} ${fs}/${lh} ${ff}`;
  }
});

// DIMENSÃO: Com proteção
StyleDictionary.registerTransform({
  name: 'custom/size-px',
  type: 'value',
  transitive: true,
  matcher: (token) => 
    ['dimension', 'spacing', 'borderRadius', 'borderWidth', 'sizing'].includes(token.$type),
  transform: (token) => {
    if (typeof token.value === 'number' && token.value !== 0) return `${token.value}px`;
    return token.value;
  }
});

// --- 2. FORMATO CSS ---

StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  format: async function({ dictionary, options }) {
    const { selector } = options;
    return `${selector} {\n` +
      dictionary.allTokens.map(token => {
        const name = token.name.replace(/^(light|dark)-/, '');
        let value = token.value;

        // Debug final: Se algo passou pelos transforms e ainda é objeto/undefined
        if (value === undefined || typeof value === 'object') {
             console.error(`🚨 ERRO NO CSS: Token [--${name}] ficou inválido (${typeof value}).`);
             // Retorna um valor "visível" de erro para facilitar debug no navegador
             return `  --${name}: "ERRO_VALOR_INVALIDO";`; 
        }

        return `  --${name}: ${value};`;
      }).join('\n') +
      `\n}\n`;
  }
});

// --- 3. CONFIGURAÇÃO E EXECUÇÃO ---

const sd = new StyleDictionary({
  source: [
    'tokens/primitive_tokens.json',
    'tokens/semantic_tokens.json'
  ], 
  platforms: {
    css: {
      transformGroup: 'css', 
      transforms: [
        'custom/name/kebab', 
        'custom/shadow',
        'custom/typography',
        'custom/size-px'
        // Nota: Removemos color/css para evitar conflitos, o custom/size-px e shadow cuidam do resto
      ],
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'primitives.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('primitive_tokens.json'),
          options: { selector: ':root', outputReferences: true }
        },
        {
          destination: 'theme-light.css',
          format: 'css/variables-themed',
          filter: (token) => token.path[0] === 'light',
          options: { selector: ':root', outputReferences: false }
        },
        {
          destination: 'theme-dark.css',
          format: 'css/variables-themed',
          filter: (token) => token.path[0] === 'dark',
          options: { selector: '[data-theme="dark"]', outputReferences: false }
        }
      ]
    }
  }
});

console.log('🎨 Gerando Tokens da EXA (Modo Blindado)...');
await sd.buildAllPlatforms();
console.log('✅ Processo finalizado! Verifique os arquivos em src/styles/tokens/');