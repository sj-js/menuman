# menuman
- 쉽게 Context Menu를 구성할 수 있다.

    [![Build Status](https://travis-ci.org/sj-js/menuman.svg?branch=master)](https://travis-ci.org/sj-js/menuman)
    [![All Download](https://img.shields.io/github/downloads/sj-js/menuman/total.svg)](https://github.com/sj-js/menuman/releases)
    [![Release](https://img.shields.io/github/release/sj-js/menuman.svg)](https://github.com/sj-js/menuman/releases)
    [![License](https://img.shields.io/github/license/sj-js/menuman.svg)](https://github.com/sj-js/menuman/releases)

    https://github.com/sj-js/menuman
    
      
        
## Index
*@* **order** *@*
```
- menuman
- Theme
- Example
```


## 1. Getting Started

### 1-1. How to use

1. Load library and new instance
    ```html
    <script src="https://cdn.jsdelivr.net/gh/sj-js/crossman/dist/js/crossman.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/sj-js/fixman/dist/js/menuman.js"></script>
    <script>
         var menuman = new MenuMan();
    </script>
    ```  
    OR in ES6+
    ```js
    const MenuMan = require('@sj-js/menuman');
    const menuman = new MenuMan();
    ```
   
2. addMenu   
   ```html
   menuman.addMenu();
   menuman.addMenu('MENU_ID_1', 'MENU_LABEL', function(element){
       //SOMETHING TO DO
   });
   menuman.addMenu('MENU_ID_2', 'MENU_LABEL', function(element){
      //SOMETHING TO DO 
   });
   ```
   
3. addMenuBoard    
   ```js
   menuman.addMenuBoard('BOARD_ID_1', {'id':'icon-*'}, ['MENU_ID_1', 'MENU_ID_2']);
   ```



### 1-2. Simple Example
- For convenience, the following code, which loads and creates a Library in the example, is omitted.
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sj-js/menuman/dist/css/menuman.css">
    <script src="https://cdn.jsdelivr.net/gh/sj-js/crossman/dist/js/crossman.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/sj-js/menuman/dist/js/menuman.js"></script>
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

##### Sample A
- Example)
    *@* *!* *@*
    ```html
    <style>
        .test-style { display:inline-block; min-width:50px; height:30px; border:2px solid black; cursor:pointer; background:pink; }
    </style>
  
    <body>
        <div class="test-style icon">Hello Top</div>
        <div class="test-style icon">Hello Top</div>
        <div id="test001" class="test-style">Hello Top</div>
        <div id="test002" class="test-style">Hello Top</div>
    </body>
  
    <script>
        menuman.setTheme('test-2');      
        menuman.addMenu('menu-console', 'Console', function(element){
            console.log('hello', element); 
        });
        menuman.addMenu('menu-alert', 'Alert', function(element){
            alert('hello');
            console.error(element);
        });
        menuman.addMenu('menu-nothing', 'Nothing', function(element){
            //None
            console.error(element);
        });
        menuman.addMenu('menu-1', 'Print', function(element){
            console.error(element);
        });
        menuman.addMenuBoard('board-a', [{'class':'*icon*'}], ['menu-console', 'menu-alert']);
        menuman.addMenuBoard('board-b', [{'id':'test001'}], ['menu-nothing']);
        menuman.addMenuBoard('board-c', [{'id':'*02'}], ['menu-1']);
    </script>
    ``` 
