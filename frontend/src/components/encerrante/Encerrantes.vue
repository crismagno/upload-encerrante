<template>
    <div id="encerrantes">
        <PageTitle title="Encerrantes" sub="Encerrantes Cobrador" icon="fa fa-file"/>

        <div class="search row">
            <div class="input-search col-sm-8">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="searchEncerrante" 
                        @keyup="getEncerrantes" @keyup.esc="clearSearchEncerrante()"
                        placeholder="Nome encerrante...">
                </div>
            </div>
            <div class="acoes col-sm-4 ">
                <button class="btn btn-primary" @click="getEncerrantes">
                    <i class="fa fa-search"></i>
                </button>
                <button style="margin-left: 5px" class="btn btn-secondary" @click="clearSearchEncerrante()">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
        
        <div class="row">
            <div class="div-encerrantes " :class="{'col-md-8' : show_encerrante, 'col-md-12' : !show_encerrante}" >
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Qtd_Jornadas</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(encerrante, e) in encerrantes" :key="e" :class="{'markedDone alert-danger' : encerrante.done}">
                            <td >{{encerrante.name.split('.')[0]}}</td>
                            <td >{{encerrante.INICIO_JORNADAS.JORNADAS }}</td>
                            <td >{{encerrante.INICIO_JORNADAS.HORARIO}} - {{encerrante.INICIO_JORNADAS.DATA}} </td>
                            <td >
                                <button style="margin: 3px" class="btn btn-info " v-if="!encerrante.done"
                                    @click="showEncerrante(encerrante)" >
                                    <i class="fa fa-eye"></i>
                                </button>
                                <button style="margin: 3px" class="btn btn-success " 
                                    :class="{'btn-warning' : encerrante.done}" @click="markAsDone(encerrante)" >
                                    <i class="fa fa-check " :class="{'fa fa-undo' : encerrante.done}"></i>
                                </button>
                                <button style="margin: 3px" class="btn btn-danger " @click="DeleteEncerrante(encerrante)">
                                    <i class="fa fa-trash-o "></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <div class="col-md-1"></div> -->
            <div class="show-encerrante col-md-4 d-flex flex-column justify-content-start" v-if="show_encerrante">
                <div class="div_clear_show d-flex justify-content-between align-items-center ">
                    <h5>{{encerrante_side.name.replace('.rtf', '')}}</h5>
                    <button  class="btn btn-secondary float-right btn-sm" @click="show_encerrante = false">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <ShowEncerrante :encerrante="encerrante_side" />
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import { URL_ROOT, userKey } from '@/config/global'

import PageTitle from "../template/Pagetitle";
import ShowEncerrante from "./ShowEncerrante";
export default {
    name: 'Encerrentes',
    components: { PageTitle, ShowEncerrante },
    data () {
        return {
            encerrantes: [],
            show_encerrante: false,
            encerrante_side: {},
            searchEncerrante: '',
        }
    },

    methods: {
        
        getEncerrantes() {
            const search = this.searchEncerrante ? `name=${this.searchEncerrante}` : ''
            axios.get(`${URL_ROOT}/upload?${search}`)
                .then(res => {
                    this.encerrantes = res.data
                })
                .catch(e => this.$toasted.global.defaultError({msg: e.response.data}))
        },

        showEncerrante(encerrante) {
            this.show_encerrante = true
            this.encerrante_side = encerrante
        },

        clearSearchEncerrante() {
            this.searchEncerrante = ''
            this.getEncerrantes()
        },

        markAsDone(encerrante) {
            let done = encerrante.done ? false : true
            axios.put(`${URL_ROOT}/upload/done/${encerrante._id}`, {done})
                .then(res => {
                        if (done) {
                            this.$toasted.global.default({msg: 'Encerrante Desabilitado.'})
                        } else {
                            this.$toasted.global.defaultSuccess({msg: 'Encerrante habilitado.'})
                        }
                    this.getEncerrantes()
                })
                .catch(e => this.$toasted.global.defaultError({msg: e.response.data}))

        },

        DeleteEncerrante(encerrante) {
            axios.delete(`${URL_ROOT}/upload/${encerrante._id}/${encerrante.name}`)
                .then(res => {
                    this.$toasted.global.defaultSuccess({msg: res.data})
                    this.getEncerrantes()
                    this.show_encerrante = false
                })
                .catch(e => this.$toasted.global.defaultError({msg: e.response.data}))
        }

    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getEncerrantes()
        document.title = 'Encerrantes'
    },

}
</script>

<style>

.row {
    max-width: 100%; 
}

#encerrantes {
    grid-area: content;
    margin: 10px;
}

.div-encerrantes {
    /* height: 380px; */
    max-height: 400px;
    overflow-x: hidden;
}

.show-encerrante {
    max-height: 400px;
}

.markedDone, .markedDone:hover {
    text-decoration: line-through;
    color: #0004;
}

.div_clear_show {
    border: 1px solid #0002;
    border-bottom: none;
    border-radius: 2px;
    padding: 2px;
}

/*=====animações=====*/
#encerrantes {
    animation: upTable 0.5s ease;
}

.table{
    animation: showTable 2.3s ease;
}

@keyframes upTable {
    from { 
        opacity: 0;
        transform: translateY(100px);
        }
    to {
        opacity: 1;
        transform: translateX(0px);
        }
}
@keyframes showTable {
    from { 
        opacity: 0;
        }
    to {
        opacity: 1;
        }
}

.show-encerrante {
    animation: encSideEnter 0.5s;
}

@keyframes encSideEnter {
    from { 
        opacity: 0;
        transform: translateX(100px);
        }
    to {
        opacity: 1;
        transform: translateX(0px);
        }
}

</style>
