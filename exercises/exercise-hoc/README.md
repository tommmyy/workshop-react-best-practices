# High-order component

Pokračujte v příkladu v `Exercise.js`.

# withFallback

Vytvořte HoC `withFallback`.

```js
withFallback({ getControlProp: ({ loading }) => !!loading, fallback: <div>Waiting</div> })
```

HoC přímá property:
- `fallback` - element se zobrazí pokud `getControlProp` vrátí pravdivou hodnotu.
- `getControlProp(props)` - predikát, který na základně props určí, zda se vnitřní komopnenta má nebo nemá zobrazit.
	- Pokud vrátí `true`, komponentu vykreslí.
	- Pokud vrátí `false`, vykreslí `fallback`.

# withSuspense

Vytvořte HoC `withSuspense`.
```js
withSuspense(<div>Suspended</div>),
```

HoC obalí původní komponentu komponentou `<React.Suspense />`
HoC přímá property `fallback`, ktero předá `<Suspense />`.
