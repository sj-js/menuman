# menuman


# 1. 컨텍스트 메뉴 

### 1) 등록



```js

menuMan.addMenu('1', function(){ alert(1); })
		.addMenu('2', function(){ alert(2); })
		.addMenu('3', function(){ alert(3); })
		.addMenu('4', function(){ alert(4); })
		.addMenu('5', function(){ alert(5); })
		.addMenu('6', function(){ alert(6); })
		.addMenuBoard('hi1', {"limit":"1"}, ['1','2','3'])
		.addMenuBoard('hi2', {"reject-list":"tmp1"}, ['2','3'])
		.addMenuBoard('hi3', {"type":"1"}, ['2','3','5','6'])
		// .setTheme('hi')
		;

```
