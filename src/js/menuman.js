/***************************************************************************
 * [Node.js] import
 ***************************************************************************/
try{
    var crossman = require('@sj-js/crossman');
    var ready = crossman.ready,
        getClazz = crossman.getClazz,
        getEl = crossman.getEl,
        newEl = crossman.newEl,
        getData = crossman.getData,
        SjEvent = crossman.SjEvent
    ;
}catch(e){}



/**************************************************
 *
 * MenuMan
 *
 **************************************************/
function MenuMan(el){
    SjEvent.apply(this, arguments);

    var that = this;    

    /** MenuBoard **/
    this.menuBoards = {};
    this.orderedMenuBoards = [];

    this.menuBoardEl;
    this.nowMenuBoard;
    this.nowSelectedObjId = '';
    this.nowSelectedElement;
    this.isShown = false;
    this.target;
    this.lastPosX;
    this.lastPosY;

    /** MenuB **/
    this.menus = {};

    /** Selection **/
    //TODO: Experimental - Selection
    this.nowSelectionText = '';
    this.lastSelectionText = '';

    /** Theme **/
    this.theme;

    /** Event **/
    //Event - Open ContextMenu By Mouse [Right Click]
    window.addEventListener('contextmenu', function(event){
        that.handleOpenContextMenu(event);
    });
    //Event - Close ContextMenu By Mouse [Click]
    window.addEventListener('mousedown', function(event){
        that.handleCloseContextMenu(event);
    });
    //Event - Close ContextMenu By Key [ESC]
    getEl(document).addEventListener('keydown', function(event){
        var keyCode = (event.keyCode) ? event.keyCode : event.which;
        if (keyCode == 27){ //[ESC] => Close Latest Index Pop
            that.handleCloseContextMenu(event);
        }
    });
    //Event - Selection
    getEl(document).addEventListener(['mouseup', 'keyup', 'selectionchagne'], function(event){
        that.handleGeneratedSelection();
    });
}
getClazz(MenuMan).extend(SjEvent);


MenuMan.EVENT_SELECTION = 'selection';
MenuMan.CLASS_DISABLED = 'disabled';
MenuMan.THEME_DEFAULT = 'none';

/***************************************************************************
 * [Node.js] exports
 ***************************************************************************/
try {
    module.exports = exports = MenuMan;
} catch (e) {}




MenuMan.prototype.setTheme = function(themeName){
    this.theme = themeName;
    return this;
};

MenuMan.prototype.add = function(item){
    if (arguments.length > 1){
        for (var i=0; i<arguments.length; i++){
            this.add(arguments[i]);
        }
        return;
    }
    if (item instanceof Array){
        for (var i=0; i<item.length; i++){
            this.add(item[i]);
        }
        return;
    }

    if (item instanceof MenuMan.Menu){
        this.addMenu(item)

    }else if (item instanceof MenuMan.MenuBoard){
        this.addMenuBoard(item)
    }
    return this;
};

MenuMan.prototype.addMenu = function(menu){
    if (arguments.length > 1){
        for (var i=0; i<arguments.length; i++){
            this.addMenu(arguments[i]);
        }
        return;
    }
    if (menu instanceof Array){
        for (var i=0; i<menu.length; i++){
            this.addMenu(menu[i]);
        }
        return;
    }

    menu.element = this.getNewMenuEl(menu.id, menu.title);
    this.menus[menu.id] = menu;
    return this;
};

MenuMan.prototype.addMenuBoard = function(menuBoard){
    if (arguments.length > 1){
        for (var i=0; i<arguments.length; i++){
            this.addMenuBoard(arguments[i]);
        }
        return;
    }
    if (menuBoard instanceof Array){
        for (var i=0; i<menuBoard.length; i++){
            this.addMenuBoard(menuBoard[i]);
        }
        return;
    }

    this.menuBoards[menuBoard.id] = menuBoard;
    this.orderedMenuBoards.push(menuBoard);
    this.orderMenuBoards();
    return this;
};




MenuMan.prototype.orderMenuBoards = function(){
    this.orderedMenuBoards.sort(function(a, b){
        return a.priority - b.priority
    }) ;
};


MenuMan.prototype.handleOpenContextMenu = function(event){
    var that = this;
    var menuBoards = this.menuBoards;
    var orderedMenuBoards = this.orderedMenuBoards;
    ///// Only Mouse Right
    if ((event.which && event.which==3) || (event.button && event.button==2)){
        // event.preventDefault();
        // event.stopPropagation();
    }else{
        return false;
    }     
    ///// Position
    this.setPos(event);
    ///// Condition Check
    for (var i=0; i<orderedMenuBoards.length; i++){
        var menuBoard = orderedMenuBoards[i];

        var elementMatchSearchParentsLevel = menuBoard.elementMatchSearchParentsLevel;
        var currentSearchLevel = -1;
        var currentElement = this.target
        while (++currentSearchLevel < elementMatchSearchParentsLevel){
            //- Check matched
            if (this.isMatch(currentElement, menuBoard.elementMatchCondition)){
                event.preventDefault();
                event.stopPropagation();
                this.nowSelectedElement = currentElement;

                //- Check validated menus
                var validatedMenus = this.getValidatedMenus(menuBoard);
                if (validatedMenus.length > 0){
                    //- Show menuBoard
                    this.showMenuBoard(menuBoard, validatedMenus);
                    return
                }
            }

            //- Search next
            currentElement = currentElement.parentNode
            if (currentElement.getAttribute == null)
                break;
        }
    }
};
MenuMan.prototype.getValidatedMenus = function(menuBoard){
    var validatedMenus = [];
    var menus = menuBoard.menus;
    for (var i=0, menuId, menu; i<menus.length; i++){
        menuId = menus[i];
        menu = this.menus[menuId];
        if (menu === null || menu === undefined)
            continue;

        if (menu.boardLoadValidateHandler){
            if (menu.boardLoadValidateHandler()){
                validatedMenus.push(menu);
            }
        }else{
            validatedMenus.push(menu);
        }
    }
    return validatedMenus;
};

MenuMan.prototype.handleCloseContextMenu = function(){
    if (this.isShown && this.menuBoardEl){        
        var menuBoardEl = this.menuBoardEl;
        while (menuBoardEl.firstChild){
            menuBoardEl.removeChild(menuBoardEl.firstChild);
        }
        menuBoardEl.style.zIndex = 0;
        menuBoardEl.style.display = 'none';
    }
    this.nowSelectedObjId = '';
    this.isShown = false;
};





MenuMan.prototype.setPos = function(event){
    this.target = event.target;
    this.lastPosX;
    this.lastPosY;
    /* Mobile Control */
    if (event.touches != undefined){
        this.lastPosX = event.touches[0].pageX;
        this.lastPosY = event.touches[0].pageY;
    /* Web Control */
    }else{
        // this.lastPosX = event.clientX + sjHelper.cross.getBodyScrollX();
        // this.lastPosY = event.clientY + sjHelper.cross.getBodyScrollY();
        this.lastPosX = event.clientX;
        this.lastPosY = event.clientY;
    }

    /* Mobile Control */
    if (event.touches != undefined){
        if (timerTime >= 3)
            event.preventDefault();
        this.target = event.touches[0].target;
    /* Web Control */
    }else{
        // event.preventDefault();
        this.target = event.target;
    }
};



MenuMan.prototype.isMatch = function(el, conObj){
    var isOk = false;    
    // isOk = getEl(el).find(conObj);
    // console.log ("find:", conObj, isOk);
    isOk = getEl(el).findDomAttribute(conObj);
    // console.log("findDomAttr:", conObj, isOk);
    return isOk;
};



MenuMan.prototype.showMenuBoard = function(menuBoard, validatedMenus){
    if (menuBoard.showValidateHandler && menuBoard.showValidateHandler()){
        return;
    }

    var that = this;

    if (this.isShown)
        that.handleCloseContextMenu();

    // Set Theme
    var theme = this.theme = ((this.theme) ? this.theme : MenuMan.THEME_DEFAULT)

    // Create MenuBoard Element
    this.nowMenuBoard = menuBoard;
    var menuBoardEl = this.menuBoardEl = ((this.menuBoardEl) ? this.menuBoardEl : this.generateMenuBoard());
    menuBoardEl.setAttribute('data-theme', theme);

    // Set Menus
    for (var i=0, validatedMenu, event; i<validatedMenus.length; i++){
        validatedMenu = validatedMenus[i];
        event = {
            target: this.nowSelectedElement,
            menu: validatedMenu,
            menuBoard: menuBoard
        };
        //Handler - disabled
        var modeDisabled = false;
        if (validatedMenu.disabledStateHandler){
            modeDisabled = validatedMenu.disabledStateHandler(event);
        }
        if (modeDisabled){
            getEl(validatedMenu.element).addClass(MenuMan.CLASS_DISABLED)
        }else{
            getEl(validatedMenu.element).removeClass(MenuMan.CLASS_DISABLED)
        }
        //Handler - load
        if (validatedMenu.boardLoadHandler){
            validatedMenu.boardLoadHandler(event);
        }
        getEl(menuBoardEl).add(validatedMenu.element);
    }

    // Set MenuBoard Style And Position
    this.makeUpMenuBoardStylePosition(menuBoardEl);

    if (menuBoard.runHandler){
        var event = {
            target: this.nowSelectedElement,
            menuBoard: menuBoard
        };
        menuBoard.runHandler(event);
    }
};

MenuMan.prototype.generateMenuBoard = function(){
    return newEl('div').addClass('menuman-menu-board')
        .addEventListener('mousewheel', function(e){
            e.preventDefault();
            e.stopPropagation();
        })
        .returnElement();
};

MenuMan.prototype.makeUpMenuBoardStylePosition = function(menuBoardEl){
    if (menuBoardEl){
        // this.nowSelectedObjId = sjid;
        this.isShown = true;
        /*Web 적합*/
        menuBoardEl.style.display = 'block';
        menuBoardEl.style.position = 'absolute';
        menuBoardEl.style.left = this.lastPosX + 12 +'px';
        menuBoardEl.style.top = this.lastPosY + 2 +'px';
        menuBoardEl.style.zIndex = getData().findHighestZIndex(['div']) +1;
        getEl(document.body).add(menuBoardEl);
    }else{
        console.log('is not supported');
    }
};

MenuMan.prototype.getNewMenuEl = function(id, html){
    var that = this;
    var menuElement = newEl('div').addClass('menuman-menu')
        .html(html)
        .addEventListener('mousedown', function(e){
            e.preventDefault();
            e.stopPropagation();

            var menu = that.menus[id];
            // var sjid = this.nowSelectedObjId;
            // var obj = that.get(sjid);

            if (getEl(menu.element).hasClass(MenuMan.CLASS_DISABLED))
                return;

            that.handleCloseContextMenu();
            var event = {
                target: that.nowSelectedElement,
                menu: menu,
                menuBoard: that.nowMenuBoard
            };
            if (menu.runHandler)
                menu.runHandler(event);
        })
        .returnElement();
    return menuElement;
};

MenuMan.prototype.handleGeneratedSelection = function(){
    var that = this;
    this.lastSelectionText = this.nowSelectionText;
    this.nowSelectionText = MenuMan.getSelectionText();
    var changed = this.lastSelectionText != this.nowSelectionText
    if (changed){
        // console.log("[Selected] " +this.nowSelectionText);
        this.execEventListenerByEventName(MenuMan.EVENT_SELECTION, {
            text:that.nowSelectionText,
            lastText:that.lastSelectionText
        });
    }
};

//TODO: Selection Test
MenuMan.getSelectionText = function(){
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ( (activeElTagName == "textarea") || (activeElTagName == "input" && /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) && (typeof activeEl.selectionStart == "number") ){
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    }else if (window.getSelection){
        text = window.getSelection().toString();
    }
    return text;
};

MenuMan.prototype.getSelectionText = function(){
    return this.nowSelectionText;
};




/**************************************************
 *
 * Menu
 *
 **************************************************/
MenuMan.Menu = function(data){
    this.id;
    this.title;
    this.disabledStateHandler;
    this.boardLoadValidateHandler;
    this.boardLoadHandler;
    this.runHandler;
    this.element;

    if (data){
        if (typeof data == 'string')
            this.id = data;
        // else if (data instanceof Object)
        //     this.init(data);
    }
}

MenuMan.Menu.prototype.setTitle = function(title){
    this.title = title;
    return this;
};

MenuMan.Menu.prototype.setDisabledStateHandler = function(handler){
    this.disabledStateHandler = handler;
    return this;
};
MenuMan.Menu.prototype.setBoardLoadValidateHandler = function(handler){
    this.boardLoadValidateHandler = handler;
    return this;
};
MenuMan.Menu.prototype.setBoardLoadHandler = function(handler){
    this.boardLoadHandler = handler;
    return this;
};
MenuMan.Menu.prototype.setRunHandler = function(handler){
    this.runHandler = handler;
    return this;
};





/**************************************************
 *
 * MenuBoard
 *
 **************************************************/
MenuMan.MenuBoard = function(data){
    this.id;
    this.title;
    this.showValidateHandler;
    this.runHandler;
    this.element;

    this.priority = MenuMan.MenuBoard.DEFAULT_PRIORITY;
    this.elementMatchCondition = MenuMan.MenuBoard.DEFAULT_MATCH_CONDITION;
    this.elementMatchSearchParentsLevel = MenuMan.MenuBoard.DEFAULT_MATCH_SEARCH_PARENTS_LEVEL;
    this.menus;

    if (data){
        if (typeof data == 'string')
            this.id = data;
        // else if (data instanceof Object)
        //     this.init(data);
    }
}

MenuMan.MenuBoard.DEFAULT_PRIORITY = 100;
MenuMan.MenuBoard.DEFAULT_MATCH_CONDITION = {};
MenuMan.MenuBoard.DEFAULT_MATCH_SEARCH_PARENTS_LEVEL = 1;


MenuMan.MenuBoard.prototype.setTitle = function(title){
    this.title = title;
    return this;
};
MenuMan.MenuBoard.prototype.setShowValidateHandler = function(handler){
    this.showValidateHandler = handler;
    return this;
};
MenuMan.MenuBoard.prototype.setRunHandler = function(handler){
    this.runHandler = handler;
    return this;
};

MenuMan.MenuBoard.prototype.setElementMatchCondition = function(elementMatchCondition){
    this.elementMatchCondition = elementMatchCondition;
    return this;
};
MenuMan.MenuBoard.prototype.setElementMatchSearchParentsLevel = function(elementMatchSearchParentsLevel){
    this.elementMatchSearchParentsLevel = elementMatchSearchParentsLevel;
    return this;
};
MenuMan.MenuBoard.prototype.setPriority = function(priority){
    this.priority = priority;
    return this;
};
MenuMan.MenuBoard.prototype.setMenus = function(menus){
    var correctMenus = [];
    if (arguments.length > 1){
        for (var i=0; i<arguments.length; i++){
            correctMenus.push(arguments[i])
        }

    }else if (menus instanceof Array){
        correctMenus = menus

    }else{
        if (typeof menus == 'string'){
            correctMenus = [menus]
        }else if (menus instanceof MenuMan.Menu){
            correctMenus = [menus.id]
        }
    }

    this.menus = correctMenus;
    return this;
};



