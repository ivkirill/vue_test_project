<template>
    <block-panel :header="header">
        <form-edit :fields="fields"></form-edit>
    </block-panel>
</template>


<script>
	import form_fields from '@/fields/product_edit.js';

    export default {
        name: 'page-product-list',
        components: {
            'block-panel': function (resolve) {
                require(['@/components/common/panel.vue'], resolve);
            },
            'form-edit': function (resolve) {
                require(['@/components/form/form.vue'], resolve);
            }
        },
        data: function () {
            return {
				caption: 'Список продукции',
				header: 'Редактирование товара',
				fields: form_fields.fields
			}
        }
    }
</script>