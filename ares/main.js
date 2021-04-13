function radioCreator(target_name, typeNames){
    const target = document.getElementsByClassName(target_name)[0];

    let numOfRadio = Object.keys(itemsRadio).length;
    let keysOfRadio = Object.keys(itemsRadio);

    for(let radioBlockStep = 0; radioBlockStep < numOfRadio; radioBlockStep++){
        const divTaskType = document.createElement('div');
        divTaskType.classList.add('radio_group');
        // создаём блок radio для выбора типа заявки
        // смотрим сколько типов заявок числится в списке и тянем их ключи
        let numOf = Object.keys(itemsRadio[keysOfRadio[radioBlockStep]]).length;
        let keysOf = Object.keys(itemsRadio[keysOfRadio[radioBlockStep]]);
        
        const itemName = document.createElement('div');
        itemName.classList.add('radio_group_name');
        if (typeNames[radioBlockStep] == 'task_type') {
            itemName.textContent = 'Тип отправки';
            divTaskType.appendChild(itemName);
        } else if (typeNames[radioBlockStep] == 'term_model') {
            itemName.textContent = 'Модель терминала';
            divTaskType.appendChild(itemName);
        } else if (typeNames[radioBlockStep] == 'scanner') {
            itemName.textContent = 'Штрих-сканнер PPay';
            divTaskType.appendChild(itemName);
        }
        const groupBody = document.createElement('div');
        groupBody.classList.add('groups_body');
        // проходим по всему количеству ключей для построения блока для каждого элемента
        for (let rStep = 0; rStep < numOf; rStep++) {
            const taskRadItem = document.createElement('div');
            taskRadItem.classList.add('radio_item_block');

            const taskTypeInput = document.createElement('input');
            taskTypeInput.type = 'radio';
            taskTypeInput.id = `${typeNames[radioBlockStep]}_${rStep}`;
            taskTypeInput.name = `${typeNames[radioBlockStep]}`;
            /*
                где-то на этом моменте появляется ненависть к дебилу, который писал код
                на деле всё просто, если иметь переменные перед глазами
                заходим в перечень объектов radio, обращаемся к элементу по ключу,
                в этом "элементе по ключу" обращаемся к следующему элементу по ключу
                таким образом получаем значение
            */
           taskTypeInput.setAttribute('value', itemsRadio[keysOfRadio[radioBlockStep]][keysOf[rStep]]);

            /*
                зачем такая вложенность и сложность? Объектов на отрисовку много,
                их списки придётся переделывать рано или поздно,
                поэтому универсальный скрипт показался мне лучшим вариантом
            */

            // эта строчка для проверки работоспособности элементов и возврата их значений
            // taskTypeInput.setAttribute('OnClick', `getRadioValue('${nameType}');`);

            const taskLabel = document.createElement('label');
            taskLabel.setAttribute('for', `${typeNames[radioBlockStep]}_${rStep}`);
            taskLabel.textContent = `\xA0${itemsRadio[keysOfRadio[radioBlockStep]][keysOf[rStep]]}`;

            taskRadItem.appendChild(taskTypeInput);
            taskRadItem.appendChild(taskLabel);
            groupBody.appendChild(taskRadItem);
        }
        divTaskType.appendChild(groupBody);
        target.appendChild(divTaskType);
    }
}
function selectCreator (target_name, typeNames) {
    const target = document.getElementsByClassName(target_name)[0];

    let numOfSelect = Object.keys(itemsSelectBlock).length;
    let keyOfSelect = Object.keys(itemsSelectBlock);
    
    for(let selectBlockStep = 0; selectBlockStep < numOfSelect; selectBlockStep++){
        // для улучшения читабельности страницы создаём имена для блоков
        let addBFlag = false;
        let selectBlockName = document.createElement('div');
        
        if (typeNames[selectBlockStep] == 'term_pack') {
            selectBlockName.innerHTML = 'Комплектация терминала';
        } else if (typeNames[selectBlockStep] == 'connect_type') {
            selectBlockName.innerHTML = 'Тип интернет подключения';
        } else if (typeNames[selectBlockStep] == 'unipos') {
            selectBlockName.innerHTML = 'Unipos';
        } else if (typeNames[selectBlockStep] == 'net_item') {
            selectBlockName.innerHTML = 'Сетевые устройства';
        } else if (typeNames[selectBlockStep] == 'cabels') {
            selectBlockName.innerHTML = 'Кабели';
            addBFlag = true;
        } else if (typeNames[selectBlockStep] == 'sim_cards') {
            selectBlockName.innerHTML = 'SIM/SAM карты для отправки';
            addBFlag = true;
        } 
        
        // блок с нужным именем
        const targetSubBlock = document.createElement('div');
        targetSubBlock.classList.add(`select_block`);
        targetSubBlock.id = typeNames[selectBlockStep];
        targetSubBlock.appendChild(selectBlockName);
        // создаём блок select для выбора типа заявки
        const selectBlock = document.createElement('select');
        selectBlock.classList.add('select_option_block');
        selectBlock.name = typeNames[selectBlockStep];
        selectBlock.id = `sb_${selectBlockStep}`;

        const descrButton = document.createElement('button');
        descrButton.classList.add('small_button');
        descrButton.setAttribute('type','button');
        descrButton.setAttribute('onclick', `getSelValDiscription('${typeNames[selectBlockStep]}', 'sb_${selectBlockStep}');`);
        descrButton.textContent ='?';

        // смотрим сколько типов select блоков числится в списке и тянем их ключи
        let numOfElements = Object.keys(itemsSelectBlock[keyOfSelect[selectBlockStep]]).length;
        let keysOfElements = Object.keys(itemsSelectBlock[keyOfSelect[selectBlockStep]]);

        if (addBFlag == true){
            // typeNames = typeNamesForSelect
            // addSelectBlock (targetName, id, numOfElements, keysOfElements)
            const addButton = document.createElement('button');
            addButton.classList.add('small_button');
            addButton.setAttribute('type','button');
            addButton.id = `sbAdd${selectBlockStep}`;
            addButton.setAttribute('onclick', `addSelectBlock('${typeNames[selectBlockStep]}', '${selectBlockStep}', 'sbAdd${selectBlockStep}');`);
            addButton.textContent ='+';
            targetSubBlock.appendChild(addButton);
        }

        // проходим по всему количеству ключей для построения блока для каждого элемента
        for (let sStep = 0; sStep < numOfElements; sStep++) {
            // создаём элемент для внесения в список select
            const curItem = document.createElement('option');
            // заполняем его тело
            curItem.textContent = keysOfElements[sStep];
            selectBlock.appendChild(curItem);
        }
        targetSubBlock.appendChild(selectBlock);
        targetSubBlock.appendChild(descrButton);
        target.appendChild(targetSubBlock);
    }
}
function checkCreator(target_name, objMapToCreation, namesOfObj, blockName, title) {
    // выбираем целевой элемент
    const target = document.getElementsByClassName(target_name)[0];
    // создаём элемент для записи всех CheckBox
    const chckBoxBlock = document.createElement('div');
    chckBoxBlock.classList.add('check_blocks');
    // создаём элемент заголовка
    const cBlockTitle = document.createElement('div');
    cBlockTitle.textContent = title;
    chckBoxBlock.appendChild(cBlockTitle);
    // создаём блок тела списка
    const cBoxMainBlock = document.createElement('div');
    cBoxMainBlock.classList.add('check_list');
    // получаем количество объектов для создания и ключи к ним
    const numOfCbox = Object.keys(objMapToCreation).length;
    const keyOfCbox = Object.keys(objMapToCreation);
    // проходимся по всему списку объектов
    for (let checkBoxStep = 0; checkBoxStep < numOfCbox; checkBoxStep++){
        // каждому создаём div для упрощения работы со стилями
        const cBoxPair = document.createElement('div');
        cBoxPair.classList.add('check_pair');
        // для удобства пользователя, каждому checkbox присваиваем лейбл
        const chckBoxLabel = document.createElement('label');
        chckBoxLabel.setAttribute('for', namesOfObj[checkBoxStep]);
        chckBoxLabel.id = `${namesOfObj[checkBoxStep]}_l`;
        chckBoxLabel.textContent = `\xA0${objMapToCreation[keyOfCbox[checkBoxStep]]}`;
        // формируем элемент checkbox
        const chkBoxTypeInput = document.createElement('input');
        chkBoxTypeInput.type = 'checkbox';
        chkBoxTypeInput.name = blockName;
        chkBoxTypeInput.id = namesOfObj[checkBoxStep];
        // записываем пару в блок тела списка
        cBoxPair.appendChild(chkBoxTypeInput);
        cBoxPair.appendChild(chckBoxLabel);
        cBoxMainBlock.appendChild(cBoxPair);
    }
    // записываем блок тела списка в целевой блок вывода
    chckBoxBlock.appendChild(cBoxMainBlock);
    target.appendChild(chckBoxBlock);
}
// функция получения значения выбранного элемента radio
function getRadioValue(block_name) {
    try {
        const tmp = document.querySelector(`input[name=${block_name}]:checked`).value;
        return tmp;
    } catch {
        console.log(`Not critical error. Can't get checked "radio" element.`);
    }
}
// функция получения значения выбранного элемента select
function getSelectValue(elemID) {
    try {
        const tmp = document.getElementById(`${elemID}`).value;
        return tmp;
    } catch {
        console.log(`Not critical error. Can't get checked "select" element.`);
    }
}
// функция получения значения выбранного элемента check
function getCheckValue(elem_name) {
    try {
        // обращаемся элементу по имени
        let checkboxes = document.getElementsByName(`${elem_name}`);
        let checkboxesChecked = [];
        // проверяем все имеющиеся элементы с заданным именем
        for (var i=0; i<checkboxes.length; i++) {
            // если есть выбранные - добавляем текст из их label в список к выводу
            if (checkboxes[i].checked) {
                let tmp_id = checkboxes[i].id;
                let textValue = document.getElementById(`${tmp_id}_l`).innerText;
                checkboxesChecked.push(textValue);
            }
        }
        // возвращаем полученный список, если он не пустой, иначе - null
        return checkboxesChecked.length > 0 ? checkboxesChecked : null;
    } catch {
        console.log(`Not critical error. Can't get checked "checkbox" element.`);
    }
    
}
// функция вывода описания (значение в словарях) в поле "description" тела страницы
function getSelValDiscription(name, id) {
    let keys = Object.keys(itemsSelectBlock);
    let searchName = typeNamesForSelect.indexOf(`${name}`, 0);
    let curElem = itemsSelectBlock[keys[searchName]];
    let sKey = getSelectValue(id);

    let tmp = document.getElementsByClassName('description')[0];
    let p = document.createElement('p');
    p.textContent = curElem[sKey];
    tmp.innerHTML = '';
    tmp.appendChild(p);
}
function addSelectBlock (targetName, id, buttonId) {
    let target = document.getElementById(`${targetName}`);

    let keyOfSelect = Object.keys(itemsSelectBlock);

    // смотрим сколько типов select блоков числится в списке и тянем их ключи
    let numOfElements = Object.keys(itemsSelectBlock[keyOfSelect[id]]).length;
    let keysOfElements = Object.keys(itemsSelectBlock[keyOfSelect[id]]);

    const selectBlock = document.createElement('select');
    selectBlock.classList.add('select_option_block');
    selectBlock.name = targetName;
    selectBlock.id = `sb_${id}_1`;
    
    // проходим по всему количеству ключей для построения блока для каждого элемента
    for (let sStep = 0; sStep < numOfElements; sStep++) {
        // создаём элемент для внесения в список select
        const curItem = document.createElement('option');
        // заполняем его тело
        curItem.textContent = keysOfElements[sStep];
        selectBlock.appendChild(curItem);
    }
    target.appendChild(selectBlock);
    document.getElementById(`${buttonId}`).style.display = 'none';
}
// эта функция для кнопки сброса удаляет доп.созданные select и возвращает видимость кнопки добавления списка
function dropToBasic() {
    document.getElementsByClassName("description")[0].innerHTML = '';
    
    try {
        document.getElementById('sbAdd4').style.removeProperty('display');
        document.getElementById('sb_4_1').remove();
    } catch {
        console.log(`Not critical error. Can't remove object 'sb_4_1' because it's not exist.`);
    }
    try {
        document.getElementById('sbAdd5').style.removeProperty('display');
        document.getElementById('sb_5_1').remove();
    } catch {
        console.log(`Not critical error. Can't remove object 'sb_5_1' because it's not exist.`);
    }
}
// функция генерирования таблицы и темы для заявки в поле "table" тела страницы
function generate(){
    // для теста функций получения значений
    // let tmp = document.getElementsByClassName('description')[0];
    // let value = getSelValDiscription('connect_type', 'sb_1');
    // tmp.innerHTML = '';
    // tmp.innerHTML = value;
    // pass
    // alert(getRadioValue('task_type'));
    // alert(getRadioValue('term_model'));
    // alert(getCheckValue('mob_oper'));
    titleGenerator();
    tableGenerator();
}
// Основная функция отрисовки блока ввода данных 
function inputBlockCreator() {
    // получаем объект для внесения элементов и сбрасываем его предыдущее значение
    const body = document.getElementsByClassName('key_block')[0];
    body.innerHTML = '';
    // выводим блоки radio (тип заявки и модель терминала)
    radioCreator('key_block', typeNamesForRadio);
    // выводим блоки select
    selectCreator('key_block', typeNamesForSelect);
    // здесь нужно вывести блок checkBox
    checkCreator('key_block', mobileOperators, mobOperNames, 'mob_oper', 'SIM для настройки подключений');

    // Создаём клавиши генерации и сброса формы
    const bBlock = document.createElement('div');
    bBlock.classList.add('buttons_block');

    const buttonGenerate = document.createElement('button');
    buttonGenerate.setAttribute('onclick', 'generate(); return false;');
    buttonGenerate.classList.add('button');
    buttonGenerate.type = 'button';
    buttonGenerate.textContent = 'Генерация';
    const buttonReset = document.createElement('button');
    buttonReset.classList.add('button');
    buttonReset.type = 'reset';
    buttonReset.setAttribute('onClick', 'dropToBasic();');
    buttonReset.textContent ='Сброс';

    bBlock.appendChild(buttonGenerate);
    bBlock.appendChild(buttonReset);
    body.appendChild(bBlock);
}
// функция для создания поля ввода информации по отправителю/получателю
function rDataFormCreator(target_name) {
    const body = document.getElementsByClassName(`${target_name}`)[0];

    
    const lblock = document.createElement('form');
    lblock.classList.add('text_block');
    lblock.classList.add('key_block');
    
    // название организации получателя
    const nTO = document.createElement('input');
    nTO.classList.add('text_box');
    nTO.type = 'text';
    nTO.id = 'recvr_to_num';
    nTO.placeholder = '7777';
    nTO.required = true;

    const lnTO = document.createElement('label');
    lnTO.setAttribute('for', 'recvr_to_num');
    lnTO.textContent = 'Номер ТО';
    lblock.appendChild(lnTO);
    lblock.appendChild(nTO);

    // название организации получателя
    const company = document.createElement('input');
    company.classList.add('text_box');
    company.type = 'text';
    company.id = 'recvr_company';
    company.placeholder = 'ООО Компания ИНН 1234567890';
    company.required = true;

    const lCompany = document.createElement('label');
    lCompany.setAttribute('for', 'recvr_company');
    lCompany.textContent = 'Название организации';
    lblock.appendChild(lCompany);
    lblock.appendChild(company);

    // Имя получателя
    const name = document.createElement('input');
    name.classList.add('text_box');
    name.type = 'text';
    name.id = 'recvr_name';
    name.placeholder = 'Сотрудник/Иванов Иван Иванович';
    // name.defaultValue = 'Сотрудник';
    name.required = true;

    const lName = document.createElement('label');
    lName.setAttribute('for', 'recvr_name');
    lName.textContent = 'Имя';
    lblock.appendChild(lName);
    lblock.appendChild(name);

    // телефон получателя
    const phNumber = document.createElement('textarea');
    phNumber.classList.add('text_area');
    phNumber.rows = 2;
    phNumber.type = 'tel';
    phNumber.id = 'recvr_phone';
    phNumber.placeholder = '+7(495)000-0000';
    phNumber.required = true;

    const lPhNumber = document.createElement('label');
    lPhNumber.setAttribute('for', 'recvr_phone');
    lPhNumber.textContent = 'Контактный номер';
    lblock.appendChild(lPhNumber);
    lblock.appendChild(phNumber);
    body.appendChild(lblock);

    // адрес получателя
    const adr = document.createElement('textarea');
    adr.classList.add('text_area');
    adr.rows = 5;
    adr.type = 'text';
    adr.id = 'recvr_adr';
    adr.placeholder = 'Регион, Нас.пункт, Улица, Дом/Строение';
    adr.required = true;

    const lAdr = document.createElement('label');
    lAdr.setAttribute('for', 'recvr_adr');
    lAdr.textContent = 'Адрес';
    lblock.appendChild(lAdr);
    lblock.appendChild(adr);

    // примечание
    const addInfo = document.createElement('textarea');
    addInfo.classList.add('text_area');
    addInfo.rows = 5;
    addInfo.id = 'addition_data';
    addInfo.placeholder = 'Любой дополнительный текст при необходимости';

    const lAddInfo = document.createElement('label');
    lAddInfo.setAttribute('for', 'addition_data');
    lAddInfo.textContent = 'Примечание';
    lblock.appendChild(lAddInfo);
    lblock.appendChild(addInfo);

    const buttonReset = document.createElement('button');
    buttonReset.classList.add('button');
    buttonReset.type = 'reset';
    buttonReset.textContent ='Очистка';
    lblock.appendChild(buttonReset);
    // pass
}
function getTextData (targetID) {
    let tmp = document.getElementById(targetID).value;
    return tmp.replaceAll('  ',' ');
}
// функция для создания темы заявки
function titleGenerator() {
    let titleBody = document.getElementsByClassName('title')[0];
    titleBody.innerHTML = '';

    let lTitle = document.createElement('label');
    lTitle.setAttribute('for', 'p_title');
    lTitle.textContent = 'Тема:';
    
    let pTitle = document.createElement('p');
    pTitle.id = 'p_title';
    pTitle.textContent = `\xA0${getRadioValue('task_type') ? getRadioValue('task_type') : '____' } оборудования ТО ${getTextData('recvr_to_num') ? getTextData('recvr_to_num') : '____'}`;
    // let titleText = `${getRadioValue('task_type')} оборудования ТО ${getTextData('recvr_to_num')}`;
    // понятия не имею как это работает, если честно, просто спёр из интернета функцию
    titleBody.onclick = function() {
        document.execCommand("copy");
      }
      titleBody.addEventListener("copy", function(event) {
        event.preventDefault();
        if (event.clipboardData) {
          event.clipboardData.setData("text/plain", pTitle.textContent);
        }
      });
    titleBody.appendChild(lTitle);
    titleBody.appendChild(pTitle);
}
// function tableCopyEvent () {
//     let titleBody = document.getElementsByClassName('table')[0];
    
//     titleBody.onclick = function() {
//         document.execCommand("copy");
//       }
//       titleBody.addEventListener("copy", function(event) {
//         event.preventDefault();
//         if (event.clipboardData) {
//           event.clipboardData.setData("text/plain", titleBody.cloneNode.);
//         }
//       });
// }
// функция для создания таблицы для заявки
function tableGenerator() {
    const tableBody = document.getElementsByClassName('table')[0];
    tableBody.innerHTML = '';

    let realTableBody = document.createElement('table');
    realTableBody.setAttribute('style', 'border-width: 0px; margin: 0; padding: 0; border-collapse: collapse;');
    realTableBody.setAttribute('style', 'width: 430px');
    realTableBody.setAttribute('border', '1px');
    realTableBody.setAttribute('cellpadding', '0');
    realTableBody.setAttribute('cellspacing', '0');
    
    // обязательные стили для таблицы в письме
    // <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">

    // строка перечня оборудования к отправке
    let tableRowMainInfo = document.createElement('tr');
    tableRowMainInfo.setAttribute('style', 'border-width: 0px;');

    let cellPackageName = document.createElement('td');
    cellPackageName.textContent = 'Перечень оборудования';
    cellPackageName.setAttribute('style', 'padding: 10px 5px; border-style: solid; border-color: #777; border-width: 1px;');
    tableRowMainInfo.appendChild(cellPackageName);
    // составляем список оборудования на замену
    let complect = [];
    if (getSelectValue('sb_0') != 'Не требуется') {
        complect.push(getSelectValue('sb_0'));
    }
    if (getSelectValue('sb_3') != 'Не требуется') {
        complect.push(getSelectValue('sb_3'));
    }
    if (getSelectValue('sb_4') != 'Не требуется') {
        complect.push(getSelectValue('sb_4'));
    }
    // проверяем есть ли добавленные поля для кабеля
    try {
        if (getSelectValue('sb_4_1')) {
            if (getSelectValue('sb_4_1') != 'Не требуется') {
                complect.push(getSelectValue('sb_4_1'));
            }   
        }
    } catch {
        console.log(`Not critical error. Can't get checked "select" element with ID = 'sb_4_1'. It's not exist.`);
    }
    if (getSelectValue('sb_5') != 'Не требуется') {
        complect.push(getSelectValue('sb_5'));
    }
    // проверяем доп. поля для сим
    try {
        if(getSelectValue('sb_5_1')){
            if (getSelectValue('sb_5_1') != 'Не требуется') {
                complect.push(getSelectValue('sb_5_1'));
            }
        }    
    } catch {
        console.log(`Not critical error. Can't get checked "select" element with ID = 'sb_4_1'. It's not exist.`);
    }

    let cellPackageList = document.createElement('td');
    cellPackageList.setAttribute('style', 'padding: 10px 5px; border-style: solid; border-color: #777; border-width: 1px;');
    let list = document.createElement('ul');
    
    for (let i=0; i < complect.length; i++) {
        let elLi = document.createElement('li');
        elLi.setAttribute('style', 'list-style-type: none;');
        elLi.textContent = `${complect[i]}`
        list.appendChild(elLi);
    }
    cellPackageList.appendChild(list);
    tableRowMainInfo.appendChild(cellPackageList);

    // строка общей информации о получателе
    let tableRoWRecieverName = document.createElement('tr');
    tableRoWRecieverName.setAttribute('style', 'border-width: 0px;');

    let cellRecName = document.createElement('td');
    cellRecName.textContent = 'Получатель';
    cellRecName.setAttribute('style', 'padding: 10px 5px; border-style: solid; border-color: #777; border-width: 1px;');

    tableRoWRecieverName.appendChild(cellRecName);

    let cellRecData = document.createElement('td');
    cellRecData.setAttribute('style', 'padding: 10px 5px; border-style: solid; border-color: #777; border-width: 1px;');
    let rData = document.createElement('ul');
    if (getTextData('recvr_company') != '') {
        let rDataCompName = document.createElement('li');
        rDataCompName.setAttribute('style', 'list-style-type: none;');
        rDataCompName.textContent = getTextData('recvr_company').replace('  ', ' ');
        rData.appendChild(rDataCompName);
    }
    if (getTextData('recvr_phone') != '') {
        let rDataPhone = document.createElement('li');
        rDataPhone.setAttribute('style', 'list-style-type: none;');
        const regex = /(\d?)\s(\d)/g;
        const phoneNumber = getTextData('recvr_phone').replaceAll(regex, '$1-$2');
        rDataPhone.textContent = `Тел.: ${phoneNumber}`;
        rData.appendChild(rDataPhone);
    }
    if (getTextData('recvr_name') != ''){
        let rDataName = document.createElement('li');
        rDataName.textContent = getTextData('recvr_name');
        rDataName.setAttribute('style', 'list-style-type: none;');
        rData.appendChild(rDataName);
    } else if (getTextData('recvr_name') == '') {
        let rDataName = document.createElement('li');
        rDataName.setAttribute('style', 'list-style-type: none;');
        rDataName.textContent = 'Сотрудник';
        rData.appendChild(rDataName);
    }
    cellRecData.appendChild(rData)
    tableRoWRecieverName.appendChild(cellRecName);
    tableRoWRecieverName.appendChild(cellRecData);
    // строка адреса получателя
    let tableRoWRecieverAdr = document.createElement('tr');
    tableRoWRecieverAdr.setAttribute('style', 'border-width: 0px;');

    let firstColumnStyle = 'width: 150px; padding: 10px 5px; border-style: solid; border-color: #777; border-width: 1px;';

    let cellRecAndName = document.createElement('td');
    cellRecAndName.setAttribute('style', firstColumnStyle);
    cellRecAndName.textContent = 'Адрес получателя'

    let cellRecAdrData = document.createElement('td');
    cellRecAdrData.setAttribute('style', 'padding: 10px; border-style: solid; border-color: #777; border-width: 1px;');
    cellRecAdrData.textContent = getTextData('recvr_adr').replace('  ', ' ');

    tableRoWRecieverAdr.appendChild(cellRecAndName);
    tableRoWRecieverAdr.appendChild(cellRecAdrData);
    // строка модели терминала
    let tableRowModelInfo = document.createElement('tr');
    tableRowModelInfo.setAttribute('style', 'border-width: 0px;');

    let cellModelBlockName = document.createElement('td');
    cellModelBlockName.setAttribute('style', firstColumnStyle);
    cellModelBlockName.innerText = 'Модель терминала';

    let cellRowModelInfo = document.createElement('td');
    cellRowModelInfo.setAttribute('style', 'padding: 10px; border-style: solid; border-color: #777; border-width: 1px;');
    if (getRadioValue('term_model')) {
        cellRowModelInfo.innerText = getRadioValue('term_model');
    }
    
    tableRowModelInfo.appendChild(cellModelBlockName);
    tableRowModelInfo.appendChild(cellRowModelInfo);
    // строка сканнера PPay
    let tableRowScannerInfo = document.createElement('tr');
    tableRowScannerInfo.setAttribute('style', 'border-width: 0px;');

    let cellScannerBlockName = document.createElement('td');
    cellScannerBlockName.setAttribute('style', firstColumnStyle);
    cellScannerBlockName.innerText = 'Сканнер PPay';

    let cellRowScannerInfo = document.createElement('td');
    cellRowScannerInfo.setAttribute('style', 'padding: 10px; border-style: solid; border-color: #777; border-width: 1px;');
    if (getRadioValue('scanner')) {
        cellRowScannerInfo.innerText = getRadioValue('scanner');
    }
    
    tableRowScannerInfo.appendChild(cellScannerBlockName);
    tableRowScannerInfo.appendChild(cellRowScannerInfo);
    
    //
    // строка Unipos
    let tableRowUnipos = document.createElement('tr');
    tableRowUnipos.setAttribute('style', 'border-width: 0px;');

    let cellUniposName = document.createElement('td');
    cellUniposName.setAttribute('style', firstColumnStyle);
    cellUniposName.textContent = 'Unipos';

    let cellUniposData = document.createElement('td');
    cellUniposData.setAttribute('style', 'padding: 10px; border-style: solid; border-color: #777; border-width: 1px;');
    cellUniposData.textContent = getSelectValue('sb_2');

    tableRowUnipos.appendChild(cellUniposName);
    tableRowUnipos.appendChild(cellUniposData);

    // строка Подключений
    let tableRowConnection = document.createElement('tr');
    tableRowConnection.setAttribute('style', 'border-width: 0px;');

    let cellConnectName = document.createElement('td');
    cellConnectName.setAttribute('style', firstColumnStyle);
    cellConnectName.textContent = 'Подключение';

    let cellConnectData = document.createElement('td');
    cellConnectData.setAttribute('style', 'padding: 10px; border-style: solid; border-color: #777; border-width: 1px;');
    cellConnectData.textContent = getSelectValue('sb_1');

    tableRowConnection.appendChild(cellConnectName);
    tableRowConnection.appendChild(cellConnectData);

    // строка SIM для Подключений
    let tableRowSIMConnect = document.createElement('tr');
    tableRowSIMConnect.setAttribute('style', 'border-width: 0px;');

    let cellSIMconnName = document.createElement('td');
    cellSIMconnName.setAttribute('style', firstColumnStyle);
    cellSIMconnName.textContent = 'SIM для подключения';

    let cellSIMconnData = document.createElement('td');
    cellSIMconnData.setAttribute('style', 'padding: 10px; border-style: solid; border-color: #777; border-width: 1px;');
    cellSIMconnData.textContent = getCheckValue('mob_oper');

    tableRowSIMConnect.appendChild(cellSIMconnName);
    tableRowSIMConnect.appendChild(cellSIMconnData);

    // строка номера ТО
    let tableRowSPnum = document.createElement('tr');
    tableRowSPnum.setAttribute('style', 'border-width: 0px;');

    let cellSPnumName = document.createElement('td');
    cellSPnumName.setAttribute('style', firstColumnStyle);
    cellSPnumName.textContent = 'Номер ТО';

    let cellSPnumData = document.createElement('td');
    cellSPnumData.setAttribute('style', 'padding: 10px; border-style: solid; border-color: #777; border-width: 1px;');
    cellSPnumData.textContent = getTextData('recvr_to_num');

    tableRowSPnum.appendChild(cellSPnumName);
    tableRowSPnum.appendChild(cellSPnumData);

    // строка комментария
    let tableRowAdditionInfo = document.createElement('tr');
    tableRowAdditionInfo.setAttribute('style', 'border-width: 0px;');
    let cellAddInfoName = document.createElement('td');
    cellAddInfoName.setAttribute('style', firstColumnStyle);
    cellAddInfoName.textContent = 'Примечание';

    let cellAddInfoData = document.createElement('td');
    cellAddInfoData.setAttribute('style', 'padding: 10px; border-style: solid; border-color: #777; border-width: 1px;');
    cellAddInfoData.textContent = getTextData('addition_data').replace('  ', ' ');

    tableRowAdditionInfo.appendChild(cellAddInfoName);
    tableRowAdditionInfo.appendChild(cellAddInfoData);

    realTableBody.appendChild(tableRowMainInfo);
    realTableBody.appendChild(tableRoWRecieverName);
    realTableBody.appendChild(tableRoWRecieverAdr);
    realTableBody.appendChild(tableRowModelInfo);
    realTableBody.appendChild(tableRowScannerInfo);
    realTableBody.appendChild(tableRowUnipos);
    realTableBody.appendChild(tableRowConnection);
    realTableBody.appendChild(tableRowSIMConnect);
    realTableBody.appendChild(tableRowSPnum);
    realTableBody.appendChild(tableRowAdditionInfo);
    tableBody.appendChild(realTableBody);

    // tableCopyEvent();
}

const termPacks = {
    'Не требуется': 'Отправка не требуется',
    'Терм.комплект': 'Терминал, БП терминала и MagicBox либо SAM-карта',
    'Терминал': 'Терминал + MagicBox/SAM',
    'БП терминала': 'Блок питания + Кабель с вилкой',
}

const itemsNetwork = {
    'Не требуется': 'Отправка не требуется',
    'Модемный комплект': 'Модем ComWL, Антенна, БП модема, Пин-кабель',
    'Роутерный комплект': 'Роутер, БП роутера, Антенна с переходником, Патч-корд',
    'Модем': 'ComWL + набор SIM',
    'Модем + антенна': 'ComWL с набором SIM и антенной',
    'БП модема': '',
    'Роутер': 'Роутер + набор SIM',
    'Роутер + антенна': 'Роутер с набором SIM и антенной с переходником',
    'БП роутера': 'Требуется указание в примечании о том для какого роутера (штекер)',
    'Антенна модема': 'Стандартная антенна с разъёмом подключения к ComWL',
    'Антенна роутера': 'Антенна + переходник для подключения к роутеру',
}

const cabels = {
    'Не требуется': 'Отправка не требуется',
    'Патч-корд (ETH)': 'Кабель для подключения к роутеру. Стандартная длина 1,5 метра',
    'Пин-кабель ICT (COM)': 'Кабель для подключения терминала через СОМ-порт к ComWL',
    'Пин-кабель VX520 (COM)': 'Кабель для подключения терминала через СОМ-порт к ComWL',
    'Unipos (Com)': 'Кабель для подключения терминала к кассе по DB9 разъёму',
    'Unipos (USB)': 'Обычный USB кабель для соединения устройств, требуется наличия установленных драйверов на ПК',
    'MagicBox (2-ва COM)': 'Кабель-переходник для ICT 250 (EM). Имеет порты COM0, COM2 и ETH',
    'MagicBox (RS232)': 'Кабель-переходник для ICT 250 (GEM). Имеет порты RS232 и ETH',
    'USB-переходник угловой': 'Переходник USB Type-A to Type-A с выводом под 120 градусов, используется для подключения штрих-сканнера PPay',
}

 const cards = {
    'Не требуется': 'Отправка не требуется',
    'SIM Мегафон': 'SIM-карта для обеспечения связи на территории РФ',
    'SIM МТС': 'SIM-карта для обеспечения связи на территории РФ',
    'SIM Билайн': 'SIM-карта для обеспечения связи на территории РФ',
    'SIM Теле2': 'SIM-карта для обеспечения связи на территории РФ',
    'SIM A1 (Velcom)': 'SIM-карта для обеспечения связи на территории Республики Беларусь',
    'SAM': 'Модуль хранения ключей шифрования ПО. Без него не будут осуществляться транзакции',
}

const typeConnections = {
    'Не требуется': 'Настройка подключения у терминала не требуется',
    'ETH': 'Проводное подключение через роутер',
    'ETH + внеш.Модем (ComWL)': 'Проводное подключение через роутер с резервным подключением по внешнему ComWL',
    'ETH + внутр.GPRS': 'Проводное подключение через роутер с резервинованием подключения по встроенному модему терминала. Примеримо для моделей с внутренним модемом',
    'Внутр.модем (GPRS)': 'Подключение через встроенный модем терминала. Примеримо для моделей с внутренним модемом',
    'Внеш.модем (ComWL)': 'Проводное подключение терминала через COM-разъём к внешнему модему ComWL',
}

const portUnipos = {
    'Не требуется': 'Настройка не требуется. Связь с АСУ не используется.',
    'USB': 'Подключение терминала к АСУ через кабель USB. На АСУ (кассе) потребуется установка драйвера',
    'COM0': 'Терминал будет обращаться к АСУ через первый COM-порт.',
    'COM2': 'Терминал будет обращаться к АСУ через второй COM-порт. Его может не быть в некоторых моделях!',
    'Unipos 2.0': 'Соединение терминала с кассовым оборудованием через ETH-кабель.',
}
// перечень используемых мобильных операторов
const mobileOperators = {
    10: 'Мегафон',
    11: 'МТС',
    12: 'Билайн',
    13: 'Теле2',
    14: 'A1 (Velcom)',
}
const mobOperNames = [
    'megafon',
    'mts',
    'beeline',
    'tele2',
    'velcom',
]
// варианты наличия/отсутсвия сканнера
const scannerPPay = {
    10: 'Используется',
    11: 'Не установлен',
}
// перечень используемых моделей терминалов
const termModels = {
    10: 'Ingenico ICT 250',
    11: 'VeriFone VX 520',
}
// типы заявок (для темы)
const taskType = {
    10: 'Замена (без в-та.)',
    11: 'Замена (с возвр.)',
    12: 'Возвр. (неиспр.)',
    13: 'Возвр. (растор.)',
}
// перечень элементов, выводимых как элементы select
const itemsSelectBlock = {
    10: termPacks,
    11: typeConnections,
    12: portUnipos,
    13: itemsNetwork,
    14: cabels,
    15: cards,
}
// имена для каждого пункта select group, важно сохранять позиционную связку
const typeNamesForSelect = [
    'term_pack',
    'connect_type',
    'unipos',
    'net_item',
    'cabels',
    'sim_cards',
]
// перечень элементов, выводимых как элементы radio
const itemsRadio = {
    10: taskType,
    11: termModels,
    12: scannerPPay,
}
// имена для поля name= в генерируемом блоке radio,
// нужно для корректного получения значения через метод .value в функции getRadioValue()
const typeNamesForRadio = [
    'task_type',
    'term_model',
    'scanner',
]

inputBlockCreator();
rDataFormCreator('input_rdata');