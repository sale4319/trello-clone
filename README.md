### Mandatory requirements: 
* Style the application​ in the spirit​ of the current Trello design :heavy_check_mark:
* It resembles the designs of the original app and it looks nice :heavy_check_mark:
* Main view can be a list or a kanban board or something entirely different :heavy_check_mark:
* Connect to Trello API :heavy_check_mark:
* CRUD operations for: Boards :heavy_check_mark:, Lists :heavy_check_mark:, Cards :heavy_check_mark:, Comments :heavy_check_mark:
* Moving cards between lists :heavy_check_mark:
* Should be deep-linkable: Boards :heavy_check_mark:, Lists :heavy_check_mark:, Cards :heavy_check_mark:
* URL scheme:heavy_check_mark: :
    * Boards: /boards
    * Board: /board/{boardId}
    * Lists: /board/{boardId}/{listId}, are always on board and there is no visible change when deep linking so I disconnected it, I left dead code as example
    * Cards: deepLinkListsConnected ? /board/{boardId}/{listId}/{cardId} : /board/{boardId}/{cardId}

### Optional requrements
* Moving lists on board :heavy_check_mark:
* Cards and lists persist new position :heavy_check_mark:
* Centralized state management :x:
* Unit tests :x:
* Deep-link to comment :x:
* User page :x:
* Sidebar :x:
* Your wildest dreams :boom:

## Happy coding!