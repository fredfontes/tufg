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
     champBalance igual a balance, mas no campeonato (menor = o carro de cada rival pesa mais; rivais compram carros melhores com o prêmio)
     bossSkill    habilidade extra dos rivais nas pistas com  boss: true  (oásis)
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
     glb          (opcional, só carros jogáveis com model .glb) peças desenhadas pelo jogo POR CIMA do .glb, já que as rodas do .glb não giram nem esterçam:
                    glb: { wheels: true, caps: true, brake: true }     (tudo ligado por padrão; use false para desligar só uma parte)
                      wheels   rodas simples (pneu) sobre o .glb; as dianteiras esterçam e todas giram
                      caps     calotas de raios que ficam um pouco para fora da lateral do modelo e giram (desligue com  caps: false  se não gostar)
                      brake    brilho vermelho nas lanternas traseiras que acende ao frear (o farol não muda). Pode ser objeto: brake: { x, y, z, w, h }
                               (x = distância de cada lanterna ao centro, y = altura, z = posição na traseira, w/h = tamanho do brilho, em metros)
                    Ajustes finos de posição, em metros a partir do centro do carro (todos opcionais):
                      wheelIn  quanto os pneus ficam para DENTRO da lateral do modelo (padrão = largura do pneu, wheelW). Use 0 para o pneu encostar por fora, ou aumente para esconder mais o pneu.
                               As calotas acompanham o pneu: ficam capOut metros para fora da face do pneu, então recuam junto com ele.
                      limitX  meia largura onde a lateral do modelo termina (padrão width/2)   wheelFront / wheelRear  posição das rodas na frente e atrás
                      wheelR  raio da roda (0.34)   wheelW  largura do pneu (0.26)   wheelY  altura do centro da roda (= wheelR)
                      capOut  quanto a calota sai da face do pneu (0.03)   capSize  tamanho da calota em relação à roda (0.72)
                      Tamanhos por eixo (frente / traseira; sem eles valem wheelR, wheelW e capSize):
                        wheelRF / wheelRR  raio da roda dianteira / traseira      wheelWF / wheelWR  largura do pneu dianteiro / traseiro
                        capSizeF / capSizeR  tamanho da calota dianteira / traseira
                      Aparência da calota (só quando  caps  está ligado):
                        capColor  cor de fundo da calota em hexadecimal, ex.: '#c9ccd2' (padrão cinza prata)
                        rimColor  cor do aro / desenho em hexadecimal, ex.: '#14161a' (padrão grafite)
                        capShape  formato do desenho do aro. 8 tipos:  'star5' (estrela de 5 raios, padrão)  'spoke10' (raios finos, 10)
                                  'turbine' (pás curvas)  'mesh' (grade em cruz)  'disc' (disco liso com furo)  'dish' (prato com aro grosso)
                                  'twin5' (5 raios duplos)  'hex6' (6 parafusos / hexagonal)
                    Exemplo: glb: { capShape: 'turbine', capColor: '#e8e8ea', rimColor: '#c1121f', wheelRF: 0.40, wheelRR: 0.46, wheelWF: 0.24, wheelWR: 0.30 }

   CÓDIGOS SECRETOS (cheat codes)
     class: 'X'   carro SECRETO. Não aparece na garagem, no sorteio, nos rivais nem no tráfego até ser liberado.
     code         palavra que o jogador digita nos menus para liberar o carro (só letras, sem espaço), ex.: code: 'fantasma'.
                  Também libera pelo endereço:  index.html#fantasma  (o id do carro). Depois de liberado, fica salvo no navegador.
     O mesmo campo  code  funciona em pistas secretas (tracks.js, pista fora de  order ). Tempo secreto: digite  neve  (ou use  #neve ) para ligar/desligar a neve.
   Quais tipos aparecem em cada pista: campo  trafficPool  da pista (null = todos).
   ===================================================================== */
window.TUFG_VEHICLES = {
  // Regra de classe: índice = média ponderada de velocidade e aceleração, cada uma normalizada dentro do seu intervalo (0 a 100).
  // Índice >= limite da classe define a letra; abaixo de B é C.
  grid: {
    cars: 12, reduced: 8, versus: null, rowGap: 9, laneOffset: 2.6, playerSlot: null,
    balance: 0.6, champBalance: 0.3, bossSkill: 0.05, skill: [0.9, 1.0], rubber: 0.05, trafficScale: 0.6,
    names: ['Faísca', 'Trovão', 'Nitro', 'Cobra', 'Raio', 'Tubarão', 'Mestre Marcha', 'Sombra', 'Ferrugem', 'Dona Gasolina', 'Pé de Chumbo', 'Furacão', 'Pisca-Alerta', 'Zé do Turbo'],
    colors: [0xc43b2b, 0x2f6fd6, 0xe9ecef, 0x23262b, 0x2e8b57, 0x7a4aa8, 0xe8761c, 0xe9c32a, 0x1fa3a3, 0xd6528f, 0x9aa3ad, 0x7a4e2d]
  },

  classes: {
    weights: { speed: 0.5, accel: 0.5 },
    ranges: {                                      // [mínimo, máximo] de cada atributo. speed e accel definem a classe; os demais servem de referência (barras da garagem e guia para criar carros)
      speed: [50, 85],                             // maxSpeed em m/s  (50 ≈ 180 km/h, 85 ≈ 306 km/h)
      accel: [8, 16],                              // accel em m/s²   (8 = lento, 16 = explosivo)
      maxLat: [16, 30],                            // aderência lateral em m/s²  (16 = escorrega, 30 = gruda; acima de ~32 deixa de ser divertido)
      brake: [28, 48],                             // frenagem em m/s²  (28 = longa, 48 = muito curta; ~38 é um esportivo comum)
      steerRate: [1.5, 2.4],                       // giro em baixa velocidade, rad/s  (1.5 = pesado, 2.4 = nervoso; acima disso o carro fica instável)
      reverseAccel: [5, 10]                        // aceleração em ré, m/s²  (quase não influencia; 7 é bom)
    },
    thresholds: { B: 40, A: 56, S: 70 }
  },

  playerCar: 'vento',   // carro de reserva. Na prática o jogador escolhe na Garagem (ou sorteia). Também dá para forçar um com  index.html#id_do_carro

  cars: {
    // Classe S
    mature: {
      name: 'Monster Mature', model: 'assets/cars/fun/monster/cars_monster_mature.glb', modelRot: 90, length: 4.4, width: 2.2,
      // Exemplo de ajuste das peças sobre o .glb (tudo opcional; sem o campo glb valem os padrões). Valores em metros a partir do centro do carro:
      // glb: { wheels: true, caps: true, brake: { x: 0.8, y: 0.8, z: -2.25, w: 0.95, h: 0.42 }, limitX: 1.3, wheelIn: 0.26, wheelFront: 1.4, wheelRear: -1.3, wheelR: 0.36, wheelW: 0.26, capOut: 0.03, capSize: 0.72 },
      glb: { 
        wheels: true, caps: true, brake: { x: 0.7, y: 0.8, z: -2.15, w: 0.42, h: 0.42 }, limitX: 1.3, wheelIn: 0.3, wheelFront: 1.2, wheelRear: -1.2, wheelR: 0.42, wheelW: 0.26, 
        capOut: 0.015, capSize: 0.68, capShape: 'spoke10', capColor: 0x000000, rimColor: 0xABACB2
      },
      sound: { synth: 'i4', pitch: 1, volume: 1, turbo: false, pops: true },
      maxSpeed: 85, accel: 16, brake: 42, reverseAccel: 5, maxLat: 18, steerRate: 2.5,
      class: 'S'
    },
    cat: {
      name: 'Gemini Cat', model: 'assets/cars/fun/gemini/cars_gemini_cat.glb', modelRot: 90, length: 4.1, width: 2.2,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.55, y: 0.85, z: -2.15, w: 0.95, h: 0.5 }, limitX: 1.3, wheelIn: 0.36, wheelFront: 1.16, wheelRear: -1.175, wheelR: 0.415, wheelW: 0.26, wheelRR: 0.445,
        capOut: 0.001, capSize: 0.7, capShape: 'mesh', capColor: 0x000000, rimColor: 0x846D41,
      },
      sound: { synth: 'v6', pitch: 0.85, volume: 1, turbo: true, pops: true },
      maxSpeed: 83, accel: 15, brake: 48, reverseAccel: 7, maxLat: 20, steerRate: 2.4,
      class: 'S'
    },
    web: {
      name: 'Pixel Web', model: 'assets/cars/fun/pixel/cars_pixel_web.glb', modelRot: 90, length: 4.1, width: 2.2,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.75, y: 0.7, z: -2.15, w: 1.5, h: 0.5 }, limitX: 1.3, wheelIn: 0.39, wheelFront: 1.11, wheelRear: -1.35, wheelR: 0.34, wheelW: 0.21, wheelRR: 0.35,
        capOut: 0.001, capSize: 0.7, capShape: 'turbine', capColor: 0xAFB5BD, rimColor: 0x000000,
      },
      sound: { synth: 'v8', pitch: 0.8, volume: 1.2, turbo: false, pops: true },
      maxSpeed: 83, accel: 15, brake: 48, reverseAccel: 7, maxLat: 20, steerRate: 2.4,
      class: 'S'
    },
    
    // Class A
    future: {
      name: 'Crossing Future', model: 'assets/cars/fun/crossing/cars_crossing_future.glb', modelRot: 90, length: 4.4, width: 2.2,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.8, y: 0.85, z: -2.15, w: 0.75, h: 0.42 }, limitX: 1.3, wheelIn: 0.3, wheelFront: 1.32, wheelRear: -1.48, wheelR: 0.4, wheelW: 0.26, wheelRR: 0.42,
        capOut: 0.001, capSize: 0.75, capShape: 'hex6', capColor: 0x000000, rimColor: 0x747774
      },
      sound: { synth: 'flat6', pitch: 0.95, volume: 1, turbo: true, pops: true },
      maxSpeed: 60, accel: 14, brake: 22, reverseAccel: 6, maxLat: 22, steerRate: 1.8,
       class: 'A'
    },
    daemon: {
      name: 'Rapid Daemon', model: 'assets/cars/fun/rapid/cars_rapid_daemon.glb', modelRot: 90, length: 4.5, width: 2.2,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.7, y: 0.85, z: -2.22, w: 0.95, h: 0.42 }, limitX: 1.3, wheelIn: 0.3, wheelFront: 1.235, wheelRear: -1.36, wheelR: 0.38, wheelW: 0.26, 
        capOut: 0.001, capSize: 0.46, capShape: 'star5', capColor: 0xD5B272, rimColor: 0x000000
      },
      sound: { synth: 'v8', pitch: 0.95, volume: 1.5, turbo: true, pops: true },
      maxSpeed: 70, accel: 12, brake: 28, reverseAccel: 3, maxLat: 20, steerRate: 2.4,
      class: 'A'
    },
    aviator: {
      name: 'Warmblood Aviator', model: 'assets/cars/fun/warmblood/cars_warmblood_aviator.glb', modelRot: 90, length: 4.5, width: 2.2,
      color: 0x8B080B, trim: 0x000000,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.54, y: 0.865, z: -2.2, w: 0.42, h: 0.42 }, limitX: 1.3, wheelIn: 0.268, wheelFront: 1.18, wheelRear: -1.315, wheelR: 0.4, wheelW: 0.26, 
        capOut: 0.001, capSize: 0.7, capColor: 0x000000, rimColor: 0xFFFFFF
      },
      sound: { synth: 'rotary', pitch: 0.55, volume: 1.5, turbo: false, pops: true },
      maxSpeed: 68, accel: 12, brake: 28, reverseAccel: 3, maxLat: 22, steerRate: 2.0,
      class: 'A'
    },
    snake: {
      name: 'Vanish Snake', model: 'assets/cars/fun/vanish/cars_vanish_snake.glb', modelRot: 90, length: 4.4, width: 2.2,
      color: 0xE2DBC4, trim: 0x010B4A,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.65, y: 0.85, z: -2.15, w: 0.95, h: 0.42 }, limitX: 1.3, wheelIn: 0.3, wheelFront: 1.288, wheelRear: -1.16, wheelR: 0.38, wheelW: 0.25, wheelRR: 0.415,
        capOut: 0.001, capSize: 0.6, capShape: 'twin5', capColor: 0x000000, rimColor: 0xF2EBD1,
      },
      sound: { synth: 'v8', pitch: 0.5, volume: 1.2, turbo: false, pops: true },
      maxSpeed: 64, accel: 14, brake: 23, reverseAccel: 2, maxLat: 22, steerRate: 2.8,
      class: 'A'
    },
    
    // Class B
    retro: {
      name: 'Crossing Retro', model: 'assets/cars/fun/crossing/cars_crossing_retro.glb', modelRot: 90, length: 4.4, width: 2.2,
      color: 0x1C7CE2, trim: 0xFFFFFF,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.6, y: 0.69, z: -2.15, w: 0.42, h: 0.42 }, limitX: 1.3, wheelIn: 0.33, wheelFront: 1.3, wheelRear: -1.315, wheelR: 0.38, wheelW: 0.3, wheelRR: 0.4,
        capOut: 0.001, capSize: 0.62, capShape: 'hex6', capColor: 0x000000, rimColor: 0x764729
      },
      sound: { synth: 'flat6', pitch: 0.95, volume: 1, turbo: false, pops: true },
      maxSpeed: 54, accel: 12, brake: 32, reverseAccel: 8, maxLat: 26, steerRate: 1.8,
      class: 'B'
    },
    holy: {
      name: 'Rapid Holy', model: 'assets/cars/fun/rapid/cars_rapid_holy.glb', modelRot: 90, length: 4.4, width: 2.2,
      color: 0x8DFF09, trim: 0x000000,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.7, y: 0.85, z: -2.15, w: 0.95, h: 0.42 }, limitX: 1.3, wheelIn: 0.33, wheelFront: 1.24, wheelRear: -1.28, wheelR: 0.41, wheelW: 0.25, wheelRR: 0.396,
        capOut: 0.001, capSize: 0.5, capShape: 'dish', capColor: 0x000000, rimColor: 0x853D23
      },
      sound: { synth: 'v8', pitch: 1.1, volume: 1.2, turbo: true, pops: true },
      maxSpeed: 62, accel: 10, brake: 30, reverseAccel: 2, maxLat: 24, steerRate: 2.0,
      class: 'B'
    },
    sprint: {
      name: 'Workforce Sprint', model: 'assets/cars/fun/workforce/cars_workforce_sprint.glb', modelRot: 90, length: 4.4, width: 2.2,
      color: 0xE2DBC4, trim: 0x010B4A,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.4, y: 0.67, z: -2.1, w: 1.5, h: 0.42 }, limitX: 1.3, wheelIn: 0.4, wheelFront: 1.23, wheelRear: -1.135, wheelR: 0.38, wheelW: 0.25, wheelRR: 0.4, 
        capOut: 0.001, capSize: 0.6, capShape: 'star5', capColor: 0x000000, rimColor: 0xC47D4F
      },
      sound: { synth: 'v6', pitch: 0.5, volume: 1.2, turbo: true, pops: true },
      maxSpeed: 58, accel: 10, brake: 35, reverseAccel: 2, maxLat: 26, steerRate: 1.8,
      class: 'B'
    },
    prodigy: {
      name: 'Vanish Snake Prodigy', model: 'assets/cars/fun/vanish/cars_vanish_snake_prodigy.glb', modelRot: 90, length: 4.4, width: 2.2,
      color: 0x8B080B, trim: 0x000000,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.68, y: 0.78, z: -2.08, w: 0.7, h: 0.42 }, limitX: 1.3, wheelIn: 0.31, wheelFront: 1.35, wheelRear: -1.16, wheelR: 0.38, wheelW: 0.25, 
        capOut: 0.001, capSize: 0.6, capShape: 'turbine', capColor: 0x000000
      },
      sound: { synth: 'v6', pitch: 0.5, volume: 1.2, turbo: false, pops: true },
      maxSpeed: 60, accel: 11, brake: 38, reverseAccel: 2, maxLat: 20, steerRate: 3.0,
      class: 'B'
    },
    
    // Class C
     blonde: {
        name: 'BMC Blonde', model: 'assets/cars/fun/bmc/cars_bmc_blonde.glb', modelRot: 90, length: 4.1, width: 2.2,
        color: 0x717070, trim: 0x000000,
        glb: { 
          wheels: true, caps: true, brake: { x: 0.65, y: 0.87, z: -2.15, w: 0.65, h: 0.42 }, limitX: 1.3, wheelIn: 0.3015, wheelFront: 1.17, wheelRear: -1.08, wheelR: 0.37, wheelW: 0.26, 
          capOut: 0.001, capSize: 0.65, capShape: 'spoke10', capColor: 0x000000, rimColor: 0xAFB3B2
        },
        sound: { synth: 'rotary', pitch: 0.95, volume: 1, turbo: false, pops: true },
        maxSpeed: 40, accel: 10, brake: 42, reverseAccel: 10, maxLat: 30, steerRate: 1.5,
        class: 'C'
     },
     lunar: {
        name: 'Diamond Lunar', model: 'assets/cars/fun/diamond/cars_diamond_lunar.glb', modelRot: 90, length: 4.4, width: 2.2,
        color: 0x5A8C1C, trim: 0xFFFFFF,
        glb: { 
          wheels: true, caps: true, brake: { x: 0.5, y: 0.98, z: -2.2, w: 0.95, h: 0.42 }, limitX: 1.3, wheelIn: 0.4012, wheelFront: 1.25, wheelRear: -1.25, wheelR: 0.35, wheelW: 0.26, 
          capOut: 0.001, capSize: 0.82, capColor: 0x000000
        },
        sound: { synth: 'i4', pitch: 1, volume: 1.2, turbo: false, pops: true },
        maxSpeed: 48, accel: 8, brake: 48, reverseAccel: 8, maxLat: 32, steerRate: 1.8,
        class: 'C'
     },
     redhead: {
      name: 'Warmblood Redhead', model: 'assets/cars/fun/warmblood/cars_warmblood_redhead.glb', modelRot: 90, length: 4.5, width: 2.2,
      color: 0xE10A0A, trim: 0x000000,
      glb: { 
        wheels: true, caps: true, brake: { x: 0.7, y: 0.75, z: -2.16, w: 1, h: 0.6 }, limitX: 1.3, wheelIn: 0.3, wheelFront: 1.215, wheelRear: -1.32, wheelR: 0.36, wheelW: 0.26, wheelRR: 0.379,
        capOut: 0.001, capSize: 0.82, capColor: 0x000000, rimColor: 0x674022
      },
      sound: { synth: 'rotary', pitch: 0.7, volume: 1.2, turbo: false, pops: true },
      maxSpeed: 54, accel: 10, brake: 48, reverseAccel: 8, maxLat: 22, steerRate: 2.2,
      class: 'C'
   },

/*
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
    }
*/

    // Classe X: carro secreto (libere digitando o code nos menus ou abrindo index.html#fantasma)
    fantasma: {
      name: 'Fantasma X', model: null, modelRot: 0, length: 4.5, width: 1.95, color: 0xb04dff, trim: 0x14161a, wing: true,
      code: 'fantasma',
      maxSpeed: 88, accel: 17, brake: 46, reverseAccel: 8, maxLat: 28, steerRate: 2.2,
      sound: { synth: 'v8' },
      class: 'X'
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
