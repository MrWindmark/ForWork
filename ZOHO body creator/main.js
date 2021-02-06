// блок ввода состоит из:
    // 0) базовый radio Возврат/Отправка с дефолтным Отправка
    // 1) блока checkbox с описанием каждого пункта (терм.комплект, мод.комп. и т.д.)
    // 2) блока ввода информации о получателе (Название компании, ФИО, телефон, адрес)
    // 3) блока ввода информации о ТО (подключения, Unipos, номер ТО
        // а) блок подключений состоит из блок radio с выбором подключений
        // б) блока checkbox для выбора сим-карт

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
        
        const itemName = document.createElement('p');
        if (typeNames[radioBlockStep] == 'task_type') {
            itemName.textContent = 'Тип отправки';
            divTaskType.appendChild(itemName);
        } else if (typeNames[radioBlockStep] == 'term_model') {
            itemName.textContent = 'Модель терминала';
            divTaskType.appendChild(itemName);
        }

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
            divTaskType.appendChild(taskRadItem);
        }
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
            selectBlockName.innerHTML = 'SIM/SAM карты';
            addBFlag = true;
        } 
        
        // блок с нужным именем
        const targetSubBlock = document.createElement('div');
        targetSubBlock.classList.add(`select_block`);
        targetSubBlock.id = typeNames[selectBlockStep];
        // targetSubBlock.id = `sb_${selectBlockStep}`;
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
function getRadioValue(name) {
    const tmp = document.querySelector(`input[name=${name}]:checked`).value;
    return tmp;
}
// функция получения значения выбранного элемента select
function getSelectValue(name) {
    const tmp = document.getElementById(`${name}`).value;
    return tmp;
}
// функция получения значения выбранного элемента select
function getChackValue(name) {
    // обращаемся 
    let checkboxes = document.getElementsByName(`${name}`);
    let checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].id);
        }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
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

    let text_blocks = document.getElementsByClassName('text_block');

    for (let i = 0; i < text_blocks.length; i++) {

    }

}

// функция генерирования таблицы и темы для заявки в поле "table" тела страницы
function generate(){
    // для теста функций получения значений
    let tmp = document.getElementsByClassName('description')[0];
    // let value = getSelValDiscription('connect_type', 'sb_1');
    // tmp.innerHTML = '';
    // tmp.innerHTML = value;
    // pass
    // alert(getRadioValue('task_type'));
    // alert(getRadioValue('term_model'));
    // alert(getChackValue('mob_oper'));
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
    checkCreator('key_block', mobileOperators, mobOperNames, 'mob_oper', 'SIM для подключений');

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

function rDataFormCreator(target_name) {
    const body = document.getElementsByClassName(`${target_name}`)[0];

    // название организации получателя
    const lblock = document.createElement('div');
    lblock.classList.add('text_block');
    lblock.classList.add('key_block');

    const company = document.createElement('input');
    company.classList.add('text_box');
    company.type = 'text';
    company.id = 'recvr_company';
    company.placeholder = 'ООО Компания ИНН 1234567890';

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
    // pass
}

const termPacks = {
    'Не требуется': 'Отправка не требуется',
    'Терм.комплект': 'Терминал, БП терминала и MagicBox либо SAM-карта',
    'Терминал': 'Терминал + MagicBox/SAM',
    'БП терминала': 'Блок питания + Кабель с вилкой',
}

const itemsNetwork = {
    'Не требуется': 'Отправка не требуется',
    'Модемный комплект': 'Модем ComWL, Антенна, БП модема, набор SIM',
    'Роутерный комплект': 'Роутер, БП роутера, Антенна с переходником, набор SIM',
    'Модем': 'ComWL + набор SIM',
    'БП модема': '',
    'Роутер': 'Роутер + набор SIM',
    'БП роутера': 'Требуется указание в примечании о том для какого роутера (штекер)',
    'Антенна модема': 'Стандартная антенна с разъёмом подключения к ComWL',
    'Антенна роутера': 'Антенна + переходник для подключения к роутеру',
}

const cabels = {
    'Не требуется': 'Отправка не требуется',
    'Патч-корд (ETH)': 'Кабель для подключения к роутеру. Стандартная длина 1,5 метра',
    'Пин-кабель ICT (COM)': 'Кабель для подключения терминала через СОМ-порт к ComWL',
    'Пин-кабель VX520 (COM)': 'Кабель для подключения терминала через СОМ-порт к ComWL',
    'MagicBox (2-ва COM)': 'Кабель-переходник для ICT 250 (EM). Имеет порты COM0, COM2 и ETH',
    'MagicBox (RS232)': 'Кабель-переходник для ICT 250 (GEM). Имеет порты RS232 и ETH',
    'Unipos (Com)': 'Кабель для подключения терминала к кассе по DB9 разъёму',
    'Unipos (USB)': 'Обычный USB кабель для соединения устройств, требуется наличия установленных драйверов на ПК',
}

 const cards = {
    'Не требуется': 'Отправка не требуется',
    'SAM': 'Модуль хранения ключей шифрования ПО. Без него не будут осуществляться транзакции',
    'SIM Мегафон': 'SIM-карта для обеспечения связи',
    'SIM МТС': 'SIM-карта для обеспечения связи',
    'SIM Билайн': 'SIM-карта для обеспечения связи',
    'SIM Теле2': 'SIM-карта для обеспечения связи',
 }

const typeConnections = {
    'Не требуется': 'Отправка не требуется',
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
// перечень используемых моделей терминалов
const termModels = {
    10: 'Ingenico ICT250',
    11: 'VeriFone VX520',
}
// типы заявок (для темы)
const taskType = {
    10: 'Замена',
    11: 'Возврат',
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
}
// имена для поля name= в генерируемом блоке radio,
// нужно для корректного получения значения через метод .value в функции getRadioValue()
const typeNamesForRadio = [
    'task_type',
    'term_model',
]

inputBlockCreator();
rDataFormCreator('input_rdata');