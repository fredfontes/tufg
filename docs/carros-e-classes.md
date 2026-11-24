# Carros, classes e tráfego (`vehicles.js`)

O arquivo documenta todos os campos no próprio cabeçalho; ele é a fonte da verdade do usuário.

## Classes
- C, B, A, S definidas **só** por `speed` e `accel` (`classes.weights` 0.5/0.5, `thresholds` B 40, A 56, S 70).
- `classes.ranges` lista faixas de todos os atributos: speed 50–85, accel 8–16, maxLat 16–30, brake 28–48, steerRate 1.5–2.4, reverseAccel 5–10.
- **X = carro secreto**: fora da garagem, sorteio, rivais e tráfego até ser liberado.

## Carros atuais (ids)
mature, cat, web, future, daemon, aviator, snake, retro, holy, sprint, prodigy, blonde, lunar, redhead, soul (modelos .glb em `assets/cars/fun/...`, `modelRot 90`, largura ~2.2) e os sem modelo: vento (reserva padrão), cometa, onda, falcao. Secretos (X): `quadrado` (code `quadrado`), `firma` (code `firma`).

## Campos importantes por carro
`name`, `model`, `modelRot`, `length`, `width`, `class`, `code` (cheat), `glb: { wheels, caps, brake, wheelIn, capOut, wheelRF/RR/WF/WR, capSizeF/R, capShape, capColor, rimColor }`, `paint: [{ name, color, texture, capColor, rimColor }]`, `paintParts`, `pilot` (busto .glb, pos/rot/scale/height), som personalizado opcional.
- Calotas: 8 formatos (`ninja3` = estrela de 3 pontas grossas, etc.).
- Pintura é mapeada **manualmente** pelo usuário por carro (nada de pintura automática). Na garagem: Espaço troca a cor, Shift+Espaço volta.
- Piloto (`pilot`): só nos conversíveis; fallback geométrico com cabelo que esvoaça; funciona também no tráfego (`like` copia).

## Tráfego
Categorias `sedan, van, pickup, hatch, povao, truck` com `variants` e `like` (copia modelo/tamanho de um carro, inclusive secreto). `trafficPool` por pista aceita multiplicadores por categoria e por nome de variante. Todas as categorias aparecem em todas as pistas, com pesos por cenário.

## Grid
`grid`: `cars 10` (9 IA), `reduced 5`, `rowGap 18` (dobrado porque batia no carro da frente), `trafficScale 0.6`, `balance`, `champBalance`, `bossSkill`, `skill`, `rubber`, nomes e cores. Se o desempenho cair, reduzir de 2 em 2.

## Cheat codes
Digitar a palavra nos menus ou usar `index.html#id` na URL. Carro: `code` em vehicles.js; pista: `code` em tracks.js (Oásis = `tepui`); clima: `neve`. Acertar toca jingle anos 80 e mostra "Código aceito".

## Desbloqueio por campeonato
`Config.champ.unlocks`: `{ 1: 'all' }` libera todos os X (inclusive futuros) ao terminar em 1º. Recompensas de 2º e 3º serão definidas pelo usuário (ex.: `{ 2: ['id'], 3: ['id'] }`).
