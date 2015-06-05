//设置编辑器的文档内容（包含html格式的）
var setEditorContent = function (content) {
    editor.elements[0].innerHTML = content;
};
var saveEditorContent = function (json) {
    wdDb.db.insert(json, function (err, newDoc) {
        if (err !== null) {
            console.log(err);
            console.log(newDoc);
        }
    });
};
var elements = document.querySelectorAll('.editable');
var editor = new MediumEditor(elements, {
    buttons: ['bold', 'italic', 'underline', 'strikethrough', 'quote', 'anchor', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'orderedlist', 'unorderedlist', 'pre', 'outdent', 'indent', 'header1', 'header2'],
    buttonLabels: 'fontawesome',
    placeholder: '请输入内容',
    firstHeader: 'h1',
    secondHeader: 'h2',
    anchorInputPlaceholder: '输入链接地址',
    anchorInputCheckboxLabel: '在新窗口中打开',
});
//editor.elements[0].innerHTML = '<p>asdfasfdsdf</p>';
//内容修改事件
editor.subscribe('editableInput', function (event, editable) {
    //...
    //console.log('change: ' + editable.innerHTML, event);
    console.log(event.target.innerHTML, event.srcElement.innerHTML);
});
editor.subscribe('editableClick', function (event, editable) {
    //...
    console.log('begin edit.');
});
editor.subscribe('editableBlur', function (event, editable) {
    //...
    console.log('end edit.');
});
