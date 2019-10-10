<template>
    <div class="auth">
        <div class="auth-box" :class="{formHide, formInvalid}">
            <!-- <div class="auth-box-header">cabecalho do auth -->
                <div class="auth-header d-flex justify-content-center">
                    <h2 style="color: #546e7a">{{showSignUp ? 'Cadastro' : 'Login'}}</h2>
                </div>

                <div class="auth-content d-flex flex-column justify-content-center"><!--corpo do auth-->
                    <div class="form-group">
                        <input class="form-control" v-if="showSignUp" v-model="user.name"
                            type="text" name="nome" placeholder="Digite seu Nome" />
                    </div>
                    <div class="form-group">
                        <input class="form-control" v-model="user.email" @keyup.enter="signIn()"
                            type="email" name="email" placeholder="Digite seu E-mail" />
                    </div>
                    <div class="form-group d-flex justify-content-between">
                        <input class="form-control" v-model="user.password"
                            :type="show ? 'password' : 'text'" name="password" placeholder="Digite sua senha" />

                        <a class="btn btn-link" @click="showPassword()">
                            <i :class="show ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                        </a> 
                    </div>
                    <div class="form-group d-flex justify-content-between" v-if="showSignUp" >
                        <input class="form-control" v-model="user.confirmPassword"
                            :type="show2 ? 'password' : 'text'" name="confirmPassword" placeholder="Confirme sua senha" />

                        <a class="btn btn-link" @click="showPassword2()">
                            <i :class="show2 ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                        </a> 
                    </div>
                </div>

                <div class="auth-botoes d-flex justify-content-between"><!--botoes do auth-->
                    <div class="newSenha" v-if="!showSignUp">
                        <a style="font-size: 13px" href>Esqueceu Senha?</a>
                    </div>
                    <div  v-if="showSignUp"></div>
                    
                    <div class="btn-group " >
                        <button class="btn " :class="showSignUp ? 'btn-primary' : 'btn-success'"
                            @click="!showSignUp? signIn() : signUp()">
                            {{showSignUp ? 'Registrar' : 'Entrar'}}
                        </button>
                        <button style="margin-left: 3px" class="btn btn-dark"  @click="clear">Cancelar</button>
                    </div>
                </div>

                <div class="auth-footer " >
                    <hr >
                    <div class="btn-cadlog d-flex justify-content-center">
                        <a href @click.prevent="showSignUp = !showSignUp">
                            <span >{{showSignUp ? 'Login' : 'Cadastre-se'}}</span>
                        </a>
                    </div>
                </div>

            </div>
        <!-- </div> -->
        <!-- cubos-animações da tela -->
        <ul class="squares">
            <!-- <li></li> -->
        </ul>
    </div>
</template>

<script>

import axios from "axios"
import { mapState } from "vuex";
import { URL_ROOT, userKey } from "@/config/global";

export default {
    name: 'login',
    data: function(){
        return {
            showSignUp: false,
            user: {},
            show: true,
            show2: true,
            formHide: false,
            formInvalid: false
        }
    },
    methods: {

        signIn(){

            axios.post(`${URL_ROOT}/signIn`, this.user)
                .then(resp => {
                    localStorage.setItem(userKey, JSON.stringify(resp.data))
                    this.$toasted.global.defaultSuccess({msg: `Acesso permitido a ${resp.data.name}!`})
                    this.$store.commit('setUser', resp.data)
                    this.formHide = true
                    setTimeout(() => {
                        document.body.style.overflow = 'initial'
                        this.$store.commit('showTemplate', true)
                        this.$router.push({path: '/dashboard'})
                    }, 400)
                })
                .catch(e => {
                    this.$toasted.global.defaultError({msg: e.response.data})
                    this.formInvalid = true
                    setTimeout(() => {
                        this.formInvalid = false
                    }, 900)
                }) 
        },

        signUp(){
            axios.post( `${URL_ROOT}/signUp`, this.user )
                .then(resp => {
                    this.$toasted.global.defaultSuccess({msg: resp.data})
                    this.showSignUp = false
                    this.user = {}
                })
                .catch(e => {
                    this.$toasted.global.defaultError({msg: e.response.data})
                    this.formInvalid = true
                    setTimeout(() => {
                        this.formInvalid = false
                    }, 900)
                })
        },

        clear(){
            this.user = {}
        },
        
        showPassword(){
            this.show = this.show ? false : true
        },

        showPassword2(){
            this.show2 = this.show2 ? false : true
        },

        animacaoCubos() {
            const ulSquares = document.querySelector('ul.squares')

            for (let i = 0; i < 11; i++) {
                const li = document.createElement('li')
                const random = (min, max) => Math.random() * (max - min) + min 
                
                const size = Math.floor(random(10, 120))
                const position = random(1, 99)
                const delay = random(5, 0.1)
                const duration = random(24, 12)

                li.style.width = `${size}px`
                li.style.height = `${size}px`
                li.style.bottom = `-${size}px`
                li.style.left = `${position}%`
                li.style.animationDelay = `${delay}s`
                li.style.animationDuration = `${duration}s`
                li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`

                ulSquares.appendChild(li)
            }
        }
    }, 

    created(){
        localStorage.removeItem(userKey)
        this.$store.commit('setUser', null)
        this.$store.commit('showTemplate', false)
        document.title = 'Auth'
        document.body.style.overflow = 'hidden'
    },

    mounted() {
        this.animacaoCubos()
    }
}
</script>

<style>

.auth{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    background: linear-gradient(to right, #29434e, #546e7a, #819ca9);
    overflow: hidden;
}

.auth-box{
    background-color: #FFF;
    width: 320px;
    padding: 15px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, .3);
    border-radius: 2px;
    overflow: hidden;
}

/* .auth-footer > hr {
    height: 0.5px;
    width: 100%;
    background-color: rgba(0, 0, 0,.2);
    margin-top: 40px;
} */

.btn-cadlog {
    margin-bottom: 10px;
}

.btn-cadlog > a {
    color: rgba(0, 0, 0,.5);
    font-size: 17px;
    font-weight: bold;
    text-decoration: none;
}

.btn-cadlog > a:hover {
    color: rgba(0, 0, 0,.6);
    text-decoration: none;
}    

.btn-link {
    cursor: pointer;
}

/*======= parte de animação do auth-login ========*/

.auth-box {
    animation: sliderUpDown 1s ease;
}

.formHide {
    animation: sliderUpDownHide 0.5s ease;
}

.formInvalid {
    animation: nono 0.3s linear, sliderUpDown paused;
}

.auth-content:nth-child(1) {
    animation: sliderLeft 1s ease;
    animation-delay: 100ms;
    animation-fill-mode: backwards;
}
.auth-content:nth-child(2) {
    animation: sliderLeft 1s ease;
    animation-delay: 250ms;
    animation-fill-mode: backwards;
}
.auth-botoes {
    animation: sliderLeft 0.8s ease;
    animation-delay: 500ms;
    animation-fill-mode: backwards;
}



@keyframes sliderUpDown {
    from {
        opacity: 0;
        transform: translateY(-500px);
    } 
    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes sliderUpDownHide {
    from {
        transform: translateY(0);
    } 
    to {
        transform: translateY(100vh);
    }
}

@keyframes sliderLeft {
    from {
        opacity: 0;
        transform: translateX(-700px);
    } 
    to {
        opacity: 1;
        transform: translateX(0px);
    }
}

@keyframes nono {
    0%, 100% {
        transform: translateX(0);
    } 
    35% {
        transform: translateX(-15%);
    }
    70% {
        transform: translateX(15%);
    }
}

.squares li {
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255,.15);
    display: block;
    position: absolute;
    bottom: -40px;
    animation: up 2s infinite;
    animation-direction: alternate;
}

@keyframes up {
    from {
        opacity: 0;
        transform: translateY(0);
    } 

    50% {
        opacity: 1;
    }
    to {
        transform: translateY(-900px) rotate(950deg) ;
    }
}
</style>
