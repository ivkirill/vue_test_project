<!--
    Страница списка продукции
-->

<template>
    <block-panel :header="header">
        <table-sortable></table-sortable>
    </block-panel>
</template>

<script>
    export default {
        name: 'page-product-list',
        components: {
            'block-panel': function(resolve) {
                require(['@/components/common/panel.vue'], resolve);
            },
            'table-sortable': function(resolve) {
                require(['@/components/common/table.vue'], resolve);
            }
        },
        data: function() {
            return {
                header: 'Список продукции'
            }
        }
    }
</script>