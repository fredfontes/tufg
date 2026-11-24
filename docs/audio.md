# Áudio

## Som dos carros
Sintetizado (estilo NFS Underground): aceleração, troca de marcha, frenagem, assobio de turbo (volume reduzido em 40%). Padrão original, com campo personalizado por carro em `vehicles.js` para sobrescrever. Bots emitem motor: até 4 vozes dos mais próximos, ~75% do volume do jogador, pan lateral, alcance 120 m.

## Jukebox (`music.js`, fonte da verdade do usuário)
Músicas geradas pelo próprio usuário (Suno), ~2:29 cada, MP3 em `assets/music/`:
- `the_urge_for_gas.mp3`: abertura (`first`, `menuOnly`), toca primeiro no menu.
- `golden_coast` (litoral), `neon_downtown` (urbana), `valley_fields` (fazenda), `green_mountain` (serra), `canyon_road` (canion), `tepui_oasis` (oasis).
- Títulos no formato "kurtabble - Nome".

Comportamento: menus tocam aleatório (nunca a mesma duas vezes); na corrida a música some na contagem e no **GO!** entra a da pista (variantes usam a da origem); ao terminar sorteia outra; continua pelo resultado e menus. Pausa abaixa o volume (`duck`). Streaming, arquivo ausente é ignorado. Formato recomendado: MP3 192 kbps VBR, ~-16 LUFS.

## Autoplay
Navegadores bloqueiam áudio antes de interação. A música de abertura tenta tocar sozinha; se bloqueada, começa no primeiro click/touchend/keydown (desbloqueio desfeito se o navegador bloquear). O botão "Continuar" do loading serve a esse toque. Problema recorrente no Brave mobile; testar em dispositivo real.

## Controles de áudio
`M` liga/desliga todo o som, `N` pula música, toggle "Música" no menu de pausa (só jukebox). Jukebox visual só aparece no menu principal depois do loading.
