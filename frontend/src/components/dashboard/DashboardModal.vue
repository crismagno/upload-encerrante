<template>
    <!-- Modal -->
    <div id="myModalDashboard" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" >
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body" >
                   
                </div>

                <div class="modal-footer d-flex justify-content-between" >
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        linhaOuColuna: String,
        nameHeader: String,
        resultadosModal: Object,

    },

}
</script>

<style>

.modal-body {
    height: 350px;
    overflow-x: hidden;
}

</style>
