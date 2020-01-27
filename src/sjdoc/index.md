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
   menuman.addMenu();
   menuman.addMenu('MENU_ID_1', 'MENU_LABEL', function(element){
       //SOMETHING TO DO
   });
   menuman.addMenu('MENU_ID_2', 'MENU_LABEL', function(element){
      //SOMETHING TO DO 
   });
   ```
   
3. .addMenuBoard(ID, CONDITION, MENU_ID_LIST)    
   ```js
   menuman.addMenuBoard('BOARD_ID_1', {'id':'icon-*'}, ['MENU_ID_1', 'MENU_ID_2']);
   ```
   
4. 👨‍💻
    *@* *!* *@*
    ```html
    <style>
        .test-style { display:inline-block; min-width:50px; height:30px; border:2px solid black; cursor:pointer; background:pink; }
    </style>
  
    <body>
        <div class="test-style icon">Right Click - 1</div>
        <div class="test-style icon">Right Click - 2</div>
        <div id="test001" class="test-style">Right Click - 3</div>
        <div id="test002" class="test-style">Right Click - 4</div>
    </body>
  
    <script>
        menuman.setTheme('test-1');      
        menuman.addMenu('menu-console', 'Console', function(element){
            console.log('Hello  ' + element.innerHTML); 
        });
        menuman.addMenu('menu-alert', 'Alert', function(element){
            alert('Hello  ' + element.innerHTML);
        });
        menuman.addMenu('menu-nothing', 'Nothing', function(element){
            //None
        });
        menuman.addMenu('menu-1', 'Print', function(element){
            console.log('Print', element);
        });
        menuman.addMenuBoard('board-a', [{'class':'*icon*'}], ['menu-console', 'menu-alert']);
        menuman.addMenuBoard('board-b', [{'id':'test001'}], ['menu-nothing']);
        menuman.addMenuBoard('board-c', [{'id':'*02'}], ['menu-1']);
    </script>
    ```
