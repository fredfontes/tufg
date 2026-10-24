/* =====================================================================
   THE URGE FOR GAS — LISTA DE VEÍCULOS
   Edite este arquivo para gerenciar os carros jogáveis e os veículos do tráfego.
   Ele é carregado antes do jogo (index.html). Não precisa mexer no resto do código.

   COMO ADICIONAR UM MODELO .GLB
   1. Coloque o arquivo em  models/  (ex.: models/meu_carro.glb). Só .glb com texturas embutidas.
   2. Aponte para ele no campo  model  do veículo (caminho relativo ao index.html).
   3. Se o carro aparecer de lado, de ré ou torto, ajuste  modelRot  (graus, ver abaixo).
   Se o arquivo não carregar, o veículo cai no modelo simples e o menu mostra um aviso.

   CAMPOS COMUNS (jogáveis e tráfego)
     name         nome para exibição
     model        caminho do .glb, ou null para usar o modelo simples gerado por código
     modelRot     ORIENTAÇÃO do modelo, em graus em torno do eixo vertical:
                    0    a frente do modelo aponta para +Z (padrão glTF)
                    90 / -90 / 180   gira o modelo; use 180 se ele andar de ré
                    'auto'  gira 90° sozinho se o modelo estiver mais largo que comprido
     modelScale   multiplicador extra de tamanho (padrão 1). O modelo já é ajustado ao  length.
     modelOffset  [x, y, z] em metros para deslocar o modelo (x = esquerda, y = cima, z = frente)
     length,width comprimento e largura em metros. Definem o tamanho do modelo e da caixa de colisão.

   CARROS JOGÁVEIS (cars) — todos aparecem na Garagem, na ordem em que estão listados aqui.
     wing         false remove o aerofólio do modelo simples (padrão: com aerofólio)
     price        preço do carro na garagem do campeonato (opcional). Sem ele vale o preço da classe: C $ 0 (já vem de graça), B $ 20.000, A $ 55.000, S $ 120.000.
                  O prêmio por corrida, o dinheiro inicial e os preços padrão ficam em tracks.js > championship (prizes, startCash, prices, repeat, startClass).
     color, trim  cores do modelo simples (hex). Não afetam o .glb.
     maxSpeed     velocidade máxima (m/s; 68 ≈ 245 km/h)
     accel        aceleração inicial (m/s²)
     brake        frenagem (m/s²)
     reverseAccel aceleração em ré (m/s²)
     maxLat       aderência lateral máxima (m/s²). Maior = faz curva mais rápido antes de derrapar
     steerRate    velocidade máxima de giro em baixa velocidade (rad/s)

   SOM DO CARRO (cars.<id>.sound) — tudo é sintetizado por código; deixe '' (vazio) para usar o som padrão.
     synth        motor sintetizado: 'v8' | 'v6' | 'flat6' | 'i4' | 'rotary'  (grave e rouco -> agudo)
     pitch        multiplicador de tom do motor (1 = normal; 1.2 = mais agudo)
     volume       multiplicador de volume dos sons do carro (1 = normal)
     turbo        true = assobio de turbo e "pssh" ao tirar o pé; false = motor aspirado
     pops         true = estouros no escape ao tirar o pé e nas trocas de marcha
     SONS PERSONALIZADOS (opcional). Cada campo abaixo, se preenchido, SUBSTITUI só aquele som padrão.
     Caminho relativo ao index.html (ex.: 'sounds/meu_motor.ogg'); formatos .ogg .mp3 .wav. Se não carregar, volta ao padrão e o menu avisa.
     engine       som de motor em LOOP (sem emendas): a velocidade de reprodução acompanha as rotações
     engineRate   [no ralenti, na rotação máxima] velocidade de reprodução do 'engine' (padrão [0.6, 2.2])
     shift        troca de marcha para cima          downshift   redução de marcha
     backfire     estouro do escape                  blowoff     alívio do turbo
     brake        freada em LOOP (chiado)            skid        derrapagem de pneu em LOOP
     hit          batida (tocado com volume pelo impacto)
   Chuva e vento não são do carro: são do ambiente.

   GRID DE LARGADA (grid) — corrida normal e campeonato começam com o jogador + adversários controlados pela IA.
     cars         total de carros na largada, jogador incluído (12 = 11 adversários). Use 1 para correr sozinho
     reduced      total quando o jogador liga "Grid reduzido" no menu (PCs mais fracos)
     versus       total de carros na largada em 2 jogadores, os dois incluídos (null = igual a cars/reduced; 2 = só os dois, lado a lado; 8 = 6 de IA atrás)
     rowGap       distância entre as fileiras (m)        laneOffset   distância das duas colunas ao eixo da pista (m)
     playerSlot   posição do jogador no grid (0 = pole). null = 4ª de trás para frente; 'random' sorteia
     balance      0 = cada adversário usa os números reais do carro dele; 1 = todos iguais ao carro do jogador (corrida mais justa)
     skill        [mín, máx] ritmo de cada adversário, como fração do limite de cada curva (menor = mais cauteloso)
     rubber       0 a 0.15: quem está muito à frente do jogador alivia e quem está muito atrás acelera um pouco
     trafficScale multiplicador da quantidade de tráfego quando há grid (as pistas ficam menos lotadas)
     names, colors  nomes (fictícios) e cores sorteados para os adversários; cada adversário usa um carro de  cars  (com mais peso para a mesma classe do jogador)

   CLASSE (C, B, A, S) — calculada sozinha a partir de velocidade máxima e aceleração (campo  classes  abaixo).
     class        opcional: força a classe de um carro ('C' | 'B' | 'A' | 'S'), ignorando o cálculo
   A classe aparece na Garagem (letra + índice de 0 a 100) e na contagem da corrida.

   TRÁFEGO (traffic) — veículos que cruzam a pista
     color        cor (hex) ou lista de cores sorteadas, para o modelo simples
     speed        [mínima, máxima] em m/s (20 ≈ 72 km/h, 29 ≈ 104 km/h)
     weight       chance relativa de aparecer (padrão 1; 0 = nunca)
     parts        peças do modelo simples: { size:[largura,altura,comprimento], pos:[x,y,z],
                  color:'body' | hex, basic:true (sem sombreamento, para luzes) }
     wheelR       raio das rodas do modelo simples (padrão 0.34)
   Quais tipos aparecem em cada pista: campo  trafficPool  da pista (null = todos).
   ===================================================================== */
window.TUFG_VEHICLES = {
  // Regra de classe: índice = média ponderada de velocidade e aceleração, cada uma normalizada dentro do seu intervalo (0 a 100).
  // Índice >= limite da classe define a letra; abaixo de B é C.
  grid: {
    cars: 12, reduced: 8, versus: null, rowGap: 9, laneOffset: 2.6, playerSlot: null,
    balance: 0.6, skill: [0.9, 1.0], rubber: 0.05, trafficScale: 0.6,
    names: ['Faísca', 'Trovão', 'Nitro', 'Cobra', 'Raio', 'Tubarão', 'Mestre Marcha', 'Sombra', 'Ferrugem', 'Dona Gasolina', 'Pé de Chumbo', 'Furacão', 'Pisca-Alerta', 'Zé do Turbo'],
    colors: [0xc43b2b, 0x2f6fd6, 0xe9ecef, 0x23262b, 0x2e8b57, 0x7a4aa8, 0xe8761c, 0xe9c32a, 0x1fa3a3, 0xd6528f, 0x9aa3ad, 0x7a4e2d]
  },

  classes: {
    weights: { speed: 0.5, accel: 0.5 },
    ranges: { speed: [50, 85], accel: [8, 16] },   // maxSpeed em m/s, accel em m/s²
    thresholds: { B: 40, A: 56, S: 70 }
  },

  playerCar: 'vento',   // carro de reserva. Na prática o jogador escolhe na Garagem (ou sorteia). Também dá para forçar um com  index.html#id_do_carro

  cars: {
    vento: {
      name: 'Vento GT', model: null, modelRot: 0, length: 4.4, width: 1.9,
      color: 0xd8321f, trim: 0x1b1d22,
      sound: { synth: 'v8', pitch: 1, volume: 1, turbo: false, pops: true, engine: '', engineRate: [0.6, 2.2], shift: '', downshift: '', backfire: '', blowoff: '', brake: '', skid: '', hit: '' },
      maxSpeed: 68, accel: 12, brake: 38, reverseAccel: 7, maxLat: 22, steerRate: 1.9      // classe B: equilibrado
    },
    // Os três abaixo são carros de teste com o modelo simples. Troque por seus .glb preenchendo  model.
    cometa: {
      name: 'Cometa Turbo', model: null, modelRot: 0, length: 4.4, width: 1.9, color: 0xf2b100, trim: 0x1b1d22,
      sound: { synth: 'flat6', pitch: 1.05, volume: 1, turbo: true, pops: true, engine: '', engineRate: [0.6, 2.2], shift: '', downshift: '', backfire: '', blowoff: '', brake: '', skid: '', hit: '' },
      maxSpeed: 72, accel: 15, brake: 36, reverseAccel: 7, maxLat: 20, steerRate: 2.0      // classe S: rápido e explosivo, escorrega mais
    },
    onda: {
      name: 'Onda RS', model: null, modelRot: 0, length: 4.4, width: 1.9, color: 0x2a6fd6, trim: 0xe8e8e8,
      sound: { synth: 'i4', pitch: 1.1, volume: 1, turbo: false, pops: false, engine: '', engineRate: [0.6, 2.2], shift: '', downshift: '', backfire: '', blowoff: '', brake: '', skid: '', hit: '' },
      maxSpeed: 58, accel: 11, brake: 42, reverseAccel: 7, maxLat: 26, steerRate: 2.0      // classe C: muita aderência, lento em reta
    },
    falcao: {
      name: 'Falcão Z', model: null, modelRot: 0, length: 4.4, width: 1.9, color: 0xe9ecef, trim: 0x14161a, wing: false,
      sound: { synth: 'v6', pitch: 0.95, volume: 1, turbo: true, pops: true, engine: '', engineRate: [0.6, 2.2], shift: '', downshift: '', backfire: '', blowoff: '', brake: '', skid: '', hit: '' },
      maxSpeed: 78, accel: 11.5, brake: 34, reverseAccel: 7, maxLat: 21, steerRate: 1.8      // classe A: muito veloz, acelera devagar
    },

   // Classe S
    mature: {
       name: 'Monster Mature', model: 'assets/cars/fun/monster/cars_monster_mature.glb', modelRot: 90, length: 5.0, width: 3.0,
       maxSpeed: 80, accel: 15, brake: 38, reverseAccel: 7, maxLat: 23, steerRate: 1.9,
       sound: { synth: 'v8', pitch: 1, volume: 1, turbo: false, pops: true, engine: '', engineRate: [0.6, 2.2], shift: '', downshift: '', backfire: '', blowoff: '', brake: '', skid: '', hit: '' },
    },

    // Exemplo (descomente e ajuste):
    // meu_carro: {
    //   name: 'Meu Carro', model: 'models/meu_carro.glb', modelRot: 0, length: 4.5, width: 1.9,
    //   maxSpeed: 70, accel: 13, brake: 38, reverseAccel: 7, maxLat: 23, steerRate: 1.9,
    //   sound: { synth: 'v8', engine: 'sounds/meu_motor.ogg' }   // só o que quiser trocar; o resto fica no padrão
    // },
  },

  traffic: {
    sedan: {
      name: 'Sedã', model: null, modelRot: 0, length: 4.3, width: 1.9, weight: 3, speed: [20, 29],
      color: [0x2f6fb5, 0xe8e2d0, 0x3f8a52, 0xc9a227, 0x7a4aa8, 0x444851, 0xd0762c],
      parts: [
        { size: [1.9, .75, 4.3], pos: [0, .6, 0], color: 'body' },
        { size: [1.6, .6, 2.1], pos: [0, 1.25, -.2], color: 0x1b2733 },
        { size: [1.5, .12, .05], pos: [0, .75, -2.16], color: 0xcc2010, basic: true }
      ]
    },
    van: {
      name: 'Van', model: null, modelRot: 0, length: 5.2, width: 2.0, weight: 1, speed: [18, 25],
      color: [0xe8e2d0, 0xb8bcc4, 0x2f6fb5],
      parts: [
        { size: [2.0, 1.9, 5.2], pos: [0, 1.15, 0], color: 'body' },
        { size: [1.8, .7, .1], pos: [0, 1.65, 2.58], color: 0x1b2733 },
        { size: [1.6, .14, .05], pos: [0, .7, -2.62], color: 0xcc2010, basic: true }
      ]
    },
    truck: {
      name: 'Caminhão', model: null, modelRot: 0, length: 8, width: 2.4, weight: 1, speed: [15, 21], wheelR: 0.5,
      color: [0xd0762c, 0xe8e2d0, 0x3f8a52],
      parts: [
        { size: [2.4, 2.7, 5.6], pos: [0, 2.0, -1.2], color: 0xdad6c8 },
        { size: [2.3, 1.7, 2.4], pos: [0, 1.35, 2.8], color: 'body' },
        { size: [2.0, .6, .1], pos: [0, 1.9, 4.0], color: 0x1b2733 },
        { size: [1.8, .16, .05], pos: [0, .8, -4.02], color: 0xcc2010, basic: true }
      ]
    }
  }
};
