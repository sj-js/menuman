# Theme
각종 CSS 테마  
        
#### ※ 표
코드 | 특징
-----|--------|-----
default | 기본 테마  
test-1 | 테스트 테마


```html
<script>
    menuman.setTheme("test-1");
</script>
```

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
