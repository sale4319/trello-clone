export const ApiRoute = 'https://api.trello.com/';

export const Routes = {
    Boards: '/boards',
    Board: `/board/:boardId/:cardId?`, //Params defined for deep linking 
    // /board/:boardId/:listId?/:cardId?` **Can be used if deep link to list is necessary**
};