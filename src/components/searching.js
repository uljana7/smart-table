export function initSearching(searchField) {
    /*const compare = createComparison(
        { skipEmptyTargetValues: true }, // правило, игнорировать пустые значения
        [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)]
    );*/

    return (query, state, action) => { // result заменили на query
        return state[searchField] ? Object.assign({}, query, { // проверяем, что в поле поиска было что-то введено
            search: state[searchField] // устанавливаем в query параметр
        }) : query; // если поле с поиском пустое, просто возвращаем query без изменений
    }
   }