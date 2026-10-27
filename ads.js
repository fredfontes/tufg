/* =====================================================================
   THE URGE FOR GAS — OUTDOORS (PLACAS DE PROPAGANDA)
   Edite este arquivo para criar e alterar os outdoors. É carregado antes de tracks.js (index.html).
   As pistas e os cenários (tracks.js) só REFERENCIAM os outdoors pelo id, assim:
       billboards: ['surf', 'sorvete', 'farol']      (no cenário: vale para todas as pistas dele)
       ads:        ['neon', 'metro']                 (na pista: substitui a lista do cenário)

   OUTDOOR (ads.<id>) — dois jeitos de montar:
     1. Texto
          title      texto grande (obrigatório)
          subtitle   texto menor, abaixo do grande (opcional)
          bg         cor de fundo, ex.: '#1b9ac4'
          border     cor da borda (padrão '#f4f1e8'); 'none' = sem borda
          color      cor do texto grande (padrão '#f4f1e8')
          subColor   cor do texto pequeno (padrão = color)
     2. Imagem (substitui o outdoor inteiro)
          image      caminho local (ex.: 'img/meu_outdoor.png') ou endereço absoluto (https://...), em SVG ou PNG.
                     Proporção ideal 11 : 4,1 (ex.: 1100 × 410 px). SVG precisa de width/height ou viewBox.
                     Endereço de outro site só funciona se o servidor permitir (CORS); arquivos da própria pasta sempre funcionam.
                     Enquanto a imagem carrega, ou se falhar, o outdoor aparece com os campos de texto acima (title, bg...).
   O mesmo outdoor pode ser usado em várias pistas. Um id que não existir aqui aparece como placa de texto com o próprio id.
   ===================================================================== */
window.TUFG_ADS = {
  ads: {
    /* ---- litoral ---- */
    surf:      { title: 'SURF & CIA',      subtitle: 'pranchas e aluguel',   bg: '#1b9ac4' },
    sorvete:   { title: 'SORVETE POLAR',   subtitle: 'gelado de verdade',    bg: '#e86a8a' },
    farol:     { title: 'PRAIA DO FAROL',  subtitle: 'a 3 km',               bg: '#f2a900' },
    brisa:     { title: 'BRISA FM 101',    subtitle: 'só sucesso',           bg: '#2a2e36' },
    octana:    { title: 'OCTANA',          subtitle: 'gasolina de corrida',  bg: '#e8a400' },
    peixe:     { title: 'PEIXE FRESCO',    subtitle: 'direto do barco',      bg: '#2f7d4a' },
    /* ---- centro urbano ---- */
    neon:      { title: 'NEON CAFÉ',       subtitle: 'aberto a noite toda',  bg: '#d8326f' },
    banco:     { title: 'BANCO CENTRAL',   subtitle: 'seu dinheiro em dia',  bg: '#1f6fb5' },
    turbolube: { title: 'TURBOLUBE 20W',   subtitle: 'óleo para vencer',     bg: '#e8a400' },
    redline:   { title: 'REDLINE FM 98.1', subtitle: 'rock e rodovia',       bg: '#2a2e36' },
    pizza:     { title: 'PIZZA 24H',       subtitle: 'entrega rápida',       bg: '#c9352a' },
    metro:     { title: 'METRÔ',           subtitle: 'linha 3 · próxima estação', bg: '#2f7d4a' },
    /* ---- campo ---- */
    milho:     { title: 'MILHO DOURADO',   subtitle: 'colheita da safra',    bg: '#e8a400' },
    laticinios:{ title: 'LATICÍNIOS SOL',  subtitle: 'leite fresquinho',     bg: '#1f6fb5' },
    feira:     { title: 'FEIRA DO PRODUTOR', subtitle: 'todo sábado',        bg: '#2f7d4a' },
    coop:      { title: 'COOP AGRO',       subtitle: 'unidos no campo',      bg: '#c9352a' },
    turbolube2:{ title: 'TURBOLUBE 20W',   subtitle: 'para trator e turbo',  bg: '#7a4aa8' },
    /* ---- serra ---- */
    mirante:   { title: 'MIRANTE 2 KM',    subtitle: 'vista panorâmica',     bg: '#2f7d4a' },
    pedagio:   { title: 'PEDÁGIO SERRA',   subtitle: 'tenha o troco em mãos', bg: '#2a2e36' },
    cafeserra: { title: 'CAFÉ DA SERRA',   subtitle: 'torrado na montanha',  bg: '#7a4aa8' },
    curvas:    { title: 'ATENÇÃO CURVAS',  subtitle: 'reduza a velocidade',  bg: '#e8a400', color: '#14100a', border: '#14100a' },
    /* ---- cânion ---- */
    valvula:   { title: 'VÁLVULA',         subtitle: 'peças e preparação',   bg: '#d83a2a' },
    asfaltocafe:{ title: 'ASFALTO CAFÉ',   subtitle: 'parada obrigatória',   bg: '#2f7d4a' },
    /* ---- oásis (final) ---- */
    oasis:     { title: 'BEM-VINDO AO OÁSIS', subtitle: 'fim da estrada',    bg: '#2f7d4a' },
    ultima:    { title: 'ÚLTIMA CURVA',    subtitle: 'segure firme',         bg: '#e8a400', color: '#14100a', border: '#14100a' }

    /* ---- exemplo com imagem (descomente; o arquivo de exemplo vem na pasta img/) ----
    exemplo:   { image: 'img/exemplo_outdoor.svg', title: 'EXEMPLO', subtitle: 'imagem SVG', bg: '#33415c' }
    */
  }
};
