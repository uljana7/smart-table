import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach(elementName => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                .map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
        );
    });

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            // Находим кнопку, которая вызвала действие (action), ищем её родителя
            const clearBtn = action;
            const parent = clearBtn.parentElement;
            if (parent) {
                // Находим input с атрибутом data-field аналогично кнопке
                const input = parent.querySelector('input');
                if (input) {
                    input.value = '';
                    const field = clearBtn.dataset.field; // поле фильтрации
                    state[field] = '';                     // очищаем фильтр в состоянии
                }
            }
        }
        // @todo: #4.3 — настроить компаратор
        const compare = createComparison(defaultRules);

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}