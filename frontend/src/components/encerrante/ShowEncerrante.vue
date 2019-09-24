<template>
    <div class="show-side-encerrante">
        <EncerranteModal :jornada="jornada" :nomeEncerrante="encerrante.name"/>
        <!-- Parte de INICIO das JORNADAS -->
        <div class="inicio">
            <strong>INICIO</strong>
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between"  v-for="(valor, chave, key1) in encerrante.INICIO_JORNADAS" :key="key1">
                   <span> {{chave}}:</span>  <span>{{valor}}</span>
                </li>
            </ul>
            <hr>
        </div>

        <!-- Parte das JORNADAS -->
        <div class="jornadas " >
            <strong>JORNADAS</strong>
            <div class="p-jornada d-flex justify-content-start p-2">
                <div v-for="(jornada, i) in encerrante.JORNADAS" :key="i">
                    <button style="margin-left:5px;" class="btn btn-dark" data-toggle="modal" 
                        data-target="#myModalJornadas" @click="insertJornada(jornada)">
                        <span>jor-</span>{{i+1}}
                    </button>
                </div>
            </div>
            <hr>
        </div>

        <!-- Parte de RESUMO das JORNADAS -->
        <div class="resumo mr-1">
            <strong>RESUMO</strong>
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Qtd</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(el, key2) in encerrante.RESUMO_JORNADAS.TipoQuantidadeValor" :key="key2">
                        <td>{{el.tipo}}</td>
                        <td>{{el.qtd}}</td>
                        <td>{{el.valor}}</td>
                    </tr>
                </tbody>
            </table>

            <strong>Resumo Integrações</strong>
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between"  v-for="(valor, chave, key3) in encerrante.RESUMO_JORNADAS.integracoes" :key="key3">
                   <span> {{chave}}:</span>  <span>{{valor}}</span>
                </li>
            </ul>
            <hr>
            <div style="margin: 10px" class="d-flex justify-content-between">
                <span>Valor Total:</span> <span><strong>{{encerrante.RESUMO_JORNADAS.valorTotal}}</strong></span>
            </div>

            <hr>
        </div>
    </div>
</template>

<script>
import EncerranteModal from './EncerranteModal'
export default {
    name: 'ShowEncerrantes',
    components: { EncerranteModal },
    props: {
        encerrante: {},
    },

    data () {
        return {
            jornada: {},
        }
    },

    methods: {
        insertJornada(jornada) {
            this.jornada = jornada
        }
    }
}
</script>

<style scoped>

.show-side-encerrante {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    height: 100%;

    padding: 5px;
    border: 1px solid #0002;
    overflow-x: hidden;
}

.inicio {
    width: 100%;
}
.jornadas {
    width: 100%;
}
.p-jornada {
    overflow-y: hidden;
}

.resumo {
    width: 100%;
}
</style>
