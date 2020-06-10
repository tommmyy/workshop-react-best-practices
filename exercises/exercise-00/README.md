# `useWebsocket`
Vytvoříme hook, který nám umožní využít websocket k navázání realtime obousměrné komunikace se serverem.

Spuštění demonstračního serveru (z rootu projektu):

```
yarn start:server
```

##

## Reconnection

Použijte `useInterval` k tomu, aby `useWebsocket` pokoušel znovu navázat spojení ve chvíli,
kdy je server nedostupný (`ws.onrerror`).

Možné workflow:

1. Nastala chyba - ws.onerror
- nastartovat reconnect interval

2.

Výpadek spojení nasimulujeme vypnutím demonstračního serveru.

## Reconnection attempts
Upravte hook tak, aby se o rekonekci pokoušel jen `n`-krát.
