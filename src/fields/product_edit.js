// элементы формы редактирования form_fields

var form_fields = [];

// элементы формы добавления
var form_fields = [];

form_fields[0] = {
    title: "Название",
    name: "product_chr_name",
    type: "text",
    required: true
};

form_fields[1] = {
    title: "Артикул",
    name: "product_chr_article",
    type: "text",
    required: true
};

form_fields[2] = {
    title: "Фотография",
    name: "product_img_image",
    type: "file"
};

form_fields[3] = {
    title: "Цена, руб",
    name: "product_dec_price1",
    type: "number",
    required: true
};

form_fields[4] = {
    title: "Описание",
    name: "product_txt_text",
    type: "textarea"
};

form_fields[5] = {
    title: "Новинка",
    name: "product_enm_new",
    type: "radio",
    required: true,
    items: [
        { 'title': 'Да', 'value': 'YES' },
        { 'title': 'Нет', 'value': 'NO' }
    ]
};

form_fields[6] = {
    title: "Дата добавления",
    name: "product_smp_create",
    type: "date"
};

form_fields[7] = {
    title: "Подтвердить",
    name: "Ok",
    type: "submit"
};

// установим валидность всех полей в null, это необходимо чтобы работал watch
form_fields.map(function(el) {
    el.valid = null;
});

export default {
    fields: form_fields
}