# Workflow de cada mudança

1. Editar o código (versão local em `/home/claude/tufg`, espelhada em `/home/claude/urge-for-gas`).
2. `node --check` no maior `<script>` inline do `index.html`.
3. Teste com Playwright: servir com `python3 -m http.server` na pasta do repo, abrir, checar erros de página/console e o fluxo alterado.
4. Subir o rótulo "Estado do projeto · v0.NN" no `index.html`.
5. Publicar no GitHub conforme `docs/github.md`.
6. Atualizar o artifact de teste (https://claude.ai/artifact/ENC77AwUMu2JveEEdTmAXi) com o `index.html` **sem** `<!DOCTYPE html>`, `<html>`, `<head>`, `</head>`, `<body>`, `</body>`, `</html>`.
7. Enviar ao usuário os arquivos alterados e uma resposta curta em português.
8. Registrar a mudança na memória do projeto.

## Regras de edição
- Preservar `vehicles.js` e `music.js` do usuário; ao mexer, pedir/ler a versão atual dele.
- Mudar o mínimo necessário; quando criar opção nova, documentar no cabeçalho do arquivo de config.
- Se o usuário relatar bug, reproduzir antes de corrigir quando possível e dizer o que foi corrigido.
