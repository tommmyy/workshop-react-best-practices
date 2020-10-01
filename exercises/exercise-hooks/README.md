# `useInterval`
Zkus implementovat `useInterval`.

# `useWebsocket`

Vytvoříme hook, který nám umožní využít websocket k navázání realtime obousměrné komunikace se serverem.

Nesnažíme se vytvořit neprůstřelnou knihovnu,
ale procvičit si co nejvíce práci s `useRef` mimo kontext klasického případu užití týkající se referencí na DOM element.


Spuštění demonstračního serveru (z rootu projektu):

```
yarn start:server
```
Adresy ws endpoitů:

```
${process.env.GATSBY_API_URL_WS}/v1
${process.env.GATSBY_API_URL_WS}/v2
```

## 1. Základní návrh

API našeho hooku by se měl co nejvíce podobat samotnému API [WebSocketu](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

1. Možnost zachytávat události jako je `onmessage`
2. Možnost zasílat zprávy serveru skrze `send`
3. Konfigurace URL endpointu.

## 2. Parsování
Náš server vrací payload v JSON. Hook by měl automaticky parsovat příchozí data do JSON.

## 3. Změna URL
Při změně URL musí dojít k odpojení od současného ws endpointu. Následně se hook připojí k novému.

## 4. Řízení životního cyklu
Zamyslete se, jaká strana má zodpovědnost za první (a následující) připojení - komponenta nebo hook?
Stejná otázka platí o ukončení spojení.

Naimplementujte vaši strategii.

## 5. Reconnection

Použijte `useInterval` k tomu, aby `useWebsocket` pokoušel znovu navázat spojení ve chvíli,
kdy je server nedostupný (`ws.onrerror`).

Možné workflow:

1. Nastala chyba - ws.onerror
- nastartovat reconnect interval

2. Při `onopen` je možné interval zastavit.


Výpadek spojení nasimulujeme vypnutím demonstračního serveru.

## 6. Omezený počet pro reconnection

Upravte hook tak, aby se o rekonekci pokoušel jen `n`-krát.

## 7. `useCommitedRef`
Refaktorujte pomocí __commited reference__ patternu.

