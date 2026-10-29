/* =====================================================================
   THE URGE FOR GAS — PISTAS E CENÁRIOS
   Edite este arquivo para gerenciar as pistas. É carregado antes do jogo (index.html).

   ESTRUTURA
     order        ordem das pistas na tela de seleção (e, no futuro, no campeonato)
     tracks       as pistas: traçado, cenário, tráfego e tempos de referência
     sceneries    os cenários: cores, relevo, adereços e fundo. Uma pista usa um cenário.

   PISTA (tracks.<id>)
     name, blurb  nome e descrição curta (aparecem no menu)
     scenery      id do cenário (coast | urban | farm | mountain | canyon, ou um que você criar)
     time         horário padrão da pista: 'amanhecer' | 'dia' | 'entardecer' | 'noite'
                  (usado quando o jogador deixa o horário em "Padrão"; o jogador pode escolher outro na tela de pistas)
     rainChance   0 a 1: chance de chuva quando o clima está em "Aleatório" (padrão 0.3)
     difficulty   1 a 5, só informativo (barras da tela de pistas)
     width, wall  largura da pista e distância do muro invisível/barreira ao eixo, em metros
     step         resolução do traçado em metros (3 é bom)
     runoff       metros de pista depois da linha de chegada
     startS       posição da largada, em metros desde o início
     seed         semente do sorteio de adereços e tráfego (mude para reorganizar o cenário)
     traffic      quantidade de veículos de tráfego
     trafficPool  ids de vehicles.js que podem aparecer nesta pista (null = todos)
     segments     traçado: lista de [comprimento em m, curva total em graus]. Positivo = esquerda.
                  Ex.: [200,0] reta de 200 m; [120,90] curva de 90° à esquerda em 120 m (raio ≈ 76 m).
                  A pista não pode cruzar a si mesma nem passar perto demais de outro trecho (use 150 m ou mais).
     tunnels      (opcional) túneis de pedra com iluminação: lista de [de, até] em metros ao longo da pista, ex.: [[320,405],[1215,1325]].
                  Eles formam um morro sobre a pista; adereços e placas ficam fora dessas áreas.
     ranks        tempos [S, A, B, C] em segundos para as notas na tela de resultado
     base         (opcional) id de outra pista da qual esta herda tudo (cenário, largura, tráfego, anúncios...). Só o que você escrever aqui muda.
                  Uma pista com  base  é um TRAÇADO NOVO da pista de origem: aparece na seleção de pistas, no sorteio e no campeonato (etapas 2, 3 e 4 de cada pista).
                  (Não herda  fork ,  tunnels  nem  canopy : declare os seus.)
     cuts         (opcional) atalhos de terra: caminhos curtos e estreitos por dentro de uma curva, com menos aderência. Cada piloto de IA decide se usa.
                    cuts: [ { at: 900, len: 320, amp: 44 }, ... ]
                      at     metro do percurso onde o atalho começa
                      len    comprimento do atalho em metros
                      amp    quanto ele se afasta da pista, em metros (o lado é sempre o de dentro da curva; side: 'left' | 'right' força o lado)
                    Não pode sobrepor túneis, cobertura nem a bifurcação (o jogo ignora o atalho e avisa no console).
     fork         (opcional) bifurcação: a pista se divide em dois caminhos paralelos que voltam a se encontrar. Vale em qualquer horário e clima.
                    fork: { from: 0.45, len: 800, side: 'left', amp: 46 }
                      from   onde a divisão começa, como fração do percurso (0.30 a 0.70)
                      len    comprimento total da bifurcação em metros (até se encontrar de novo)
                      side   'left' | 'right': para que lado sai o segundo caminho
                      amp    distância lateral máxima entre os eixos dos dois caminhos, em metros (46 = duas pistas separadas, com barreira no meio; 24 = desvio curto ao lado)
                    Cada piloto de IA sorteia o caminho. Evite curvas muito fechadas do lado de dentro do desvio (o jogo avisa no console e ignora a bifurcação) e túneis na área.
     ads          (opcional) lista de ids de ads.js só para esta pista; substitui os billboards do cenário
     skybox       (opcional) imagem SVG ou PNG panorâmica (equiretangular, proporção 2:1, ex.: 2048 × 1024) usada como céu 3D por trás de tudo,
                  no lugar do degradê padrão. Texto simples: skybox: 'img/ceu.png'  (local, da pasta do jogo, ou endereço absoluto https://...).
                  Forma completa: skybox: { image: 'img/ceu.png', byTime: { noite: 'img/ceu_noite.png' }, size: 2048, rotate: 0, hideBackdrop: false }
                    byTime       (opcional) imagem diferente por horário (amanhecer | dia | entardecer | noite); o que faltar usa  image
                    size         largura em pixels com que a imagem é guardada (padrão 2048; use 4096 para PNG grande e nítido)
                    rotate       gira o céu em graus (para posicionar o sol ou uma montanha do desenho)
                    hideBackdrop true = esconde as montanhas/cidade distantes do cenário (o desenho do céu já traz o horizonte)
                  As estrelas somem quando há skybox. Se a imagem não carregar, o céu padrão continua. Exemplo pronto: img/exemplo_skybox.svg
     canopy       (opcional) vegetação sobre a pista: lista de { kind, from, to } em metros. kind 'palm' = palmeiras inclinadas cujas copas se cruzam
                  acima da pista; kind 'bamboo' = bosque de bambu que fecha um túnel verde (sombreia o asfalto). Adereços comuns saem dessas áreas.
     boss         (opcional) true = etapa de chefão: os rivais correm com mais habilidade (grid.bossSkill em vehicles.js)

   HORÁRIOS E CLIMA (opcional, no topo de window.TUFG_TRACKS: times: { dia: { ... } })
     Os horários (amanhecer, dia, entardecer, noite) e a chuva já vêm definidos em index.html (Config.times).
     Para ajustar um deles sem mexer no código, declare  times: { noite: { fogFar: 380, tint: '#6070a0' } }  aqui:
     os campos informados substituem os padrões. Campos: label, skyTop, skyMid, horizon, fog, fogNear, fogFar,
     sun, sunDir [x,y,z], hemiSky, hemiGround, hemi, sunLight, sunI, tint (cor aplicada às superfícies sem luz),
     flare (0-1, brilho do sun flare), stars (0-1), moon (true/false), winLit (0-1, janelas acesas),
     headlights (0-1, farol do carro), lampGlow (true/false, brilho dos postes).

   CAMPEONATO (championship, no topo de window.TUFG_TRACKS) — todos os campos são opcionais
     times        horários de cada cenário, em ordem (padrão: amanhecer, dia, entardecer, noite)
     tracks       ids das pistas do campeonato, em ordem (padrão: as pistas de  order  que não têm  base ). Etapas = pistas x horários (5 x 4 = 20). Em cada pista a 1ª etapa é o traçado original e as seguintes são seus traçados novos (base), na ordem de  order 
     finale       id da pista final, fora da lista  order  (padrão: 'oasis'). É um percurso livre, sem nota, que fecha o campeonato
     finaleTime   horário da etapa final (padrão: 'amanhecer')
     passGrade    nota mínima para liberar a próxima etapa: 'S' | 'A' | 'B' | 'C' | 'D' (padrão 'C')
     points       pontos por nota (padrão S 100, A 75, B 55, C 35, D 15)
   A chuva de cada etapa é sorteada ao começar o campeonato, com a chance  rainChance  da pista.

   CENÁRIO (sceneries.<id>)
     label        nome do ambiente
     ground       cor do terreno: { color, color2, fleck }
     water        (opcional) mar à direita da pista: { color, y, edge, wobble, foam, sand }
     land         (opcional, com water) quantos metros de terra à esquerda da pista
     road         { asphalt, curb:[cor1,cor2], lines:false (opcional: sem faixas pintadas, para estrada de terra) }
     sidewalk     (opcional) calçada: { width, color }
     barrier      { kind:'band'|'planks'|'stone', colors:[a,b], height, top }
     cliffs       (opcional) paredão de rocha: { side:'left'|'right'|'both', offset, height:[min,max], colors:[...] }
     backdrop     fundo distante: { kind:'mountains'|'hills'|'skyline'|'mesas'|'tepui', layers:[[cor, altura 0-1, frequência],...], snow, scaleY (opcional: fundo mais alto, 1 = normal) }
                  (listar do mais distante para o mais próximo)
     posts        true = marcadores brancos ao lado da pista
     props        lista de regras de adereços (abaixo)
     billboards   ['id', 'id', ...] outdoors ao lado da pista, pelo id em ads.js (veja ads.js para criar/editar outdoors com texto grande, texto menor,
                  cor da borda e de fundo, ou uma imagem SVG/PNG). O antigo formato [texto, cor] ainda funciona.
     billboard    (opcional) { dist, scale }: distância da barreira e tamanho das placas (padrão 10 e 1)

   REGRA DE ADEREÇO (props)
     kind      pine | tree | palm | cactus | bush | rock | house | barn | silo | bale | windmill | powerpole |
               lamp | umbrella | lighthouse | hill | mesa | building | field
     step      [mín, máx] metros entre um adereço e o próximo ao longo da pista
     at        [metros...] posições exatas em vez de step (para marcos, como o farol)
     side      'left' | 'right' | 'both' | 'alt' (alterna)
     dist      [mín, máx] distância da barreira, em metros
     scale     [mín, máx] tamanho
     stretch   [largura, altura] proporção (colinas e mesas)
     chance    0 a 1, probabilidade de aparecer em cada posição
     clump     [mín, máx] quantos de uma vez (grupos de árvores); spread = espalhamento
     palette   lista de cores (hex) das variações do adereço
     face      true = vira de frente para a pista (casas, postes de luz)
     Para criar um adereço novo (ex.: 'chalé'), adicione o desenho em PROPS no index.html.
   ===================================================================== */
window.TUFG_TRACKS = {
  order: ['litoral', 'litoral_b', 'litoral_c', 'litoral_d', 'urbana', 'urbana_b', 'urbana_c', 'urbana_d', 'fazenda', 'fazenda_b', 'fazenda_c', 'fazenda_d', 'serra', 'serra_b', 'serra_c', 'serra_d', 'canion', 'canion_b', 'canion_c', 'canion_d'],
  championship: { finale: 'oasis', finaleTime: 'amanhecer', passGrade: 'C' },

  tracks: {
    litoral: {
      name: 'Costa Dourada', scenery: 'coast', time: 'dia', rainChance: 0.25, difficulty: 2,
      blurb: 'Curvas longas e rápidas à beira-mar, com o oceano sempre à direita. Boa para abrir o acelerador.',
      width: 16, wall: 12, step: 3, runoff: 140, startS: 9, seed: 21,
      traffic: 7, trafficPool: ['sedan', 'van'],
      segments: [[240,0],[260,35],[200,0],[300,-50],[160,0],[240,60],[200,0],[280,-65],[160,0],[120,70],[200,0],[300,40],[220,0],[240,-55],[260,0]],
      ranks: [63, 69, 77, 90]
    },
    urbana: {
      name: 'Centro Neon', scenery: 'urban', time: 'dia', rainChance: 0.35, difficulty: 4,
      blurb: 'Avenidas entre prédios, curvas de 90° e muito tráfego. Exige freio e precisão.',
      width: 18, wall: 13, step: 3, runoff: 140, startS: 9, seed: 33,
      traffic: 9, trafficPool: null,
      segments: [[260,0],[90,90],[200,0],[90,-90],[220,0],[90,-90],[240,0],[90,90],[260,0],[90,90],[220,0],[90,-90],[300,0],[90,-90],[200,0],[90,90],[320,0],[90,90],[240,0]],
      ranks: [90, 98, 110, 128]
    },
    fazenda: {
      name: 'Campos do Vale', scenery: 'farm', time: 'dia', rainChance: 0.3, difficulty: 1,
      blurb: 'Estrada de terra batida entre plantações. Retas longas, curvas suaves e caminhões lentos.',
      width: 14, wall: 11, step: 3, runoff: 140, startS: 9, seed: 47,
      traffic: 5, trafficPool: ['van', 'truck'],
      segments: [[300,0],[200,-25],[180,0],[200,30],[320,0],[220,-35],[180,0],[240,40],[320,0],[100,-80],[200,0],[220,35],[340,0]],
      ranks: [56, 61, 69, 80]
    },
    serra: {
      name: 'Serra Verde', scenery: 'mountain', time: 'dia', rainChance: 0.45, difficulty: 5,
      blurb: 'Subida e descida de serra com paredões de pedra e curvas fechadas em zigue-zague.',
      width: 14, wall: 11, step: 3, runoff: 140, startS: 9, seed: 58,
      traffic: 6, trafficPool: ['sedan', 'van'],
      tunnels: [[320, 405], [1215, 1325], [1705, 1855]],
      segments: [[200,0],[110,100],[100,0],[120,-110],[90,0],[130,90],[110,0],[110,-120],[100,0],[140,100],[120,0],[130,-100],[100,0],[140,110],[160,0],[130,-90],[140,0],[120,95],[120,0],[130,-95],[260,0]],
      ranks: [84, 92, 104, 122]
    },
    canion: {
      name: 'Estrada do Cânion', scenery: 'canyon', time: 'entardecer', rainChance: 0.15, difficulty: 3,
      blurb: 'Descida rápida por um cânion de rocha vermelha. Desvie do tráfego e derrape nas curvas fechadas.',
      width: 16, wall: 12, step: 3, runoff: 140, startS: 9, seed: 11,
      traffic: 7, trafficPool: null,
      segments: [[200,0],[180,40],[140,0],[200,-55],[100,0],[110,85],[160,0],[160,-100],[120,0],[200,45],[260,0],[180,-60],[140,0],[120,80],[200,0],[240,-50],[160,0],[220,60],[300,0]],
      ranks: [76, 84, 95, 110]
    },
    /* ---- Traçados novos: 3 por pista. base = pista de onde herdam cenário, tráfego e ajustes. Têm bifurcação (fork) em qualquer horário e clima. ---- */
    litoral_b: {
      base: 'litoral', name: 'Costa Dourada · Enseada', difficulty: 2, seed: 101,
      blurb: 'Arcos longos e largos contornando a enseada, sem curvas fechadas. A pista se divide em dois caminhos e tem atalhos de terra.',
      segments: [[220,0],[540,180],[100,0],[300,-70],[640,0],[540,-170],[160,0],[300,60],[240,0]],
      fork: { from: 0.37, len: 820, side: 'left', amp: 46 },
      cuts: [{ at: 348, len: 540, amp: 50, ramp: 0.45 }, { at: 2004, len: 540, amp: 50, ramp: 0.45 }],
      ranks: [60, 66, 73, 86]
    },
    litoral_c: {
      base: 'litoral', name: 'Costa Dourada · Falésia', difficulty: 3, seed: 102,
      blurb: 'Trecho mais técnico, com curvas fechadas entre barrancos. A pista se divide em dois caminhos.',
      segments: [[180,0],[140,75],[100,0],[160,-85],[120,0],[200,50],[140,0],[160,-70],[100,0],[120,95],[160,0],[240,-60],[180,0],[100,80],[140,0],[220,-55],[260,0],[160,60],[200,0]],
      fork: { from: 0.47, len: 760, side: 'left', amp: 46 },
      ranks: [71, 78, 87, 101]
    },
    litoral_d: {
      base: 'litoral', name: 'Costa Dourada · Retão', difficulty: 2, seed: 103,
      blurb: 'Longas retas de velocidade e poucas curvas. A pista se divide em dois caminhos.',
      segments: [[400,0],[220,-40],[300,0],[260,45],[500,0],[200,-55],[320,0],[240,50],[420,0],[180,-40],[360,0]],
      fork: { from: 0.34, len: 900, side: 'left', amp: 46 },
      ranks: [59, 65, 72, 84]
    },
    urbana_b: {
      base: 'urbana', name: 'Centro Neon · Avenida Sul', difficulty: 4, seed: 111,
      blurb: 'Esquinas abertas de avenida, em ritmo de bulevar. Há um desvio ao lado da pista e atalhos de terra entre os quarteirões.',
      segments: [[300,0],[300,150],[200,0],[220,-90],[460,0],[300,-140],[200,0],[220,90],[300,0],[220,90],[240,0]],
      fork: { from: 0.38, len: 440, side: 'left', amp: 24 },
      cuts: [{ at: 204, len: 540, amp: 50, ramp: 0.45 }, { at: 1740, len: 540, amp: 50, ramp: 0.45 }],
      ranks: [67, 73, 82, 96]
    },
    urbana_c: {
      base: 'urbana', name: 'Centro Neon · Zigue-zague', difficulty: 4, seed: 112,
      blurb: 'Curvas de 45° e 90° em sequência, ritmo quebrado. Há um desvio paralelo à avenida.',
      segments: [[220,0],[70,45],[160,0],[70,-45],[200,0],[70,-45],[140,0],[70,45],[240,0],[90,90],[180,0],[90,-90],[260,0],[70,45],[120,0],[70,-45],[220,0],[90,-90],[200,0],[90,90],[280,0]],
      fork: { from: 0.55, len: 440, side: 'left', amp: 24 },
      ranks: [79, 86, 97, 113]
    },
    urbana_d: {
      base: 'urbana', name: 'Centro Neon · Retorno', difficulty: 5, seed: 113,
      blurb: 'Dois retornos de 180° entre as avenidas. Há um desvio paralelo à avenida.',
      segments: [[360,0],[120,180],[300,0],[90,-90],[200,0],[90,-90],[340,0],[90,90],[220,0],[90,90],[280,0],[120,-180],[340,0],[90,90],[200,0],[90,-90],[300,0]],
      fork: { from: 0.36, len: 420, side: 'left', amp: 24 },
      ranks: [92, 100, 113, 131]
    },
    fazenda_b: {
      base: 'fazenda', name: 'Campos do Vale · Colheita', difficulty: 1, seed: 121,
      blurb: 'Grandes curvas de terra entre as plantações. A estrada se divide em dois caminhos e há atalhos pelo meio do campo.',
      segments: [[320,0],[560,170],[620,0],[320,-60],[200,0],[560,-180],[180,0],[320,55],[260,0]],
      fork: { from: 0.4, len: 820, side: 'left', amp: 46 },
      cuts: [{ at: 252, len: 540, amp: 50, ramp: 0.45 }, { at: 2200, len: 540, amp: 50, ramp: 0.45 }],
      ranks: [67, 73, 82, 95]
    },
    fazenda_c: {
      base: 'fazenda', name: 'Campos do Vale · Estrada Velha', difficulty: 2, seed: 122,
      blurb: 'Mais curvas e menos retas, em terra batida. A estrada se divide em dois caminhos.',
      segments: [[260,0],[180,45],[140,0],[160,-60],[160,0],[200,55],[120,0],[180,-70],[200,0],[150,-50],[140,0],[210,65],[200,0],[160,-45],[260,0],[200,40],[240,0]],
      fork: { from: 0.5, len: 800, side: 'left', amp: 46 },
      ranks: [67, 73, 83, 96]
    },
    fazenda_d: {
      base: 'fazenda', name: 'Campos do Vale · Retão do Vale', difficulty: 1, seed: 123,
      blurb: 'Retas enormes e poucas curvas lentas. A estrada se divide em dois caminhos.',
      segments: [[480,0],[260,-30],[420,0],[220,35],[540,0],[160,-75],[300,0],[240,30],[460,0]],
      fork: { from: 0.36, len: 900, side: 'right', amp: 46 },
      ranks: [55, 60, 68, 78]
    },
    serra_b: {
      base: 'serra', name: 'Serra Verde · Subida Norte', difficulty: 5, seed: 131,
      blurb: 'Curvas largas, um grampo e túneis. Há um desvio ao lado da pista e atalhos de terra pela encosta.',
      tunnels: [[990, 1080], [1971, 2061], [2691, 2781]],
      segments: [[200,0],[420,160],[100,0],[260,-80],[560,0],[420,-170],[140,0],[260,75],[100,0],[220,-110],[240,0]],
      fork: { from: 0.42, len: 380, side: 'left', amp: 24 },
      cuts: [{ at: 204, len: 540, amp: 50, ramp: 0.45 }],
      ranks: [66, 73, 82, 96]
    },
    serra_c: {
      base: 'serra', name: 'Serra Verde · Mirante', difficulty: 4, seed: 132,
      blurb: 'Curvas mais abertas e túneis. Há um desvio ao lado da pista.',
      tunnels: [[340, 430], [820, 930], [2150, 2280]],
      segments: [[240,0],[160,70],[120,0],[150,-80],[140,0],[170,75],[100,0],[140,-85],[120,0],[110,120],[90,0],[110,-115],[130,0],[150,80],[160,0],[140,-75],[160,0],[130,90],[140,0],[150,-85],[240,0]],
      fork: { from: 0.4, len: 460, side: 'right', amp: 24 },
      ranks: [84, 92, 104, 122]
    },
    serra_d: {
      base: 'serra', name: 'Serra Verde · Caracol', difficulty: 5, seed: 133,
      blurb: 'Grampos seguidos de mais de 120°. Há um desvio ao lado da pista.',
      tunnels: [[260, 340], [760, 860], [2000, 2100]],
      segments: [[160,0],[100,130],[80,0],[100,-125],[90,0],[110,120],[80,0],[100,-130],[100,0],[120,110],[100,0],[120,-105],[110,0],[130,95],[120,0],[130,-100],[110,0],[110,120],[100,0],[110,-110],[240,0]],
      fork: { from: 0.58, len: 440, side: 'right', amp: 24 },
      ranks: [81, 88, 100, 117]
    },
    canion_b: {
      base: 'canion', name: 'Estrada do Cânion · Mesa Vermelha', difficulty: 3, seed: 141,
      blurb: 'Arcos amplos ao redor das mesas de rocha. A estrada se divide em dois caminhos e há atalhos de terra.',
      segments: [[240,0],[520,-170],[100,0],[300,70],[640,0],[520,175],[160,0],[300,-65],[240,0],[220,45],[260,0]],
      fork: { from: 0.32, len: 820, side: 'left', amp: 46 },
      cuts: [{ at: 324, len: 540, amp: 50, ramp: 0.45 }, { at: 1980, len: 540, amp: 50, ramp: 0.45 }],
      ranks: [71, 78, 89, 103]
    },
    canion_c: {
      base: 'canion', name: 'Estrada do Cânion · Garganta', difficulty: 3, seed: 142,
      blurb: 'Curvas largas e rápidas pela garganta. A estrada se divide em dois caminhos.',
      segments: [[260,0],[150,60],[200,0],[140,-75],[180,0],[170,70],[240,0],[120,-100],[160,0],[180,60],[200,0],[150,-70],[240,0],[130,90],[200,0],[170,-55],[300,0]],
      fork: { from: 0.5, len: 780, side: 'left', amp: 46 },
      ranks: [78, 86, 97, 113]
    },
    canion_d: {
      base: 'canion', name: 'Estrada do Cânion · Desfiladeiro', difficulty: 4, seed: 143,
      blurb: 'Trecho curto e nervoso, de curvas fechadas. A estrada se divide em dois caminhos.',
      segments: [[200,0],[100,100],[100,0],[110,-100],[120,0],[130,85],[100,0],[120,-90],[160,0],[100,110],[120,0],[110,-105],[140,0],[140,80],[160,0],[120,-85],[240,0]],
      fork: { from: 0.52, len: 760, side: 'left', amp: 46 },
      ranks: [68, 75, 85, 98]
    },

    /* Final do campeonato: não está em  order , então não aparece na seleção de pistas. Percurso livre até o oásis. */
    oasis: {
      code: 'tepui',   // palavra secreta que libera esta pista na seleção (digitar nos menus, ou index.html#oasis)
      name: 'Oásis do Tepui', scenery: 'oasis', time: 'amanhecer', rainChance: 0, difficulty: 1,
      blurb: 'Fase final de chefão: 6 km de selva, palmeiras sobre a pista e túneis de bambu, até a lagoa aos pés de um tepui.',
      width: 16, wall: 12, step: 3, runoff: 140, startS: 9, seed: 77, boss: true,
      traffic: 4, trafficPool: null,
      segments: [[300,0],[220,-40],[180,0],[260,60],[200,0],[180,-90],[160,0],[240,70],[300,0],[200,-50],[140,0],[200,-75],[260,0],[160,100],[220,0],[240,-60],[320,0],[180,80],[260,0],[300,-45],[200,0],[220,50],[180,0],[200,-110],[300,0],[260,40],[400,0]],
      /* copas de palmeira sobre a pista e túneis de bambu (veja canopy na documentação) */
      canopy: [
        { kind: 'palm', from: 650, to: 920 }, { kind: 'bamboo', from: 1250, to: 1560 }, { kind: 'palm', from: 2000, to: 2350 },
        { kind: 'bamboo', from: 2750, to: 3150 }, { kind: 'palm', from: 3500, to: 3800 }, { kind: 'bamboo', from: 4350, to: 4800 },
        { kind: 'palm', from: 5050, to: 5250 }, { kind: 'bamboo', from: 5350, to: 5650 }
      ],
      ranks: [1, 2, 3, 4]
    }
  },

  sceneries: {
    /* ---------- LITORAL: areia, mar à direita, palmeiras, casinhas e um farol ---------- */
    coast: {
      label: 'Litoral',
      ground: { color: '#c9bd7c', color2: '#bdaf6c', fleck: 'rgba(255,255,230,.10)' },
      water: { color: '#2c86b5', y: -0.5, edge: 10, wobble: 4, foam: '#f4f8f6', sand: '#e9d9a4' },
      land: 120,
      road: { asphalt: '#43464c', curb: ['#eceeea', '#2a6fb5'] },
      barrier: { kind: 'band', colors: ['#eef0f2', '#2a6fb5'], height: 0.9, top: true },
      backdrop: { kind: 'hills', seed: 4, layers: [['#aac8dc', 0.30, 1], ['#8fb3cf', 0.22, 2], ['#7ba0c2', 0.14, 3]] },
      posts: true,
      props: [
        { kind: 'palm', step: [9, 16], side: 'right', dist: [2.5, 7], scale: [0.85, 1.3], chance: 0.9 },
        { kind: 'palm', step: [14, 26], side: 'left', dist: [4, 32], scale: [0.8, 1.3], chance: 0.8, clump: [1, 3], spread: 5 },
        { kind: 'umbrella', step: [70, 130], side: 'right', dist: [3, 6], scale: [1, 1.2], clump: [1, 3], spread: 5, palette: [0xd8432f, 0xf2c230, 0x2f7fd0] },
        { kind: 'rock', step: [30, 60], side: 'both', dist: [3, 22], scale: [0.8, 2], palette: [0x8d8576, 0x9a9282, 0x7b7568] },
        { kind: 'house', step: [70, 120], side: 'left', dist: [18, 46], scale: [0.9, 1.25], face: true, palette: [0xf2efe6, 0xf4e6b8, 0xdbe8f2] },
        { kind: 'lighthouse', at: [1250], side: 'right', dist: [6, 6], scale: [1, 1], face: false },
        { kind: 'hill', step: [26, 44], side: 'left', dist: [75, 135], scale: [30, 62], stretch: [1, 0.55], palette: [0x8d9a58, 0x7a8a4e, 0x9aa662] }
      ],
      billboards: ['surf', 'sorvete', 'farol', 'brisa', 'octana', 'peixe']
    },

    /* ---------- URBANO: prédios, calçadas, postes de luz, horizonte de cidade ---------- */
    urban: {
      label: 'Centro urbano',
      ground: { color: '#5d6168', color2: '#555960', fleck: 'rgba(255,255,255,.06)' },
      road: { asphalt: '#2d3035', curb: ['#e8c84a', '#2b2b2b'] },
      sidewalk: { width: 6, color: '#9fa3aa' },
      barrier: { kind: 'band', colors: ['#c5c8cd', '#e0b400'], height: 0.9, top: true },
      backdrop: { kind: 'skyline', seed: 9, layers: [['#9aa6b8', 0.5, 1], ['#7a879b', 0.38, 2], ['#5d6a80', 0.26, 3]] },
      posts: false,
      props: [
        { kind: 'building', step: [14, 24], side: 'both', dist: [7, 8], scale: [1, 1], heights: [14.4, 28.8, 43.2], palette: [0xd9d2c3, 0xb9c3cf, 0xc9b9a5, 0xa9b1ba, 0xe0d8c8] },
        { kind: 'building', step: [26, 40], side: 'both', dist: [42, 90], scale: [1, 1], heights: [28.8, 43.2, 43.2], palette: [0xb9c3cf, 0xa9b1ba, 0x9aa3ad], group: 'far' },
        { kind: 'lamp', step: [30, 30], side: 'alt', dist: [2.2, 2.2], scale: [1, 1], face: true },
        { kind: 'tree', step: [40, 70], side: 'both', dist: [3.6, 3.6], scale: [0.55, 0.75], palette: [0x4f8a3c, 0x5c9a44] }
      ],
      billboard: { dist: 3.8, scale: 0.55 },
      billboards: ['neon', 'banco', 'turbolube', 'redline', 'pizza', 'metro']
    },

    /* ---------- FAZENDA: lavouras, cercas, celeiros, silos e moinho ---------- */
    farm: {
      label: 'Campos de fazenda',
      ground: { color: '#7d9b3f', color2: '#728f37', fleck: 'rgba(255,255,200,.08)' },
      road: { asphalt: '#6a6258', curb: ['#d6d0c0', '#8d8472'], lines: false },
      barrier: { kind: 'planks', colors: ['#f0ece0', '#8a6a44'], height: 1.1, top: false },
      backdrop: { kind: 'hills', seed: 2, layers: [['#a9c2c8', 0.30, 1], ['#94b0a0', 0.22, 2], ['#7f9e7c', 0.16, 3]] },
      posts: false,
      props: [
        { kind: 'field', step: [55, 95], side: 'both', dist: [9, 90], scale: [1, 1], group: 'field', palette: [0xd8b84a, 0x5d9230, 0x8a5e34] },
        { kind: 'tree', step: [14, 30], side: 'both', dist: [3, 70], scale: [0.8, 1.4], chance: 0.6, clump: [1, 3], spread: 5, palette: [0x4f8a3c, 0x5c9a44, 0x437a35] },
        { kind: 'powerpole', step: [42, 42], side: 'left', dist: [3.5, 3.5], scale: [1, 1] },
        { kind: 'barn', step: [220, 340], side: 'both', dist: [26, 70], scale: [1, 1.3], face: true, palette: [0xa83a2a, 0xb8452f] },
        { kind: 'silo', step: [220, 340], side: 'both', dist: [30, 74], scale: [1, 1.25] },
        { kind: 'bale', step: [45, 90], side: 'both', dist: [6, 40], scale: [0.9, 1.3], clump: [2, 4], spread: 4, palette: [0xd8b85a, 0xc9a948] },
        { kind: 'windmill', at: [700, 1900, 2800], side: 'right', dist: [34, 50], scale: [1, 1.15] },
        { kind: 'hill', step: [60, 100], side: 'both', dist: [110, 230], scale: [50, 110], stretch: [1, 0.3], palette: [0x8fae5a, 0x7e9d4f, 0xa0b866] }
      ],
      billboards: ['milho', 'laticinios', 'feira', 'coop', 'turbolube2', 'octana']
    },

    /* ---------- SERRA: pinheiros, paredão de pedra, montanhas com neve ---------- */
    mountain: {
      label: 'Montanhas da serra',
      ground: { color: '#55733a', color2: '#4a6733', fleck: 'rgba(230,255,220,.07)' },
      road: { asphalt: '#3a3d42', curb: ['#e8e8e0', '#b4532f'] },
      barrier: { kind: 'stone', colors: ['#9a958a', '#6f6a60'], height: 1.0, top: true },
      cliffs: { side: 'left', offset: 3.5, height: [9, 20], colors: ['#8a8478', '#6f6a60', '#9a9488', '#5f5a52', '#7b7468'] },
      backdrop: { kind: 'mountains', seed: 6, snow: true, layers: [['#b9c4d6', 0.62, 1], ['#8c9ab4', 0.48, 2], ['#68789a', 0.34, 3]] },
      posts: true,
      props: [
        { kind: 'pine', step: [4, 8], side: 'both', dist: [3, 60], scale: [0.9, 1.7], chance: 0.85, clump: [1, 3], spread: 5, palette: [0x24592f, 0x2c6a37, 0x1e4d2b] },
        { kind: 'rock', step: [25, 50], side: 'right', dist: [3, 20], scale: [1, 2.4], palette: [0x8a8478, 0x7b7568, 0x9a9488] },
        { kind: 'hill', step: [30, 56], side: 'both', dist: [60, 170], scale: [55, 115], stretch: [1, 0.95], palette: [0x5f7a4a, 0x6f8a58, 0x7a8a78] }
      ],
      billboards: ['mirante', 'pedagio', 'cafeserra', 'curvas']
    },

    /* ---------- CÂNION: rocha vermelha, mesas, cactos e arbustos secos ---------- */
    canyon: {
      label: 'Cânion',
      ground: { color: '#c58a52', color2: '#b97b45', fleck: 'rgba(255,230,190,.10)' },
      road: { asphalt: '#3b3e44', curb: ['#d83a2a', '#f0f0ea'] },
      barrier: { kind: 'band', colors: ['#c9ccd0', '#d4402e'], height: 0.95, top: true },
      cliffs: { side: 'both', offset: 4, height: [10, 26], colors: ['#b4553a', '#c96f45', '#a24630', '#d08a52', '#8f3b2a'] },
      backdrop: { kind: 'mesas', seed: 3, layers: [['#d9a888', 0.42, 1], ['#c08068', 0.32, 2], ['#a2604c', 0.22, 3]] },
      posts: true,
      props: [
        { kind: 'mesa', step: [60, 110], side: 'both', dist: [45, 170], scale: [20, 42], stretch: [1.1, 1.5], palette: [0xb4553a, 0xc2683f, 0xa8482f], group: 'mesa' },
        { kind: 'cactus', step: [20, 40], side: 'both', dist: [3, 40], scale: [0.8, 1.4], palette: [0x4f8a45, 0x5c9a50] },
        { kind: 'bush', step: [8, 16], side: 'both', dist: [3, 30], scale: [0.7, 1.4], chance: 0.8, palette: [0x7a7a3a, 0x8a8a45, 0x666a30] },
        { kind: 'rock', step: [15, 30], side: 'both', dist: [3, 28], scale: [0.8, 2.2], palette: [0xa4553a, 0xb4663f, 0x8f4a32] }
      ],
      billboard: { dist: 2.4, scale: 0.36 },   // pequenas e coladas na zebra: entre a barreira e o paredão
      billboards: ['valvula', 'asfaltocafe', 'octana']
    },

    /* ---------- OÁSIS (final): lagoa à direita, floresta, paredões e tepuis com névoa ao fundo ---------- */
    oasis: {
      label: 'Oásis',
      ground: { color: '#4f8a3a', color2: '#437a33', fleck: 'rgba(220,255,200,.08)' },
      water: { color: '#2f9a9a', y: -0.5, edge: 10, wobble: 3, foam: '#e8f4ee', sand: '#d8c89a' },
      land: 120,
      road: { asphalt: '#4a4a48', curb: ['#e8e8e0', '#3d7a4a'] },
      barrier: { kind: 'band', colors: ['#d9d5c4', '#4d8a52'], height: 0.9, top: true },
      cliffs: { side: 'left', offset: 4, height: [6, 15], colors: ['#6a6a58', '#7a7a64', '#59604a', '#6f6a58'] },
      backdrop: { kind: 'tepui', seed: 5, scaleY: 2.3, layers: [['#8fa0a8', 0.78, 1], ['#6f6a5c', 0.62, 1.5], ['#5a5246', 0.46, 2]] },
      posts: true,
      props: [
        { kind: 'palm', step: [8, 14], side: 'right', dist: [2.5, 7], scale: [0.9, 1.4], chance: 0.9 },
        { kind: 'tree', step: [10, 20], side: 'left', dist: [8, 50], scale: [1, 1.7], chance: 0.8, clump: [1, 3], spread: 6, palette: [0x2f7a3a, 0x3a8a44, 0x266a32] },
        { kind: 'bush', step: [6, 12], side: 'both', dist: [3, 30], scale: [0.8, 1.5], chance: 0.8, palette: [0x3a7a3a, 0x4a8a44] },
        { kind: 'rock', step: [30, 60], side: 'both', dist: [3, 22], scale: [0.8, 2], palette: [0x7a7568, 0x8a8576] },
        { kind: 'mesa', step: [80, 140], side: 'left', dist: [90, 220], scale: [28, 60], stretch: [0.8, 2.2], palette: [0x6a5a48, 0x7a6650], group: 'mesa' },
        { kind: 'hill', step: [26, 44], side: 'left', dist: [60, 140], scale: [30, 60], stretch: [1, 0.7], palette: [0x3f7a3f, 0x4f8a48] }
      ],
      billboards: ['oasis', 'ultima']
    }
  }
};
