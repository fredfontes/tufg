/* =====================================================================
   THE URGE FOR GAS — JUKEBOX / RÁDIO
   Edite este arquivo para gerenciar as músicas. É carregado antes do jogo (index.html).

   COMO FUNCIONA
   - Nos menus, as músicas tocam sem parar, em ordem aleatória (nunca a mesma duas vezes seguidas), com fade entre elas.
   - Ao começar a corrida, a música do menu some durante a contagem e, no  GO! , entra a música da pista (campo  track ).
     Pistas derivadas (_b, _c, _d) usam a música da pista de origem. Se a música terminar com a corrida ainda em andamento,
     a próxima é sorteada entre todas. A música não corta ao cruzar a linha de chegada: segue pelo resultado e pelos menus.
   - Na pausa o volume cai. A tecla M liga/desliga todo o som (carros e músicas) e a tecla N pula para outra música.
   - Ao abrir o jogo, a música marcada com  first  começa assim que o carregamento termina. Como os navegadores bloqueiam som antes de o jogador interagir,
     a tela de carregamento termina com "aperte uma tecla ou clique" e a música começa nesse toque (esse toque não aciona mais nada no jogo).
     Se o navegador já liberar o som (ex.: o jogador já interagiu com o site), a música começa sozinha, sem pedir nada.
   - As músicas tocam em streaming (não são carregadas inteiras na memória). Se um arquivo faltar, ele é ignorado.

   FORMATO RECOMENDADO: MP3 192 kbps VBR, 44,1 kHz, estéreo, todas com o mesmo volume (cerca de -16 LUFS). Também funcionam .ogg, .m4a e .wav.

   CAMPOS
     volume    volume geral da música, 0 a 1 (padrão 0.6)
     fade      duração dos fades em segundos (padrão 1.2)
     duck      volume durante a pausa, como fração do normal (padrão 0.3)
     tracks    lista de músicas:
                 id      identificador (sem espaços)
                 title   nome mostrado em "Tocando agora"
                 file    caminho relativo ao index.html
                 first   (opcional) true = é a primeira música a tocar ao abrir o jogo (só uma)
                 menuOnly (opcional) true = só toca nos menus; nunca é sorteada durante a corrida
                 track   (opcional) id da pista que usa esta música ao começar a corrida (litoral | urbana | fazenda | serra | canion | oasis)
   ===================================================================== */
   window.TUFG_MUSIC = {
    volume: 0.6, fade: 1.2, duck: 0.3,
    tracks: [
      { id: 'the_urge_for_gas', title: 'The Urge for Gas', file: 'assets/music/the_urge_for_gas.mp3', first: true, menuOnly: true },   // tema: sempre a primeira a tocar; só nos menus
      { id: 'golden_coast',  title: 'Golden Coast',  file: 'assets/music/golden_coast.mp3',  track: 'litoral' },   // Costa Dourada
      { id: 'neon_downtown', title: 'Neon Downtown', file: 'assets/music/neon_downtown.mp3', track: 'urbana' },    // Centro Neon
      { id: 'valley_fields', title: 'Valley Fields', file: 'assets/music/valley_fields.mp3', track: 'fazenda' },   // Campos do Vale
      { id: 'green_mountain', title: 'Green Mountain', file: 'assets/music/green_mountain.mp3', track: 'serra' },  // Serra Verde
      { id: 'canyon_road',   title: 'Canyon Road',   file: 'assets/music/canyon_road.mp3',   track: 'canion' },    // Estrada do Cânion
      { id: 'tepui_oasis',   title: 'Tepui Oasis',   file: 'assets/music/tepui_oasis.mp3',   track: 'oasis' }      // Oásis do Tepui (final)
    ]
  };