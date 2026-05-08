# 🎨 Embed Generator

Um editor visual de embeds para Discord, inspirado no [Message.style](https://message.style). Crie, edite e envie mensagens embed personalizadas para seus servidores do Discord através de webhooks.

![Preview](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-2.0-5865F2)

## ✨ Funcionalidades

- 🖊️ **Editor Visual Completo** - Interface intuitiva com preview em tempo real
- 📋 **Embeds Personalizados** - Suporte a todos os campos: autor, título, descrição, campos, imagens, footer e timestamp
- 🎨 **Cores Customizáveis** - Seletor de cores integrado para cada embed
- 🔲 **Componentes Interativos** - Adicione botões (Primary, Secondary, Success, Danger, Link)
- 📱 **Preview Responsivo** - Visualize como sua mensagem aparece no desktop e mobile
- 📤 **Envio por Webhook** - Envie diretamente para o Discord ou copie o JSON
- ✏️ **Edição de Mensagens** - Edite mensagens já enviadas usando o Message ID
- ⏱️ **Rate Limit Handler** - Tratamento automático de limites de taxa do Discord
- 🎯 **Limite de 10 Embeds** - Respeita o limite máximo de embeds do Discord
- 💾 **Auto-save** - Salva suas configurações localmente
- 🌙 **Template Padrão** - Embed de boas-vindas ao carregar o site

## 🚀 Como Usar

### 1. Configure o Webhook
- Cole a URL do webhook do Discord no campo superior
- A URL deve começar com `https://discord.com/api/webhooks/`

### 2. Crie sua Mensagem
- **Content**: Texto simples com suporte a markdown (`**negrito**`, `*itálico*`, etc.)
- **Username**: Nome personalizado do bot (opcional)
- **Avatar URL**: Avatar personalizado do bot (opcional)

### 3. Adicione Embeds
- Clique em **"+ Add Embed"** para adicionar até 10 embeds
- Preencha os campos desejados:
  - **Author**: Nome, ícone e URL do autor
  - **Title**: Título com URL opcional
  - **Description**: Descrição com markdown
  - **Color**: Cor personalizada da borda
  - **Fields**: Campos inline ou normais
  - **Image/Thumbnail**: URLs de imagens
  - **Footer**: Texto e ícone do rodapé
  - **Timestamp**: Data/hora automática

### 4. Preview em Tempo Real
- Veja exatamente como sua mensagem aparecerá no Discord
- Alterne entre visualização desktop e mobile
- Todas as alterações são refletidas instantaneamente

### 5. Envie ou Copie
- **Send Message**: Envia diretamente para o webhook configurado
- **Copy JSON**: Copia o payload JSON para uso em outros lugares
- **Clear**: Limpa tudo e recarrega o template padrão

### 6. Editar Mensagem (Opcional)
1. Após enviar, anote o Message ID mostrado no toast
2. Cole o Message ID no campo apropriado
3. Faça as alterações desejadas
4. Clique em "Send Message" novamente para editar

## 📦 Estrutura do Projeto

```
embed-generator/
├── index.html          # Interface principal
├── style.css           # Estilos modernos e tema escuro
├── script.js           # Lógica do editor e preview
└── README.md           # Documentação
```

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Design moderno com variáveis CSS, grid e animações
- **JavaScript (Vanilla)** - Sem dependências ou frameworks
- **Discord Webhook API** - Envio e edição de mensagens

## 🎯 Limitações do Discord

- **Máximo de 10 embeds** por mensagem
- **Máximo de 2000 caracteres** no conteúdo da mensagem
- **Máximo de 25 fields** por embed
- **Rate Limit**: Número limitado de requisições por minuto (tratado automaticamente)

## 🎨 Preview

### Template Padrão (ao carregar o site)
- **Embed 1**: Boas-vindas com funcionalidades (cor roxa)
- **Embed 2**: Tutorial de como usar (cor verde)

### Estilo
- Tema escuro moderno
- Preview fiel ao Discord (cores, espaçamentos, tipografia)
- Ícones SVG integrados
- Animações suaves

## 🐛 Rate Limit
O Discord impõe limites de taxa para prevenir abusos. Se você receber o erro:
```
Recursos de serviço estão sendo limitados pela taxa.
```

O site irá:
1. Detectar automaticamente o erro 429
2. Exibir uma contagem regressiva no botão
3. Reenviar a mensagem após o tempo de espera

## 📝 Exemplo de JSON Gerado

```
{
  "username": "Embed Generator",
  "content": "Hello World!",
  "embeds": [
    {
      "title": "Título do Embed",
      "description": "Descrição com **markdown**",
      "color": 5793266,
      "fields": [
        {
          "name": "Campo 1",
          "value": "Valor 1",
          "inline": true
        }
      ],
      "footer": {
        "text": "Embed Generator"
      },
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ],
  "components": [
    {
      "type": 1,
      "components": [
        {
          "type": 2,
          "style": 1,
          "label": "Clique Aqui",
          "custom_id": "btn_example"
        }
      ]
    }
  ]
}
```

## 🔒 Privacidade

- Todas as configurações são salvas **localmente** no navegador (localStorage)
- Nenhum dado é enviado para servidores externos (exceto o webhook do Discord)
- A URL do webhook fica armazenada apenas no seu navegador

## 🤝 Créditos

Inspirado por:
- [Message.style](https://message.style) (antigo Embed Generator)
- [Merlin Fuchs](https://github.com/merlinfuchs) - Criador do Embed Generator original

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤️ de [AkiraDv](https://github.com/akiradv) para a comunidade Discord
```
