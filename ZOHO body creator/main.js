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

            const tTypeInput = document.createElement('input');
            tTypeInput.setAttribute('type', 'radio');
            tTypeInput.setAttribute('id', typeNames[radioBlockStep]+'_'+rStep);
            tTypeInput.setAttribute('name', `${typeNames[radioBlockStep]}`);
            tTypeInput.setAttribute('value', itemsRadio[keysOfRadio[radioBlockStep]][keysOf[rStep]]);
            // эта строчка для проверки работоспособности элементов и возврата их значений
            // tTypeInput.setAttribute('OnClick', `getRadioValue('${nameType}');`);

            const taskLabel = document.createElement('label');
            taskLabel.setAttribute('for', typeNames[radioBlockStep]+'_'+rStep);
            taskLabel.innerHTML = '&nbsp; ' + itemsRadio[keysOfRadio[radioBlockStep]][keysOf[rStep]];

            taskRadItem.appendChild(tTypeInput);
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
        
        // 'net_item',
        // 'cabels',
        // 'term_pack',
        // 'sim_cards',
        let selectBlockName = document.createElement('div');
        if (typeNames[selectBlockStep] == 'net_item') {
            selectBlockName.innerHTML = 'Сетевые устройства';
        } else if (typeNames[selectBlockStep] == 'cabels') {
            selectBlockName.innerHTML = 'Кабели';
        } else if (typeNames[selectBlockStep] == 'term_pack') {
            selectBlockName.innerHTML = 'Комплектация терминала';
        } else if (typeNames[selectBlockStep] == 'sim_cards') {
            selectBlockName.innerHTML = 'SIM/SAM карты';
        }
        target.appendChild(selectBlockName);

        const selectBlock = document.createElement('select');
        selectBlock.setAttribute('class', 'select_group_block');
        selectBlock.setAttribute('name', typeNames[selectBlockStep]);

        // создаём блок select для выбора типа заявки
        // смотрим сколько типов заявок числится в списке и тянем их ключи
        let numOfElements = Object.keys(itemsSelectBlock[keyOfSelect[selectBlockStep]]).length;
        let keysOfElements = Object.keys(itemsSelectBlock[keyOfSelect[selectBlockStep]]);
        
        // проходим по всему количеству ключей для построения блока для каждого элемента
        for (let sStep = 0; sStep < numOfElements; sStep++) {
            // создаём элемент для внесения
            const curItem = document.createElement('option');
            // заполняем его тело
            curItem.innerHTML = keysOfElements[sStep];
            selectBlock.appendChild(curItem);
        }
        target.appendChild(selectBlock);
    }
}

function inputBlockCreator() {
    // получаем объект для внесения элементов и сбрасываем его предыдущее значение
    const body = document.getElementsByClassName('key_block')[0];
    body.innerHTML = '';
    // 
    radioCreator('key_block', typeNamesForRadio);
    selectCreator('key_block', typeNamesForSelect);
    // 
    // создаём элемент для записи всех CheckBox
    const chckBoxBlock = document.createElement('div');
    chckBoxBlock.setAttribute('class', 'check_blocks');

    // проверяем количество требующихся для построения блоков CheckBox
    // const numOfBlocks = Object.keys(itemsCheckBox).length;
    // for (let step = 0; step < numOfBlocks; step++){

    //     const currObjKey = Object.keys(itemsCheckBox)[step];
    //     const currObjLen = currObjKey.length;
    //     for (let substep = 0; substep < currObjLen; substep++){

    //     }
    // }
    // pass
}

function getRadioValue(name) {
    let tmp = document.querySelector('input[name='+name+']:checked').value;
    return tmp;
}

function generate(){
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

const mobileOperators = {
    00: '',
    10: 'Мегафон',
    11: 'МТС',
    12: 'Билайн',
    13: 'Теле2',
}

const termModels = {
    10: 'Ingenico ICT250',
    11: 'VeriFone VX520',
}

const taskType = {
    10: 'Замена',
    11: 'Возврат',
}

const itemsSelectBlock = {
    10: termPacks,
    11: itemsNetwork,
    12: cabels,
    13: cards,
}
const typeNamesForSelect = [
    'term_pack',
    'net_item',
    'cabels',
    'sim_cards',
]

const itemsRadio = {
    10: taskType,
    11: termModels,
}
const typeNamesForRadio = [
    'task_type',
    'term_model',
]

inputBlockCreator();