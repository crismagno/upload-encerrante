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
            <transition name="fade">
                <div class="show-encerrante col-md-4 d-flex flex-column justify-content-start" v-if="show_encerrante">
                    <div class="div_clear_show d-flex justify-content-between align-items-center ">
                        <h5>{{encerrante_side.name.replace('.rtf', '')}}</h5>
                        <button  class="btn btn-secondary float-right btn-sm" @click="show_encerrante = false">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                    <ShowEncerrante :encerrante="encerrante_side" />
                </div>
            </transition>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import { URL_ROOT } from '@/config/global'

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

    computed: {

    },

    methods: {
        
        getEncerrantes() {
            const search = this.searchEncerrante ? `name=${this.searchEncerrante}` : ''
            axios.get(`${URL_ROOT}/upload?${search}`)
                .then(res => {
                    this.encerrantes = res.data
                })
                .catch(e => this.$toasted.global.defaultError({msg: e.response}))
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
                .catch(e => this.$toasted.global.defaultError({msg: 'Erro ao Desabilitar.'}))

        },

        DeleteEncerrante(encerrante) {
            axios.delete(`${URL_ROOT}/upload/${encerrante._id}`)
                .then(res => {
                    this.$toasted.global.defaultSuccess({msg: res.data})
                    this.getEncerrantes()
                })
                .catch(e => this.$toasted.global.defaultError({msg: e.response}))
        }

    },

    created(){
        this.getEncerrantes()
        // setInterval(() => {
        //     this.getEncerrantes()
        //     console.log('bla')
        // }, 5000)
    },

}
</script>

<style>

#encerrantes {
    margin: 10px;
}

.fade-enter {
    opacity: 0;
}

.fade-enter-active {
    transition: opacity 1s;
}

.row {
    max-width: 100%; 
}

#encerrantes {
    grid-area: content;
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
    animation: fade 2s;
}

@keyframes fade {
    from { 
        opacity: 0;
        transform: translateX(0);
        }
    to {
        opacity: 1;
        transform: translateX(90);
        }
}
</style>
