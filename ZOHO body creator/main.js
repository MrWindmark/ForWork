// блок ввода состоит из:
    // 0) базовый radio Возврат/Отправка с дефолтным Отправка
    // 1) блока checkbox с описанием каждого пункта (терм.комплект, мод.комп. и т.д.)
    // 2) блока ввода информации о получателе (Название компании, ФИО, телефон, адрес)
    // 3) блока ввода информации о ТО (подключения, Unipos, номер ТО
        // а) блок подключений состоит из блок radio с выбором подключений
        // б) блока checkbox для выбора сим-карт

function radioCreator(target_name, typeNames){
    const target = document.getElementsByClassName(target_name)[0];
    // обнуление не нужно, т.к. функция вызывается в нескольких местах
    // и пред.результаты нужно сохранять
    // target.innerHTML = '';

    let numOfRadio = Object.keys(itemsRadio).length;
    let keysOfRadio = Object.keys(itemsRadio);

    for(let radioBlockStep = 0; radioBlockStep < numOfRadio; radioBlockStep++){
        const divTaskType = document.createElement('div');
        divTaskType.setAttribute('class', 'radio_group');
        // создаём блок radio для выбора типа заявки
        // смотрим сколько типов заявок числится в списке и тянем их ключи
        let numOf = Object.keys(itemsRadio[keysOfRadio[radioBlockStep]]).length;
        let keysOf = Object.keys(itemsRadio[keysOfRadio[radioBlockStep]]);
        
        const itemName = document.createElement('p');
        if (typeNames[radioBlockStep] == 'task_type') {
            itemName.innerHTML = 'Тип отправки';
            divTaskType.appendChild(itemName);
        } else if (typeNames[radioBlockStep] == 'term_model') {
            itemName.innerHTML = 'Модель терминала';
            divTaskType.appendChild(itemName);
        }

        // проходим по всему количеству ключей для построения блока для каждого элемента
        for (let rStep = 0; rStep < numOf; rStep++) {
            const taskRadItem = document.createElement('div');
            taskRadItem.setAttribute('class', 'radio_item_block');

            const taskTypeInput = document.createElement('input');
            taskTypeInput.setAttribute('type', 'radio');
            taskTypeInput.setAttribute('id', typeNames[radioBlockStep]+'_'+rStep);
            taskTypeInput.setAttribute('name', `${typeNames[radioBlockStep]}`);
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
            taskLabel.setAttribute('for', typeNames[radioBlockStep]+'_'+rStep);
            taskLabel.innerHTML = '&nbsp; ' + itemsRadio[keysOfRadio[radioBlockStep]][keysOf[rStep]];

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
        let selectBlockName = document.createElement('div');
        if (typeNames[selectBlockStep] == 'net_item') {
            selectBlockName.innerHTML = 'Сетевые устройства';
        } else if (typeNames[selectBlockStep] == 'cabels') {
            selectBlockName.innerHTML = 'Кабели';
        } else if (typeNames[selectBlockStep] == 'term_pack') {
            selectBlockName.innerHTML = 'Комплектация терминала';
        } else if (typeNames[selectBlockStep] == 'sim_cards') {
            selectBlockName.innerHTML = 'SIM/SAM карты';
        } else if (typeNames[selectBlockStep] == 'connect_type') {
            selectBlockName.innerHTML = 'Тип подключения';
        } else if (typeNames[selectBlockStep] == 'unipos') {
            selectBlockName.innerHTML = 'Unipos';
        }
        
        // блок с нужным именем
        const targetSubBlock = document.createElement('div');
        targetSubBlock.setAttribute('class', `select_block`);
        targetSubBlock.setAttribute('id', `sb_${selectBlockStep}`);
        targetSubBlock.appendChild(selectBlockName);
        // создаём блок select для выбора типа заявки
        const selectBlock = document.createElement('select');
        selectBlock.setAttribute('class', 'select_option_block');
        selectBlock.setAttribute('name', typeNames[selectBlockStep]);

        // смотрим сколько типов select блоков числится в списке и тянем их ключи
        let numOfElements = Object.keys(itemsSelectBlock[keyOfSelect[selectBlockStep]]).length;
        let keysOfElements = Object.keys(itemsSelectBlock[keyOfSelect[selectBlockStep]]);
        
        // проходим по всему количеству ключей для построения блока для каждого элемента
        for (let sStep = 0; sStep < numOfElements; sStep++) {
            // создаём элемент для внесения в список select
            const curItem = document.createElement('option');
            // заполняем его тело
            curItem.innerHTML = keysOfElements[sStep];
            selectBlock.appendChild(curItem);
        }
        targetSubBlock.appendChild(selectBlock);
        target.appendChild(targetSubBlock);
    }
}

function checkCreator(target_name, objMapToCreation, namesOfObj, title) {
    const target = document.getElementsByClassName(target_name)[0];

    // создаём элемент для записи всех CheckBox
    const chckBoxBlock = document.createElement('div');
    chckBoxBlock.setAttribute('class', 'check_blocks');
    // создаём элемент заголовка
    const cBlockTitle = document.createElement('div');
    cBlockTitle.innerHTML = title;
    chckBoxBlock.appendChild(cBlockTitle);

    const cBoxMainBlock = document.createElement('div');
    cBoxMainBlock.setAttribute('class', 'check_list');

    const numOfCbox = Object.keys(objMapToCreation).length;
    const keyOfCbox = Object.keys(objMapToCreation);

    for (let checkBoxStep = 0; checkBoxStep < numOfCbox; checkBoxStep++){

        const cBoxPair = document.createElement('div');
        cBoxPair.setAttribute('class', 'check_pair');

        const chckBoxLabel = document.createElement('label');
        chckBoxLabel.setAttribute('for', namesOfObj[checkBoxStep]);
        chckBoxLabel.innerHTML = '&nbsp; ' + objMapToCreation[keyOfCbox[checkBoxStep]];

        const chkBoxTypeInput = document.createElement('input');
        chkBoxTypeInput.setAttribute('type', 'checkbox');
        chkBoxTypeInput.setAttribute('id', namesOfObj[checkBoxStep]);
        // chkBoxTypeInput.setAttribute('name', chkBoxTagName);

        cBoxPair.appendChild(chkBoxTypeInput);
        cBoxPair.appendChild(chckBoxLabel);
        cBoxMainBlock.appendChild(cBoxPair);
    }
    chckBoxBlock.appendChild(cBoxMainBlock);
    target.appendChild(chckBoxBlock);
}
// функция получения значения выбранного элемента radio
function getRadioValue(name) {
    const tmp = document.querySelector('input[name='+name+']:checked').value;
    return tmp;
}
// функция генерирования таблицы и темы для заявки в поле "table" тела страницы
function generate(){
    // pass
}
// функция вывода описания (значение в словарях) в поле "description" тела страницы
function drawDescription (){
    // pass
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
    checkCreator('key_block', mobileOperators, mobOperNames, 'SIM для подключений');

    // Создаём клавиши генерации и сброса формы
    const bBlock = document.createElement('div');
    bBlock.setAttribute('class', 'buttons_block');

    const buttonGenerate = document.createElement('button');
    buttonGenerate.setAttribute('onclick', 'generate(); return false;');
    buttonGenerate.setAttribute('class','button');
    buttonGenerate.setAttribute('type','button');
    buttonGenerate.innerHTML = 'Генерация';
    const buttonReset = document.createElement('button');
    buttonReset.setAttribute('class','button');
    buttonReset.setAttribute('type','reset');
    buttonReset.innerHTML ='Сброс';

    bBlock.appendChild(buttonGenerate);
    bBlock.appendChild(buttonReset);
    body.appendChild(bBlock);
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
    'БП роутера': '',
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

const itemsCheckBox = {
    10: mobileOperators,
}

const chkBoxNames = [
    mobOperNames,
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