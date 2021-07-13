# MenuMan
## 📃
[![Build Status](https://travis-ci.org/sj-js/menuman.svg?branch=master)](https://travis-ci.org/sj-js/menuman)
[![All Download](https://img.shields.io/github/downloads/sj-js/menuman/total.svg)](https://github.com/sj-js/menuman/releases)
[![Release](https://img.shields.io/github/release/sj-js/menuman.svg)](https://github.com/sj-js/menuman/releases)
[![License](https://img.shields.io/github/license/sj-js/menuman.svg)](https://github.com/sj-js/menuman/releases)

- 쉽게 Context Menu를 구성할 수 있다.
- `Menu`와 이를 조건별로 담을 수 있는 `MenuBoard`로 나뉩니다.
- ✨ Source: https://github.com/sj-js/menuman
- ✨ Document: https://sj-js.github.io/sj-js/menuman
    
      
        
## Index
*@* **order** *@*
```
- MenuMan
- Menu
- MenuBoard
- Theme
- Example
```


## 1. Getting Started

### 1-1. How to load?
- Browser
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sj-js/menuman/dist/css/menuman.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/crossman/dist/js/crossman.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/menuman/dist/js/menuman.min.js"></script>
    <script>
         var menuman = new MenuMan();
    </script>
    ```
    *@* *+prefix* *x* *@* 
    ```html
    <link rel="stylesheet" href="../menuman/menuman.css">
    <script src="../crossman/crossman.js"></script>
    <script src="../menuman/menuman.js"></script>
    <script>
        var menuman = new MenuMan();
    </script>
    ```  
- ES6+
    ```bash
    npm install @sj-js/menuman
    ```
    ```js
    require('@sj-js/menuman/dist/css/menuman.css');
    const MenuMan = require('@sj-js/menuman');
    const menuman = new MenuMan();
    ```



### 1-2. Simple Example
For convenience, 1-1 code, which loads and creates a Library in the example, is omitted.

### Example A
1. .setTheme(CODE)
    ```js
    menuman.setTheme('default');
    ```   
   
2. .addMenu(ID, LABEL, EVENT)   
   ```js
   menuman.addMenu(
            new MenuMan.Menu('menu-test-console').setTitle('Test console')
                .setRunHandler(function(event){
                    //SOMETHING TO DO
                    console.log('console ~');
                }),
            new MenuMan.Menu('menu-test-alert').setTitle('Test alert')
                .setRunHandler(function(event){
                    //SOMETHING TO DO
                    alert('alert ~');
                })
   );
   ```
   
3. .addMenuBoard(ID, CONDITION, MENU_ID_LIST)    
   ```js
   menuman.addMenuBoard('BOARD_ID_1', {'id':'icon-*'}, ['MENU_ID_1', 'MENU_ID_2']);
   ```
   
4. 👨‍💻
    *@* *!* *@*
    ```html
    <style>
        .test-style { 
            display:inline-block; min-width:50px; height:30px; border:2px solid black; cursor:pointer; background:pink;
            -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none; 
        }
    </style>
  
    <body>
        <div class="test-style icon">Right Click - 1</div>
        <div class="test-style icon">Right Click - 2</div>
        <div id="test001" class="test-style">Right Click - 3</div>
        <div id="test002" class="test-style">Right Click - 4</div>
    </body>
  
    <script>
        var menuman = new MenuMan();

        menuman.setTheme('test-1');

        menuman.addMenu(
            new MenuMan.Menu('menu-console').setTitle('console')
                .setRunHandler(function(event){
                    console.log('console ~');
                }),

            new MenuMan.Menu('menu-alert').setTitle('alert')
                .setRunHandler(function(event){
                    alert('alert ~');
                }),

            new MenuMan.Menu('menu-nothing').setTitle('nothing')
                .setRunHandler(function(event){
                    //none
                }),

            new MenuMan.Menu('menu-sometimes-disabled').setTitle('some-time disabled')
                .setDisabledStateHandler(function(event){
                    return !!(new Date().getTime() % 2)
                })
                .setRunHandler(function(event){
                    alert("You are lucky :D");
                }),

            new MenuMan.Menu('menu-sometimes-show').setTitle('some-time show')
                .setBoardLoadValidateHandler(function(event){
                    return !!(new Date().getTime() % 2)
                })
                .setRunHandler(function(event){
                    alert("You are lucky :D");
                }),

            new MenuMan.Menu('menu-search').setTitle('search something')
                .setBoardLoadValidateHandler(function(event){
                    console.log("[Check selection-text]", menuman.getSelectionText());
                    return menuman.getSelectionText() != '';
                })
                .setBoardLoadHandler(function(event){
                    var text = menuman.getSelectionText();
                    text = (text.length < 20) ? text : (text.substring(0,17) + "...");
                    event.menu.element.innerHTML = ('🔍 search \'' +text+ '\'');
                })
                .setRunHandler(function(event){
                    //none
                    alert("Faield to search '"+menuman.getSelectionText()+"'. \nIt is not yet implemented.")
                }),
        );
   
        menuman.addMenuBoard(
            new MenuMan.MenuBoard('board-a').setMenus('menu-console', 'menu-alert').setElementMatchCondition([{'class':'*icon*'}]),
            new MenuMan.MenuBoard('board-b').setMenus('menu-nothing').setElementMatchCondition([{'id':'test001'}]),
            new MenuMan.MenuBoard('board-c').setMenus('menu-non-exsits').setElementMatchCondition([{'id':'*02'}]),
            new MenuMan.MenuBoard('first_ctx').setPriority(101).setMenus('menu-sometimes-show'),
            new MenuMan.MenuBoard('second_ctx').setPriority(102).setMenus('menu-search', 'menu-alert', 'menu-sometimes-show', 'menu-sometimes-disabled'),
        );
    </script>
    ```
