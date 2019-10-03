<template>
    <div class="grafico">
       <GChart
            :settings="{ packages: ['corechart', 'table', 'map'] }"
            :type="type"
            :data="chartData"
            :options="options"
        />
        <!-- <hr> -->
    </div>
</template>

<script>

import { GChart } from 'vue-google-charts'
export default {
    props: {
        type: '',
        chartData: Array,
        options: {}
    },
    components: { GChart },
}

</script>

<style>

.grafico {
    overflow-y: hidden;
}

</style>
