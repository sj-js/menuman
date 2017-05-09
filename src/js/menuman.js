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

    window.addEventListener('contextmenu', function(event){
        that.handleOpenContextMenu(event);
    });
    window.addEventListener('mousedown', function(event){        
        that.handleCloseContextMenu(event);
    });
}
MenuMan.prototype.setTheme = function(themeStr){
    this.theme= themeStr;
    return this;
};
MenuMan.prototype.addMenuBoard = function(name, conObj, menus){
    this.menuBoards[name] = {
        conObj:conObj,
        menus:menus
    };
    return this;
};
MenuMan.prototype.addMenu = function(name, func){    
    this.menus[name] = {
        el: this.getNewMenuEl(name),
        func: func
    };
    return this;
};





MenuMan.prototype.handleOpenContextMenu = function(event){
    var that = this;
    var menuBoards = this.menuBoards;
    ///// Only Mouse Right
    if ((event.which && event.which==3) || (event.button && event.button==2)){
        event.preventDefault();
        event.stopPropagation();
    }else{
        return false;
    }     
    ///// Position
    this.setPos(event);
    ///// Condition Check
    for (var nm in menuBoards){
        var menuBoard = menuBoards[nm];
        if (this.isMatch(this.target, menuBoard.conObj)){            
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
    }else{
        /* Web Control */
        // this.lastPosX = event.clientX + sjHelper.cross.getBodyScrollX();
        // this.lastPosY = event.clientY + sjHelper.cross.getBodyScrollY();
        this.lastPosX = event.clientX;
        this.lastPosY = event.clientY;
    }
    
    /* Mobile Control */
    if (event.touches != undefined){
        if (timerTime >= 3) event.preventDefault();
        this.target = event.touches[0].target;
    }else{
        /* Web Control */
        event.preventDefault();
        this.target = event.target;
    }
};



MenuMan.prototype.isMatch = function(el, conObj){
    var isOk = false;    
    // isOk = getEl(el).find(conObj);
    // console.log ("find:", conObj, isOk);
    isOk = getEl(el).findDomAttribute(conObj);
    console.log ("findDomAttr:",conObj, isOk);
    return isOk;
};



MenuMan.prototype.showMenuBoard = function(menuList){
    var that = this;
    var menus = this.menus;
    if (this.isShown)
        that.handleCloseContextMenu();
    // Create MenuBoard Element
    if (!this.menuBoardEl)
        this.menuBoardEl = getNewEl('div', '', 'menuman-menu-board', {}, '');
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
        console.debug(menuBoardEl.style.zIndex);
        getEl(document.body).add(menuBoardEl);
    }else{
        console.log('is not supported');
    }    
};

MenuMan.prototype.getNewMenuEl = function(name){
    var that = this;
    var menuEl = getNewEl('div', '', 'menuman-menu', {}, name);
    menuEl.addEventListener('mousedown', function(event){
        event.preventDefault();
        event.stopPropagation();
        // var sjid = this.nowSelectedObjId;
        // var obj = that.get(sjid);        
        var nowSelectedElement = that.nowSelectedElement;
        that.handleCloseContextMenu();            
        that.menus[name].func(nowSelectedElement);        
    });    
    return menuEl;
};

