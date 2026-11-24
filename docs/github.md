# GitHub

Repo: `fredfontes/tufg` (GitHub Pages, domínio `tufg.online` via `CNAME`). Clone de trabalho: `/home/claude/tufg`.

## Regras do usuário
1. **Publicar sempre direto na `main`**, sem PR nem revisão.
2. **Antes de cada publicação**, salvar o estado atual da `main` como branch com o número da versão **sem "v"** (ex.: `0.72`), e só então atualizar a `main`.

## Passo a passo
```
git fetch origin main && git checkout main && git pull --ff-only
git push origin <sha-da-main-atual>:refs/heads/<versao-atual>   # ex.: 0.72
# ...fazer as mudanças, commit...
git push origin main
```
Commits terminam com:
```
Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01X19s15tLTRQpWWwz8zUfTn
```
Mensagem do commit no estilo: "<resumo> (v0.NN)".

## Limitações do ambiente
- Acesso via proxy: push funciona; **excluir branches remotas é bloqueado** (o usuário apaga manualmente em /branches). `v0.71` e `pwa-offline` ainda existem e devem ser removidas por ele.
- `gh pr create` não funciona (GraphQL bloqueado); se precisar de PR usar `gh api repos/fredfontes/tufg/pulls`.
- Clone raso de um branch só; para rastrear outras branches fazer `git fetch origin +refs/heads/X:refs/remotes/origin/X`.

## Branches existentes
`main` (atual), `0.16`, `0.35`, `0.64`, `0.71`, `0.72` (backups de versão), `v0.71` e `pwa-offline` (a excluir).
