<!--
    Страница добавления нового продукта
-->

<template>
    <block-panel :header="header">
        <form-edit :fields="fields"></form-edit>
    </block-panel>
</template>


<script>
	import form_fields from '@/fields/product_add.js';

    // присваиваем всем полям свойства value и valid
    for(var key in form_fields) {
        form_fields[key].value = null;
        form_fields[key].valid = '';        
    }

    export default {
        name: 'page-product-edit',
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
				header: 'Добавление нового продукта',
				fields: form_fields
			}
        }
    }
</script>