# Roadmap e pendências

## Pendentes
- Botão "Baixar tudo para jogar offline" (~350 MB) usando a mensagem `precache` do service worker (oferecido, não confirmado).
- Definir carros secretos para 2º e 3º lugar no campeonato (`Config.champ.unlocks`).
- Versão completa do amanhecer→dia do Oásis (janelas etc.); hoje é a versão simples.
- Atualizar o artifact de teste para a versão mais recente.
- Verificar em dispositivo real: instalação/offline do PWA, música de abertura no Brave mobile, piloto .glb real, mp3 reais.
- Usuário apagar as branches `v0.71` e `pwa-offline` no GitHub.

- Relevo: litoral (mar) e Oásis (canopy) seguem planos; depois saltos nos cumes e pista inclinada.

- Campeonato de 2 jogadores (v0.89): validar em dispositivo real; ver se a dupla precisa de regras de avanço diferentes.

## Ideias
Mais cenários/horários finos, mais pilotos .glb, mais tráfego variado, ranking local, modo espelho.
- Peso dos `.glb`: 512 px e 1024 px foram testados e ficaram ruins; voltaram os originais de 2048 px. Alternativas: compressão (Draco/Meshopt, WebP/KTX2) ou reduzir só os carros menos vistos.
- Avaliar o relevo "toboga" da Serra Verde (v0.78) e decidir a intensidade final.
- Área de chegada: validar fase 1 (v0.80); próximas fases: mais detalhes, troféu, carros/bots interagindo, colisão com o palco.
