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
