# Arquitetura

## Arquivos
| Arquivo | Papel |
|---|---|
| `index.html` | Jogo inteiro (HTML + CSS + JS, ~3200 linhas), Three.js r128 + GLTFLoader por CDN. Define `Config`, `World`, `Game`, `Sfx`, `Jukebox`. Traz `<!DOCTYPE html>` (sem ele o navegador cai em quirks mode). |
| `vehicles.js` | Carros, classes, tráfego, grid. **Fonte da verdade do usuário.** |
| `tracks.js` | Pistas, cenários, adereços, campeonato, skybox. |
| `ads.js` | Outdoors (texto, cores ou imagem SVG/PNG). |
| `music.js` | Jukebox (`window.TUFG_MUSIC`). **Fonte da verdade do usuário.** |
| `sw.js` | Service worker (offline). |
| `manifest.json` | Manifesto do PWA. |
| `assets/` | `cars/` (.glb + texturas, ~325 MB), `music/` (~26 MB), `models/pilots/`, `imgs/`, `ads/`, `skybox/`. |
| `otimizar-glb.sh` | Script gltf-transform (texturas 1024/512) que o usuário roda localmente; não altera originais. Não está no repo. |

Scripts carregados na ordem: vehicles.js, tracks.js, ads.js, music.js, depois o código inline.

## Config (index.html)
`Config` junta `TUFG_VEHICLES`, `TUFG_TRACKS` e `TUFG_ADS`: `retroHeight` (360), `trackOrder`, `tracks`, `sceneries`, `cars`, `times` (amanhecer/dia/entardecer/noite), `weathers` (limpo/chuva/neve secreta), `champ` (prêmios, preços, `unlocks`), `Config.atmosphere(tempo, clima)`.

## Relevo (v0.75)
`Track.cy[i]` = altura do eixo (de `def.elev`); `yAt(s)`, `slopeAt(s)`, `terrain(i, lat)` e `ground(x, z, st)` dão alturas e inclinação. `band()` soma `cy[i]` (use `abs: true` para alturas absolutas). `CarSim.step` aplica a gravidade da ladeira; `Game.pose` posiciona e inclina carros; `ChaseCam`, retrovisor, `FX` e chuva usam `car.gy`/`fx.ground`. Física e colisão continuam 2D.

## Estados do jogo
`Game.state`: menu, countdown, race, result etc. Estado salvo no navegador (localStorage): escolhas, cor por jogador e carro, dinheiro/progresso do campeonato, opção de música.

## Mobile / toque
`body.tm` ativa o modo toque: pad ◀▶, Acelerar, Freio, Mão, pausa, recolocar. 2 jogadores é desativado em tela vertical.

## Desempenho
`Game.preload()` carrega só o necessário; `Game.warm()` compila shaders antes da largada. Carregamento por bytes com barra. Grid reduzido (`grid.reduced`) em máquinas fracas.

## PWA (v0.72)
- `sw.js`: `const V='tufg-v4'`; caches `tufg-v4-shell` e `tufg-v4-assets`. Código (`.html/.js/.json`) é network-first com fallback ao cache; `/assets/**` e CDNs são cache-first; sintetiza respostas 206 (Range) para mp3. Mensagem `precache` faz download offline com progresso. Para invalidar caches, mudar `V`.
- Registro só em https ou localhost. Wake Lock mantém a tela ligada em `race`/`countdown`.
- `manifest.json`: `id "/"`, fullscreen, ícones 192/512/maskable.

## Testes
`window.TUFG` expõe `game` para testes. Playwright (Chromium) com `python3 -m http.server` na pasta do repo; checar erros de página/console e `node --check` do maior `<script>` inline.

## Armadilhas conhecidas
- Autoplay: áudio só destrava com click/touchend/keydown.
- Servidor local do usuário (Live Server/Brave) pode ter `index.html` desatualizado; a barra `#errbar` ajuda a diagnosticar.
- Artifact de teste recebe o `index.html` como fragmento (sem doctype/html/head/body).
