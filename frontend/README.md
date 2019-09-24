# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


<!-- <div class="inicio" >
                <h4>INICIO JORNADAS</h4>
                <span v-for="(valor, chave, i) in  encerrante.INICIO_JORNADAS" :key="i+2">
                    {{chave}} : {{valor}}
                </span>
            </div>
            <div class="resumo" >
                <h4>RESUMO JORNADAS</h4>
                <table class="table table-striped table-resumo">
                    <thead>
                        <tr>
                            <th>tipo</th>
                            <th>qtd</th>
                            <th>valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(el, r) in encerrante.RESUMO_JORNADAS.TipoQuantidadeValor" :key="r+12">
                            <td>{{el.tipo}}</td>
                            <td>{{el.qtd}}</td>
                            <td>{{el.valor}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="integracoes-resumo">
                    <span v-for="(valor, chave, r) in encerrante.RESUMO_JORNADAS.integracoes" :key="r" >
                        {{chave}} : {{valor}}
                    </span>
                    <span >
                        ValorTotal: {{encerrante.RESUMO_JORNADAS.valorTotal}}
                    </span>
                </div>

            </div> -->