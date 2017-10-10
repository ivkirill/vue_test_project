// элементы формы редактирования form_fields

var form_fields = [];

// элементы формы добавления
var form_fields = [];

form_fields[0] = {
    title: "Название",
    name: "Name",
    type: "text",
    required: true
};

form_fields[1] = {
    title: "Артикул",
    name: "Article",
    type: "text",
    required: true
};

form_fields[2] = {
    title: "Фотография",
    name: "Image",
    type: "file"
};

form_fields[3] = {
    title: "Цена, руб",
    name: "Price1",
    type: "number",
    required: true
};

form_fields[4] = {
    title: "Описание",
    name: "Text",
    type: "textarea"
};

form_fields[11] = {
    title: "Новинка",
    name: "New",
    type: "radio",
    items: [
        { 'title': 'Да', 'value': 'YES' },
        { 'title': 'Нет', 'value': 'NO' }
    ]
};

form_fields[10] = {
    title: "Дата добавления",
    name: "Create",
    type: "date"
};

export default {
    fields: form_fields
}