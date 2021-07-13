# MenuBoard

메뉴판을 구성합니다.  

#### ※ 표
종류 | Parameter Type | 특징
----|-----|-----
setTitle | String | 표시될 Label
setMenus | String... | Menu
setRunHandler | Function | 메뉴판 활성화시 Handler
setShowValidateHandler | Function | 메뉴판 표시여부 Handler
setElementMatchCondition | * | 메뉴판 활성화 조건 
setElementMatchSearchParentsLevel | Number | 메뉴판 활성화 조건확인을 위한 부모탐색 단계 
setPriority | Number | 메뉴판 활성화 우선순위



#### ※ 자동적용
- 편의를 위해서 예제에서는 다음 코드가 생략되어 있습니다.
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sj-js/menuman/dist/css/menuman.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/crossman/dist/js/crossman.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@sj-js/menuman/dist/js/menuman.min.js"></script>
    <script>
        var menuman = new MenuMan().setTheme('test-1');
    </script>
    ```

    *@* *+prefix* *x* *@*
    ```html
    <link rel="stylesheet" href="../menuman/menuman.css">
    <script src="../crossman/crossman.js"></script>
    <script src="../menuman/menuman.js"></script>
    <script>
        var menuman = new MenuMan().setTheme('test-1');
    </script>
    ```



## setMenus
- 박스에 들어갈 수 있는 객체의 수를 제한 할 수 있습니다.
    *@* *!* *@*
    ```html
    <script>
    </script>
    <body>
    </body>
    ```


## setRunHandler
- 박스에 들어갈 수 있는 객체의 수를 제한 할 수 있습니다.
    *@* *!* *@*
    ```html
    <body>
        <div class="test-style icon">Right Click - 1</div>
        <div id="test001" class="test-style">Right Click - 2</div>
    </body>
  
    <script>
        var menuman = new MenuMan().setTheme('test-1');

        menuman.addMenu(
            new MenuMan.Menu('menu-console').setTitle('console').setRunHandler(function(event){
                console.log('console ~');
            }),

            new MenuMan.Menu('menu-alert').setTitle('alert').setRunHandler(function(event){
                alert('alert ~');
            }),

            new MenuMan.Menu('menu-nothing').setTitle('nothing').setRunHandler(function(event){
                //none
            }),
        );
   
        menuman.addMenuBoard(
            new MenuMan.MenuBoard('board-a').setPriority(1).setMenus('menu-console', 'menu-alert').setElementMatchCondition([{'class':'*icon*'}]),
            new MenuMan.MenuBoard('board-b').setPriority(2).setMenus('menu-console', 'menu-alert', 'menu-nothing')
  
            new MenuMan.MenuBoard('board-b').setPriority(2).setMenus('menu-console', 'menu-alert', 'menu-nothing')
        );
    </script>
    ```



## setShowValidateHandler
- 특정 OBJ만 받아들입니다.
    *@* *!* *@*
    ```html
    <script>
    </script>
    <body>
    </body>
    ```



## setElementMatchCondition
- 특정 OBJ만 받아들입니다.
    *@* *!* *@*
    ```html
    <script>
    </script>
    <body>
    </body>
    ```



## setElementMatchSearchParentsLevel
- 특정 OBJ만 받아들입니다.
    *@* *!* *@*
    ```html
    <script>
    </script>
    <body>
    </body>
    ```



## setPriority
- 특정 OBJ만 받아들입니다.
    *@* *!* *@*
    ```html
    <script>
    </script>
    <body>
    </body>
    ```
