# @joaosto/ui

Kit de UI Vue 3 (botões e inputs) extraído do Design Lab. Visual dark, fonte monoespaçada, ícones Remixicon.

Requer **Vue 3.5+**, **Vite** (para compilar os SFCs) e **Remixicon**.

## Instalação

O repositório é público. Instale direto do GitHub (sem token):

```bash
npm install github:JoaoSto/MzUI
npm install vue remixicon
```

Versão fixa (recomendado):

```bash
npm install github:JoaoSto/MzUI#v0.1.0
```

No `vite.config.js` do app:

```js
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['@joaosto/ui'],
  },
})
```

No `main.js` do app:

```js
import { createApp } from 'vue'
import 'remixicon/fonts/remixicon.css'
import App from './App.vue'

createApp(App).mount('#app')
```

Desenvolvimento local:

```bash
npm install ../MzUI
```

### GitHub Packages (opcional)

O registry `npm.pkg.github.com` exige autenticação mesmo com o repo público. No projeto consumidor, `.npmrc`:

```
@joaosto:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Use um [PAT classic](https://github.com/settings/tokens) com `read:packages` em `NODE_AUTH_TOKEN` ou no `~/.npmrc` (não commite o token).

```bash
npm install @joaosto/ui
```

## Uso

```js
import { Button, Input } from '@joaosto/ui'
```

Ou como plugin (registra `MzButton` e `MzInput`):

```js
import MzUi from '@joaosto/ui'
app.use(MzUi)
```

---

## Button

| Prop | Tipo | Padrão | Valores |
| --- | --- | --- | --- |
| `color` | `string` | `'default'` | `default`, `primary`, `danger`, `success`, `warning` |
| `variant` | `string` | `'button'` | `button`, `outline`, `dotted` |
| `icon` | `string` | — | classe Remixicon, ex. `ri-home-line` |
| `disabled` | `boolean` | `false` | |
| `loading` | `boolean` | `false` | |

O texto do botão vai no slot.

```vue
<template>
  <div class="mz-flex-row mz-gap-10 mz-flex-wrap">
    <Button variant="dotted">DEFAULT</Button>
    <Button color="default" variant="dotted" icon="ri-home-line">Icon</Button>
    <Button color="default" variant="dotted" icon="ri-home-line"></Button>
    <Button color="primary" variant="dotted">PRIMARY</Button>
    <Button color="danger" variant="dotted">DANGER</Button>
    <Button color="success" variant="dotted">SUCCESS</Button>
    <Button color="warning" variant="dotted">WARNING</Button>
    <Button disabled>DISABLED</Button>
    <Button loading>LOADING</Button>
  </div>
</template>

<script setup>
import { Button } from '@joaosto/ui'
</script>
```

---

## Input

| Prop | Tipo | Padrão | Observação |
| --- | --- | --- | --- |
| `type` | `string` | obrigatório | `text`, `password`, `date`, `time`, `datetime`, `select`, `autocomplete`, `email`, `number`, `file`, `money`, `phone` |
| `label` | `string` | `'INPUT'` | |
| `placeholder` | `string` | `''` | |
| `modelValue` / `v-model` | `string \| number \| File \| File[]` | `''` | |
| `options` | `{ value, label }[]` | `[]` | `select` e `autocomplete` |
| `fullWidth` | `boolean` | `false` | |
| `multiple` | `boolean` | `false` | só `file` |
| `currency` | `string` | `''` | só `money`, ex. `R$` |

```vue
<template>
  <div class="mz-flex-row mz-flex-wrap mz-gap-20" style="align-items: flex-end;">
    <Input type="text" label="TEXT" placeholder="xxxxxxx" v-model="terminalInputValue"/>
    <Input type="number" label="NUMBER" placeholder="000000" v-model="numberInputValue"/>
    <Input type="money" label="MONEY" placeholder="00,00" currency="R$" v-model="moneyInputValue"/>

    <Input type="password" label="PASSWORD" placeholder="******" v-model="passwordInputValue"/>
    <Input type="date" label="DATE" placeholder="--/--/----" v-model="dateInputValue"/>
    <Input type="time" label="TIME" placeholder="--:--" v-model="timeInputValue"/>
    <Input type="datetime" label="DATE & TIME" placeholder="--/--/---- --:--" v-model="datetimeInputValue"/>
    <Input type="select" label="SELECT" placeholder="SELECIONE UMA OPÇÃO" :options="selectOptions" v-model="selectValue"/>
    <Input type="autocomplete" label="AUTOCOMPLETE" placeholder="DIGITE PARA BUSCAR" :options="autocompleteOptions" v-model="autocompleteValue"/>
    <Input type="email" label="EMAIL" placeholder="xxxxxx@xxxx.xx" v-model="emailInputValue"/>
    <Input type="phone" label="PHONE" placeholder="(XX) XXXXX-XXXX" v-model="phoneInputValue"/>

    <Input type="file" label="FILE" placeholder="SELECIONE UM ARQUIVO" v-model="fileInputValue" full-width/>
    <Input type="file" label="FILE MULTIPLE" placeholder="SELECIONE UM OU MAIS ARQUIVOS" v-model="fileInputValueMultiple" full-width multiple/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Input } from '@joaosto/ui'

const terminalInputValue = ref('')
const numberInputValue = ref('')
const moneyInputValue = ref('')
const passwordInputValue = ref('')
const dateInputValue = ref('')
const timeInputValue = ref('')
const datetimeInputValue = ref('')
const selectValue = ref('')
const autocompleteValue = ref('')
const emailInputValue = ref('')
const phoneInputValue = ref('')
const fileInputValue = ref(null)
const fileInputValueMultiple = ref(null)

const selectOptions = [
  { value: 'option1', label: 'OPÇÃO 1' },
  { value: 'option2', label: 'OPÇÃO 2' },
  { value: 'option3', label: 'OPÇÃO 3' },
]

const autocompleteOptions = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'bh', label: 'Belo Horizonte' },
  { value: 'poa', label: 'Porto Alegre' },
]
</script>
```

---

## Build

Gera `dist/` (ES + UMD + CSS) para consumidores que não compilam SFC:

```bash
npm run build
```

## Publicação

Cada PR mergeado em `master` publica uma versão nova (tag git + GitHub Packages). O bump é **patch** por omissão; usa as labels `minor` ou `major` no PR para outro nível.

Publicação manual:

```
//npm.pkg.github.com/:_authToken=SEU_TOKEN
```

```bash
npm publish
```

O token local é um PAT classic (`write:packages`, `read:packages`, `repo`). Não republicar a mesma versão.
