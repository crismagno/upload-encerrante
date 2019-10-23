<template>
    <div :style="{borderLeft: border}" class="grafico">
       <GChart
            :settings="{ packages: ['corechart', 'table', 'map'] }"
            :type="type"
            :data="chartData"
            :options="options"
        />
    </div>
</template>

<script>

import { GChart } from 'vue-google-charts'
export default {
    props: {
        type: String,
        chartData: Array,
        options: Object,
        border: String
    },
    components: { GChart },
}
</script>

<style scoped>

.grafico {
    /* border-radius: 3px; */
    overflow-y: hidden;
}

</style>
