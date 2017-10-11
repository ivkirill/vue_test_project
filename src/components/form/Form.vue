<template>
    <div class="section section-full">
        <form v-on:submit.prevent="submitForm" novalidate="novalidate">
            <input-form v-for="field in fields" :field="field" :value="values[field.name]" @validate="validate"></input-form>
        </form>
        <pre class="pass text-small">{{ values }}</pre>
        <pre class="pass text-small">{{ fields }}</pre>
    </div>
</template>

<script>
    export default {
        name: 'component-form',
        components: {
            'input-form': function (resolve) {
                require(['@/components/form/input.vue'], resolve);
            }
        },
        props: {
            // элементы формы
            fields: {
                type: Array,
                required: true
            }
        },
		data: function() {
    		return {
				values: [],
                // дефолтный regexp, проверка на пусто
		        reDefault: /.+/                
			}
		},
        methods: {
            // валидация поля
	         validate: function(field) {
                field.valid = false;

                if( field.required === true ) {
                    // проверяем чекбоксы и радио
                    if( field.type === 'radio' || field.type === 'checkbox' ) {
                        console.log( field );
                    }
                    else {
                        // если не задан regExp, то проверим нет ли спецопределений для полей
                        if(field.regexp) {
                            field.regexp = ( this.field.type === 'email' ) ? /^[^\s]+@([-a-z0-9_]+\.)+[a-z\.]{2,10}$/i : false;
                        }

                        // добавляем регулярку на поле
                        if( (new RegExp(field.regexp || this.reDefault).test(field.value) ) ) field.valid = true;
                    }
                }
                else {
                    field.valid = true;
                }

                return field.valid;
	        },     

            validateForm: function() {
                var self = this;
                return !this.fields.some(function(el) {
                    return ((el.valid === null) ? self.validate(el) : el.valid) === false;
                });
            },

            getValues: function () {
                var self = this;
                fetch('http://seedunit.ru/test1.html?show=187423&array=187423&mime=json&product_uid_id=' + this.$route.params.id)
                    .then(function (data) {
                        return data.json();
                    })
                    .then(function (content) {
					    self.values = content[0];
                        //self.$parent.$emit('headertail', '«'+self.values.product_chr_name+'»'); // headerTail не всплывает в компонент panel :(
                    });
            },
            submitForm: function () {
                // проблема с кешированием вычисляемого свойства this.valid
                if (this.validateForm()) {
                    console.log('Форма валидна, можно отправлять.')
                } else {
                    console.log('Форма НЕ валидна, нужно исправить данные в полях.')
                }
            }
        },
        mounted: function () {
		    this.getValues();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>