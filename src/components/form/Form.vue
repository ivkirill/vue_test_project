<template>
    <div>
        <component v-if="updatingData" is="overlay-loader"></component>
        <form v-on:submit.prevent="submitForm" novalidate="novalidate">
            <form-group v-for="item in items" :field="item" @validate="validate" @remove="remove" :key="item.name"></form-group>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'component-form',
        components: {
			'overlay-loader': function(resolve) {
				require(['@/components/loader/loader.vue'], resolve);				
			},            
            'form-group': function(resolve) {
                require(['@/components/form/group.vue'], resolve);
            }
        },
        props: {
            // элементы формы
            fields: {
                type: Object,
                required: true
            }
        },
        data: function() {
            return {
                // дефолтные значения полей
                values: {},
				// статус загрузки
				loading: false,                
                // дефолтный regexp, проверка на пусто
                reDefault: /.+/,
                // ключ действия, нужен для API (добавление/сохранение: ', удаление: 'remove')
                action: ''
            }
        },
        computed: {
            // расширенные элементы формы с дефолтными значениями
            items: function() {
                var extend = {};
                for (var key in this.fields) {
                    extend[key] = this.fields[key];
                    extend[key].value = this.values[(extend[key].name || 'dummy')];
                }
                return extend;
            },
			// загрузка обновления данных
			updatingData: function() {
				return ( this.loading === true && this.content !== null ) ? true : false;
			}
        },
        methods: {
            // валидация поля
            validate: function(field) {
                // ставим поле валидным
                field.valid = true;
                // если оно обязательное, то выполняем проверку
                if (field.required === true) {
                    // перед проверкой ставим поле невалидным, его валидность решим в процессе проверки
                    field.valid = false;
                    
                    // проверяем значение перед валидацией, если оно null или undefined, то приравниваем его к пустой строке
                    field.value = (field.value === null || field.value === undefined) ? '' : field.value;
                    
                    // если не задан regExp, то проверим нет ли спецопределений для полей
                    if (!field.regexp) {
                        field.regexp = (field.type === 'email') ? /^[^\s]+@([-a-z0-9_]+\.)+[a-z\.]{2,10}$/i : false;
                    }
                    // добавляем регулярку на поле
                    if ((new RegExp(field.regexp || this.reDefault).test(field.value))) field.valid = true;
                }
                // возвращаем валидность поля
                return field.valid;
            },
            // валидация всей формы
            validateForm: function() {
                var self = this;
                // ключ валидности всей формы
                var valid = true;
                // перебираем все элементы формы
                for(var key in this.items) {
                    // локальный ключ валидации каждого поля, он определен, то берем его, если нет - то валидируем это поле
                    var local = ( !this.items[key].valid ) ? self.validate(this.items[key]) : this.items[key].valid;
                    // если локальный ключ невалиден, то и форма - невалидна
                    if(!local) valid = false;
                }

                return valid;
            },
            // получаем данные для формы
            getValues: function() {
                var self = this;
                this.loading = true;
                fetch('http://seedunit.ru/test1.html?show=187423&array=187423&mime=json&quantity=1&product_uid_id=' + this.$route.params.id)
                    .then(function(data) {
                        return data.json();
                    })
                    .then(function(content) {
                        console.log( content[0] );
                        self.values = content[0];
                        self.loading = false;
                    });
            },
            // удаление записи через REST API
            remove: function(key) {
                if( key === true ) this.action = 'remove';
                else this.action = '';
            },
            // отправка формы
            submitForm: function() {
                var self = this;
                // проблема с кешированием вычисляемого свойства this.valid
                if (!this.validateForm()) {
                    console.log('Форма НЕ валидна, нужно исправить данные в полях.')
                    return false;
                }
                console.log('Форма валидна, можно отправлять.');

                // создаем formData для отправки
                var formData = new FormData();
                // добавляем объект полей к formData
                for ( var key in this.items ) {
                    if(this.items[key].type != 'submit') formData.append(this.items[key].name, this.items[key].value);
                }                

                // добавляем поля по рабочему API
                formData.append('from', window.location.href);
                formData.append('mime', 'json');
				formData.append('show', 187423);
				formData.append('update', 187423);
				formData.append('quantity', 1);

                // если указано действие удаления, добавляем ключ в форму
                if( this.action == 'remove' ) formData.append('action', 'remove');

                // если у нас есть открытый продукт, значит мы его редактируем, если нет то добавляем
                if( this.$route.params.id ) formData.append('product_uid_id', this.$route.params.id);                

                fetch('http://seedunit.ru/test1.html', {
                        method: 'POST',
                        body: formData
                    }).then(function(data) {
                        return data.json();
                    })
                    .then(function(content) {
                        console.log( content );
                        if(self.action == 'remove') {
                            self.$router.push('/');
                        }
                    });                

            }
        },
        beforeMount: function() {
            // получаем данные продукта если редактируем
            if (this.$route.params.id) this.getValues();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>