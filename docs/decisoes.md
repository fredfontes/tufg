# Decisões por versão (resumo)

Ordem original de desenvolvimento: cenários → horário/clima → som → campeonato → tela dividida.

- **v0.10–0.17**: grid de largada (12→10 carros), 2 jogadores com grid, cash/compra no campeonato, garagem em carrossel, controles e menus por teclado, 4 câmeras.
- **v0.18–0.24**: outdoors em `ads.js`, skybox por pista, glb com freio/rodas/calotas, logo SVG do usuário, `index.html` do usuário como base de head/ícones.
- **v0.25–0.30**: navegação por setas em todos os menus.
- **v0.31–0.39**: som de bots, cheat codes e itens secretos (classe X, pista e clima), retrovisor, olhar para trás, calota `ninja3`, pintura manual por carro com tecla Espaço.
- **v0.40–0.43**: 15 traçados novos (`_b/_c/_d`), bifurcações e atalhos, entram no campeonato.
- **v0.44–0.47**: pódio e tela final, Oásis com amanhecer→dia.
- **v0.48–0.52**: `like`/variants no tráfego, `trafficPool` por categoria/variante, mais tráfego.
- **v0.49–0.51**: barra de erro, doctype, preload/warm contra stuttering; decidido não separar CSS/JS.
- **v0.53–0.55**: tela de carregamento com a chama, carregamento por corrida, otimização de .glb, aleatório na primeira visita.
- **v0.56–0.63**: jukebox, música de abertura, botão Continuar, desbloqueio de áudio (Brave mobile). `retroHeight` 360 (v0.57).
- **v0.64–0.68**: atalhos escondidos no toque, pilotos `.glb`, arrastar para girar o carro, toggle de música na pausa.
- **v0.71**: 1º lugar no campeonato libera todos os carros secretos.
- **v0.72**: PWA offline (service worker), manifest, ícones maskable/apple, wake lock; publicação direto na `main` com branches de backup `0.NN`.
