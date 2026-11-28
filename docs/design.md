# Design

## Direção
Uma única aparência escura de tela de jogo: **âmbar de aviso sobre asfalto**, com um vermelho só para dano. Menus são placas alinhadas à esquerda sobre a cena 3D.

## Tokens (CSS `:root` em `index.html`)
| Token | Valor | Uso |
|---|---|---|
| `--asphalt` / `--asphalt-2` | `#14161a` / `#1d2026` | fundos |
| `--line` | `#323741` | bordas |
| `--chalk` | `#eceff1` | texto |
| `--dim` | `#9aa2ad` | texto secundário |
| `--hazard` | `#ffb000` | destaque, ação, tema do PWA |
| `--signal` | `#ff4332` | dano / alerta |
| `--go` | `#3ddc84` | positivo |

## Tipografia
- Títulos: **Big Shoulders Display** (700–900), maiúsculas, `line-height .86`.
- Texto/HUD: **Chivo Mono** (400/600).

## Logo e ícones (`assets/imgs/`)
`logo-main.svg` (substitui o título de texto no menu), variantes `-inverted`, `logo-minimal`, `logo-reduction` (cada uma em svg/png/@4x). `icon-192`, `icon-512`, `icon-maskable-512`, `apple-touch-icon`. A chama da logo usa `#FFB000`.

## Telas e componentes
- **Loading**: chama da logo preenchendo um relevo em chapa xadrez preta, barra amarela embaixo (margem 32 px), progresso por bytes; botão "Continuar" ao final.
- **Menu principal**: coluna estreita, botões empilhados (Corrida rápida, Campeonato, Tela dividida, Pista, Garagem). Textos cinza descritivos ficam ocultos.
- **Jukebox** (home, canto inferior direito): toca-discos antigo, visor LED com título em marquee, botões anterior/stop/play/próxima.
- **Garagem**: carrossel 3D, arrastar com o mouse gira o carro; botão de cor com bolinha na cor da pintura.
- **HUD**: barra de distância e tempo no topo; retrovisor (câmeras internas) abaixo da barra.
- **Barra de erro** vermelha (`#errbar`) no rodapé para erros de JS.
- **Pódio**: fogos, troféu ouro/prata/bronze; do 4º em diante, troféu de origami branco.
- **Cheats**: aviso rosa (`#ff3dcf`) com jingle anos 80.

## Estética PSX
`Config.retroHeight: 360` (altura do modo retrô), skybox por pista (SVG/PNG), outdoors SVG/PNG, neblina por horário, sol com flare no amanhecer/entardecer.

## Regras
- Respeitar `safe-area-inset` em celulares; `overscroll-behavior: none`.
- No modo toque (`body.tm`) esconder atalhos de teclado (kbd, Enter, Esc, P, R, X).
- Item de menu selecionado sempre marcado (classe `body.kn`).
