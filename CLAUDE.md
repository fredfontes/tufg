# The Urge For Gas (TUFG)

Jogo arcade de corrida 3D no navegador, com visual PSX do fim dos anos 90 e supercarros dos anos 80/90. Publicado em https://tufg.online (GitHub Pages, repo `fredfontes/tufg`). Versão atual: ver o rótulo "Estado do projeto · v0.NN" em `index.html`.

Este arquivo é só o índice. Os detalhes ficam em `docs/` e são importados abaixo.

## Regras essenciais
- Responder em **português (pt-BR)**, de forma breve. O dono do projeto é o Fred (`fredfontes`).
- **`vehicles.js` e `music.js` do usuário são a fonte da verdade.** Nunca sobrescrever com versão própria; mudanças neles só quando pedidas.
- Jogo em um único `index.html` (Three.js r128) + `vehicles.js`, `tracks.js`, `ads.js`, `music.js`. Não separar CSS/JS em arquivos por enquanto (decisão do usuário).
- Toda mudança segue o fluxo de `docs/workflow.md` e a publicação de `docs/github.md` (direto na `main`, após salvar a `main` atual numa branch com o número da versão, sem "v").
- Não criar músicas próprias nem imitar obras protegidas: o jogo é original.

## Índice
- @docs/objetivo.md — o que é o jogo, público, inspirações, escopo
- @docs/design.md — identidade visual, paleta, tipografia, HUD, logo, PSX
- @docs/voz.md — tom e idioma dos textos, nomes, mensagens
- @docs/arquitetura.md — arquivos, Config, modos, PWA, testes
- @docs/carros-e-classes.md — vehicles.js, classes C/B/A/S/X, tráfego, pilotos, cheats
- @docs/pistas-e-cenarios.md — tracks.js, cenários, horário/clima, campeonato, outdoors
- @docs/audio.md — som sintetizado e jukebox (music.js)
- @docs/controles.md — teclado, toque, menus
- @docs/workflow.md — passo a passo de cada mudança
- @docs/github.md — publicação, branches de backup, commits
- @docs/roadmap.md — pendências e ideias
- @docs/decisoes.md — histórico resumido de decisões por versão
