/***************************************************************************
 * [Node.js] import
 ***************************************************************************/
try{
    var crossman = require('@sj-js/crossman');
    var ready = crossman.ready,
        getEl = crossman.getEl,
        newEl = crossman.newEl,
        getData = crossman.getData,
        SjEvent = crossman.SjEvent
    ;
}catch(e){}



function MenuMan(el){
    var that = this;    

    this.menuBoardEl;
    this.menuBoards = {};
    this.menus = {};
    
    this.nowSelectedObjId = '';
    this.nowSelectedElement;
    this.isShown = false;

    this.theme;
    this.target;
    this.lastPosX;
    this.lastPosY;
    //Open ContextMenu By Mouse [Right Click]
    window.addEventListener('contextmenu', function(event){
        that.handleOpenContextMenu(event);
    });
    //Close ContextMenu By Mouse [Click]
    window.addEventListener('mousedown', function(event){
        that.handleCloseContextMenu(event);
    });
    //Close ContextMenu By Key [ESC]
    getEl(document).addEventListener('keydown', function(event){
        var keyCode = (event.keyCode) ? event.keyCode : event.which;
        if (keyCode == 27){ //[ESC] => Close Latest Index Pop
            that.handleCloseContextMenu(event);
        }
    });
}


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
MenuMan.prototype.addMenuBoard = function(name, conObj, menus){
    this.menuBoards[name] = {
        conObj:conObj,
        menus:menus
    };
    return this;
};
MenuMan.prototype.addMenu = function(id, html, func){
    this.menus[id] = {
        el: this.getNewMenuEl(id, html),
        func: func
    };
    return this;
};





MenuMan.prototype.handleOpenContextMenu = function(event){
    var that = this;
    var menuBoards = this.menuBoards;
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
    for (var nm in menuBoards){
        var menuBoard = menuBoards[nm];
        if (this.isMatch(this.target, menuBoard.conObj)){
            event.preventDefault();
            event.stopPropagation();
            this.nowSelectedElement = this.target;
            this.showMenuBoard(menuBoard.menus);
            return 
        }
    }    
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



MenuMan.prototype.showMenuBoard = function(menuList){
    var that = this;
    var menus = this.menus;
    if (this.isShown)
        that.handleCloseContextMenu();
    // Create MenuBoard Element
    if (!this.menuBoardEl){
        this.menuBoardEl = newEl('div').addClass('menuman-menu-board')
            .addEventListener('mousewheel', function(e){
                e.preventDefault();
                e.stopPropagation();
            })
            .returnElement();
    }
    var menuBoardEl = this.menuBoardEl;
    // Set Theme
    if (!this.theme)
        this.theme = "none";
    menuBoardEl.setAttribute('data-theme', this.theme);
    // Set Menus
    for (var i=0; i<menuList.length; i++){
        var menuNm = menuList[i];
        var menu = this.menus[menuNm];        
        getEl(menuBoardEl).add(menu.el);
    }
    // Set MenuBoard Style And Position
    if (menuBoardEl){
        // this.nowSelectedObjId = sjid;
        this.isShown = true;
        /*Web 적합*/
        menuBoardEl.style.display = 'block';
        menuBoardEl.style.position = 'absolute';
        menuBoardEl.style.left = this.lastPosX + 12 +'px';
        menuBoardEl.style.top = this.lastPosY + 2 +'px';        
        menuBoardEl.style.zIndex = getData().findHighestZIndex(['div']) +1;
        // console.debug(menuBoardEl.style.zIndex);
        getEl(document.body).add(menuBoardEl);
    }else{
        console.log('is not supported');
    }    
};

MenuMan.prototype.getNewMenuEl = function(id, html){
    var that = this;
    var menuElement = newEl('div').addClass('menuman-menu')
        .html(html)
        .addEventListener('mousedown', function(event){
            event.preventDefault();
            event.stopPropagation();
            // var sjid = this.nowSelectedObjId;
            // var obj = that.get(sjid);
            var nowSelectedElement = that.nowSelectedElement;
            console.log('nowSelectedElement', nowSelectedElement);
            that.handleCloseContextMenu();
            that.menus[id].func(nowSelectedElement);
        })
        .returnElement();
    return menuElement;
};

