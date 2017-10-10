<template>
    <div class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">{{ title }}</div>
                <div class="modal-status"></div>
                <button type="button" data-dismiss="modal" class="btn close modal-close" @click="close"><span class="fa fa-close"></span></button>
            </div>
            <div class="modal-body " style="max-height: 954px;">
                <div class="modal-html">
                    <slot></slot>
                </div>
            </div>
            <div class="modal-footer"></div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'dialog-modal',
    props : {
        title : {
            required: true,
            type: String
        }
    },

	data: function() {
	  return {
		// отображение модального окна
	    show: false
	  }
	},
	
	methods : {
        // фильтруем данные
        close: function() {
            this.$emit('close');
        }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>