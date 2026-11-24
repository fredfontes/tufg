# Pistas, cenários e campeonato (`tracks.js`)

## Cenários (`sceneries`)
`coast` (costa litorânea), `urban` (centro urbano), `farm` (campos de fazenda), `mountain` (montanhas da serra), `canyon` (cânion), `oasis` (oásis estilo Monte Roraima). O cabeçalho do arquivo documenta adereços (`props`), `ads`, skybox e regras.

## Pistas originais
| id | Nome | Cenário |
|---|---|---|
| `litoral` | Costa Dourada | coast |
| `urbana` | Centro Neon | urban |
| `fazenda` | Campos do Vale | farm |
| `serra` | Serra Verde | mountain |
| `canion` | Estrada do Cânion | canyon |
| `oasis` | Oásis do Tepui (secreta, `code: 'tepui'`) | oasis |

Cada uma tem 3 variações de traçado `_b`, `_c`, `_d` (`variantOf`, fora da seleção normal de pista base, dentro do campeonato). Campos: `name, scenery, time, rainChance, difficulty, blurb, width, wall, step, runoff, startS, seed, traffic, trafficPool, segments, ranks`.
- Traçados `_b`: arcos largos ~180°, bifurcação e 2 atalhos de terra (`cuts`); atalhos usam asfalto padrão.
- Bifurcação (`fork: { from 0.3–0.7, len, side, amp }`): bots sorteiam o caminho; vale em qualquer horário/clima. Litoral/fazenda/cânion = estradas paralelas; urbana/serra = desvio curto.
- Tráfego por pista: litoral 14, urbana 18, fazenda 10, serra 12, cânion 14, oasis 8 (× `trafficScale`).

## Relevo (v0.75)
`elev: [[metros, altura], ...]` em tracks.js; altura suavizada entre pontos, menor altura vira o chão. Inclinação realista até ~8–12%; estilo arcade exagerado 25–30%; começo e fim planos. Variantes não herdam `elev`. Ao lado da pista o chão é plano até `wall + 16` m e depois cai em encosta até o chão base. Hoje só `serra` tem relevo, em modo "toboga" exagerado (0 → 70 m, ~30% nos trechos mais íngremes; a v0.76 tinha 34 m e ~12%, na branch `0.76`). Valores sugeridos para pistas normais: até ~8–12%. A gravidade da ladeira está em `CarSim.step` (fator 1,1). Ainda não cobre canopy (palmeiras/bambu do Oásis) nem a água do litoral.

## Horário e clima
Horários: amanhecer, dia, entardecer (sun flare), noite. Climas: limpo, chuva, neve (secreto). Pista/horário/clima aleatórios por padrão na primeira visita e quando marcados "aleatório" (o cenário atrás do menu já é sorteado e usado na 1ª corrida). `times` pode ser sobrescrito campo a campo em tracks.js. O Oásis tem `sunrise`: começa no amanhecer e vira dia durante a corrida.

## Campeonato
- 5 pistas × 4 horários = 20 etapas; em cada pista a etapa 1 é o traçado original e as 2–4 são as variações; depois vem o Oásis (final/chefão, só aparece no fim).
- `passGrade: 'C'`, pontos S100/A75/B55/C35/D15; prêmios por posição (pódio paga mais), `prices` B 20k / A 55k / S 100k, `startClass: 'C'`, `repeat 0.3`, `botIncome 1.3`.
- Bots juntam dinheiro e compram carros melhores (alguns cedo, outros poupam para o fim).
- Fim: 1º–3º = pódio com fogos; 4º+ = tela final com origami e "Tentar novamente".

## Outdoors (`ads.js`)
Texto grande + menor, cores de borda/fundo ou imagem SVG/PNG (local ou absoluta). `tracks.js` só referencia os ids.

## Skybox
Imagem SVG/PNG por pista ao fundo de tudo (`assets/skybox/`).
