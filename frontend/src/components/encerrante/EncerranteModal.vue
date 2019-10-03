<template>
    <!-- Modal -->
    <div id="myModalJornadas" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" >
                    <div class="d-flex flex-column">
                        <h4>{{nomeEncerrante.replace('.rtf', '')}}</h4>
                        <h5>Jornada {{jornada.configJornada.jornada}}</h5> 
                    </div>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body" >
                    <div class="configJornada" v-if="config">
                        <h4>Configurações da Jornada</h4>
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between"  v-for="(valor, chave, key1) in jornada.configJornada " :key="key1">
                            <span> {{chave}}:</span>  <span>{{valor}}</span>
                            </li>
                        </ul>
                        <hr>
                    </div>

                    <div class="tipoQtdValor" v-if="tipo">
                        <h4>Tipo-Qtd-Valor</h4>
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Qtd</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(el, key2) in jornada.TipoQuantidadeValor" :key="key2">
                                    <td>{{el.tipo}}</td>
                                    <td>{{el.qtd}}</td>
                                    <td>{{el.valor}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr>
                    </div>

                    <div class="totalQtd" v-if="total">
                        <h4>Total Qtd</h4>
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between"  v-for="(valor, chave, key3) in jornada.totalQtd" :key="key3">
                            <span> {{chave}}:</span>  <span>{{valor}}</span>
                            </li>
                        </ul>
                        <hr>
                    </div>

                    <div class="integracoes" v-if="integracoes">
                        <h4>Integrações</h4>
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between"  v-for="(valor, chave, key4) in jornada.integracoes" :key="key4">
                            <span> {{chave}}:</span>  <span>{{valor}}</span>
                            </li>
                        </ul>
                        <!-- <hr> -->
                    </div>

                </div>

                <div class="modal-footer d-flex justify-content-between" >
                    <!-- paginação -->
                    <div class="myPagination ">
                        <div class="btn-group">
                            <button style="margin: 1px;" class="btn btn-info" :class="{'active' : config}" 
                                @click.prevent="pageJornada('config')">config</button>
                            <button style="margin: 1px;" class="btn btn-info" :class="{'active' : tipo}" 
                                @click.prevent="pageJornada('tqv')">tqv</button>
                            <button style="margin: 1px;" class="btn btn-info" :class="{'active' : total}"  
                                @click.prevent="pageJornada('total')">total</button>
                            <button style="margin: 1px;" class="btn btn-info" :class="{'active' : integracoes}"  
                                @click.prevent="pageJornada('integ')">integ</button>
                        </div>
                    </div>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'EncerranteModal',
    props: {
        jornada: {},
        nomeEncerrante: String,
    },

    data () {
        return {
            config: true,
            tipo: false,
            total: false,
            integracoes: false,  
        }
    },

    methods: {
        pageJornada(page) {
            if (page === 'config') {
                this.config = true
                this.tipo = false
                this.total = false
                this.integracoes = false
            } 
            if (page === 'tqv') {
                this.config = false
                this.tipo = true
                this.total = false
                this.integracoes = false
            } 
            if (page === 'total') {
                this.config = false
                this.tipo = false
                this.total = true
                this.integracoes = false
            } 
            if (page === 'integ') {
                this.config = false
                this.tipo = false
                this.total = false
                this.integracoes = true
            } 
        }
    },

}
</script>

<style>

.modal-body {
    height: 350px;
    overflow-x: hidden;
}

</style>
