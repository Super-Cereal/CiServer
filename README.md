# CI Server

Серверная часть CI Сервера предоставляет доступ к апи, связывающее фронтенд и бэкенд. Приложение написано на `Node.js v16.3.0`.

У апи есть несколько ручек, работающие с `json`,
при получении ответа с бэкенда, они возвращают статус запроса и обьект `data`.

## Настройки репозитория

**GET** `/api/settings` получение сохраненных настроек

**POST** `/api/settings` cохранение настроек

> Тело запроса:
>
> 1. **repoName**: ссылка на репозиторий
> 2. **buildCommand**: команда для билда
> 3. **mainBranch**: главная ветка репозитория
> 4. **period**: частота синхронизации (в минутах)
>
> В момент сохранения настроек происходит клонирование репозитория с помощью [дочернего процесса git](https://github.com/Super-Cereal/CiServer/blob/master/src/utils/childProcesses/gitCloneRepo.js). Клонируется только **.git** папка,
> хранится она в папке [data/Repository](https://github.com/Super-Cereal/CiServer/tree/master/data)
>
> (Однако если отправлять этот запрос один за другим, когда первый репозиторий еще не загрузился, то возникают ошибки, не понимаю как это исправить. Я думаю необходимо что-то на подобии `switchMap` из `RxJs`, но не знаю с чего начать реализацию этой идеи)

**DELETE** `/api/settings` удаление настроек

> Удаляется так же локальная копия репозитория с помощью [утилит fs](https://github.com/Super-Cereal/CiServer/blob/master/src/utils/deleteSavedStructures.js)

## Сборки

**GET** `/api/build` получение списка всех сборок

**GET** `/api/build/:buildId` получение информации о конкретной сборке

**GET** `/api/build/:buildId/logs` получение логов билда (сплошной текст)

> Тк. это дорогая операция для бэкенда, то запросы [кэшируются](https://github.com/Super-Cereal/CiServer/blob/master/src/utils/cacheBuildLogs.js), так же есть инвалидация кэша - спустя 32 часа кэш удаляется.

**POST** `/api/build/:commitHash` добавление сборки в очередь

> Делается запрос по адресу бэкенда `/api/build/request`,
> все данные о коммите получаются с помощью [дочерних процессов git](https://github.com/Super-Cereal/CiServer/blob/master/src/utils/childProcesses/gitGetCommitData.js)
