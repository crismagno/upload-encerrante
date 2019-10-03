<template>
    <div class="main-input-upload">
        <button :style="borderButton" class="btn btn-info" @click=" mostrar = !mostrar">
            <i  :class="{'fa fa-angle-left' : mostrar, 'fa fa-angle-right' : !mostrar}"></i>
        </button>
        <transition name="fade">
            <div class="upload" v-if="mostrar">
                <label for="file" class="text-file">{{nameFile}}</label>
                <input type="file" name="file" id="file" class="inputfile" @change="onFileSelected">
                <button class="btn btn-info btn-upload" @click="onUpload">
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from "axios";

import { URL_ROOT } from "@/config/global";
export default {
    data () {
		return {
			fileSelected: null,
            nameFile: 'Ex.: EncerranteXXXX-XXXX.rtf',
            mostrar: false
		}
    },

    computed: {
        borderButton() {
            return this.mostrar ? 'border-radius: 0px; outline: none' : 'border-radius: 0px 5px 5px 0px'
        }
    },

    methods: {
        onFileSelected(event) {
            this.fileSelected = event.target.files[0]
            this.nameFile = this.fileSelected.name
        },

        onUpload() {
            const data = new FormData()
            data.append('upload', this.fileSelected)
            axios.post(`${URL_ROOT}/upload`, data)
                .then(res => {
                    this.$toasted.global.defaultSuccess({msg: res.data})
                    this.nameFile = 'Ex.: EncerranteXXXX-XXXX.rtf'
                })
                .catch(e => {
                    this.$toasted.global.defaultError({msg: e.response.data})
                    // console.log(e.response)
                })
            
        },
    }
}
</script>

<style >

.fade-enter {
    transition: opacity 0;
} 

.fade-enter-active {
    transition: opacity 2s ease;
}

.fade-leave-active {
    transition: opacity 1s;
}

.fade-leave-to {
    opacity: 0;
}

.main-input-upload {
    position: fixed;
    display: flex;
    bottom: 20px;
}

.upload {
    /* position: fixed; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 50px;
    
    box-sizing: border-box;
    border: solid 1px rgb(190, 189, 189);
    background-color: #819ca9;
    border-radius: 0px 5px 5px 0px;
    color: rgb(255, 255, 255);
    
    padding-left: 5px;
    overflow: hidden;
}

.inputfile {
    padding: 10px;
    width: 100%;
	height: 100%;
	opacity: 0;
	position: absolute;
	z-index: -1;
    /* margin: auto; */
}

label {
    width: 100%;
}

/* .inputfile, label {
    color: white;
    display: inline-block;
} */

.inputfile, label {
	cursor: pointer; /* "hand" cursor */
}

.btn-upload {
    /* border-radius: 5px; */
    height: 100%;
}

</style>
