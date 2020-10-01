# Theme-ui

## 1. Základy
Pohrajte si s [theme-ui](https://theme-ui.com/home):

### `sx`
- Vyrenderujte Box a nastavte mu nějaké styly pomocí `sx` atributu.

### Flex
- Obalte několik Boxů pomocí Flex. Pohrajte si atributem `alignItems` a `justifyContent`.
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/

### Presets
Vyzkoušejte různé presety z `@theme-ui/presets`.

## 2. Tvorba Grid-frameworku

Vytvořme mini-framework po vzoru [Bootstrap](https://getbootstrap.com/docs/4.5/layout/grid/), který definuje CSS grid framework pomocí sloupcové jednotky.

Framework se bude skládat z následující trojice komponent:

### `<Container />`
- Nastaví šířku - width: 100%

### `<Row />` - řádek
- Nastaví **negativní** horizontální margin na základě `gutters`
- E.g: - Styly: `margin-left/right: -gutters`
- Props:
	- `gutters` - horizontální margin
	- Typ:  nezapomeňte nastavit `flexWrap: 'wrap'`

### `<Col />`
- Wrapper pro obsah v sloupci o velikosti `span`.
- Props:
	- `span` - nastaví jak široký je prvek: 2 = dva sloupce
	- `maxColumns` - kolik sloupců představuje 100% šířku kontejneru
	- `gutters` - horizontální padding v sloupci


### Příklad použití:

```js
<Container maxColumns={12}>
	<Row>
		<Col span={6}>50% šířdy kontejneru</Col>
		<Col span={6}>6</Col>
	</Row>
	<Row>
		<Col span={2}>2 / 12 šířky kontejneru</Col>
		<Col span={10}>10</Col>
	</Row>
</Container>
```

### Typy:
- `maxColumns` a `gutters` defaultujte na rozumné hodnoty.
- Zamyslete se, kdy použít `<Flex>` nebo `<Box>`


# 2.1 Responzivní `Col.span`

Jako rozšíření vašeho řešení by atribut `Col.span` měl být responzivní, stejně jako [ostantní props z theme-ui](https://theme-ui.com/getting-started#responsive-styles).

```js
<Container>
	<Row>
		<Col span={[12, 6, 6]}>column with fullwidth for small resolutions</Col>
		<Col span={[12, 6, 6]}>column</Col>
	</Row>
</Container>
```
Připravil jsem pro vás funkci `mapResponsiveProperty`, která funguje následně:

```js
import { mapResponsiveProperty} from '@workshop/utils'

mapResponsiveProperty(x => x + 1, 1) // 2
mapResponsiveProperty(x => x + 1, [1, 2]) // [2, 3]
mapResponsiveProperty(x => x + 1, { _: 1, xs: 3 }) // [2, 4]
```

# 2.2 Témovalnost gridu

Upravte komponenty tak, aby `gutters` a `maxColumns` byly definovatelné skrze variant v témě:

```js
const myTheme = {
	// ...
	grid: {
		gutters: 2,
		maxColumns: 12,
	}
}
```

Hodnoty je možné v komponentě číst pomocí [`useThemeUI`](https://theme-ui.com/use-theme-ui).

# 3. Výběr témy (bonus)

1. Umožněte uživateli vybrat tému z [@theme-ui/presets](https://theme-ui.com/packages/presets).
2. Umožněte uživateli přepnout [colorMode](https://theme-ui.com/color-modes)

