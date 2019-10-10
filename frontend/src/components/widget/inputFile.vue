<template>
    <div class="main-input-upload d-flex">
        <button :style="borderButton" class="btn btn-info" @click=" mostrar = !mostrar">
            <i  :class="{'fa fa-angle-left' : mostrar, 'fa fa-angle-right' : !mostrar}"></i>
        </button>
        <transition name="fadeInput">
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
            if (!this.fileSelected) {
				this.nameFile = 'Ex.: EncerranteXXXX-XXXX.rtf'
            } else {
				this.nameFile = this.fileSelected.name
			}
        },

        onUpload() {
            const data = new FormData()
            data.append('upload', this.fileSelected)
            axios.post(`${URL_ROOT}/upload`, data)
                .then(res => {
                    this.$toasted.global.defaultSuccess({msg: res.data})
                    this.nameFile = 'Ex.: EncerranteXXXX-XXXX.rtf'
                    this.fileSelected = null
                })
                .catch(e => {
                    this.$toasted.global.defaultError({msg: e.response.data})
                })
        },
    }
}
</script>

<style >

.main-input-upload {
    position: fixed;
    bottom: 20px;
}

.upload {
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
    width: 80%;
	height: 100%;
	opacity: 0;
	position: absolute;
	z-index: -1;
}

label {
    width: 100%;
}

.inputfile, label {
	cursor: pointer; /* "hand" cursor */
}

.btn-upload {
    height: 100%;
}

/*====== animações =======*/

.fadeInput-enter-active {
    animation: fadeInputEnter 1s ease;
}

.fadeInput-leave-to {
    animation: fadeInputOut 1s ease;
}

@keyframes fadeInputEnter {
	from {
		opacity: 0;
	} 
	to {
		opacity: 1;
	}
}
@keyframes fadeInputOut {
	from {
		opacity: 1;
	} 
	to {
		opacity: 0;
	}
}

</style>
