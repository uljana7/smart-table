import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    const compare = createComparison(
        { skipEmptyTargetValues: true }, // правило, игнорировать пустые значения
        [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)]
    );

    return (data, state, action) => {
        const searchValue = state[searchField];

        // Если поисковое поле пустое или не задано - возвращаем исходные данные
        if (!searchValue || !searchValue.trim()) {
        return data;
        }

        // Иначе — фильтруем данные по поисковому запросу
        return data.filter(row => compare(row, state));
    
    }
}