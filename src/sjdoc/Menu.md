# Menu

메뉴를 정의합니다.

#### ※ 표
종류 | Parameter Type | 특징
----|-----|-----
setTitle | String | 표시될 Label
setRunHandler | Function | (Void) Menu 실행시 Handler
setBoardLoadHandler | Function |(Void) MenuBoard 활성화시 Handler
setDisabledStateHandler | Function | (Return boolean) Disabled 상태
setBoardLoadValidateHandler | Function | (Return boolean) MenuBoard에 표시여부 Handler



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



## setRunHandler
- 박스에 들어갈 수 있는 객체의 수를 제한 할 수 있습니다.
    *@* *!* *@*
    ```html
    <body>
        <div 
            class="test-style icon" 
            style="display:inline-block; min-width:50px; height:30px; border:2px solid black; cursor:pointer; background:pink;"
        >
            Right Click - 1
        </div>
        <div 
            id="test001" 
            class="test-style"
            style="display:inline-block; min-width:50px; height:30px; border:2px solid black; cursor:pointer; background:pink;""
        >
            Right Click - 2
        </div>
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
            new MenuMan.MenuBoard('board-b').setPriority(2).setMenus('menu-console', 'menu-alert', 'menu-nothing'),
  
            new MenuMan.MenuBoard('board-b').setPriority(2).setMenus('menu-console', 'menu-alert', 'menu-nothing')
        );
    </script>
    ```

## setBoardLoadHandler
- 특정 BOX로부터의 OBJ만 받아들입니다.
    *@* *!* *@*
    ```html
    <script>
    </script>
    <body>
    </body>
    ```



## setDisabledStateHandler
- 특정 OBJ만 받아들입니다.
    *@* *!* *@*
    ```html
    <script>
    </script>
    <body>
    </body>
    ```

## setBoardLoadValidateHandler
- 특정 OBJ만 받아들입니다.
    *@* *!* *@*
    ```html
    <script>
    </script>
    <body>
    </body>
    ```
