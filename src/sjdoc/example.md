# Example
각종 예제  
        
        
        
```js
menuman.addMenuBoard('jelly-icon', [{'class':'*jelly*'}], ['icon-setup-runner', 'icon-enable', 'icon-disable', 'icon-delete']);
menuman.addMenu('icon-setup-runner', 'Setup Runner', function(element){
    popman.pop(JellySpeaker.PluginIconManager.POP_ICON_MANAGER_SETUP_RUNNER, function(data){

    });
});
menuman.addMenu('icon-enable', 'Enable', function(element){
    icon.setModeEnable(true);
});
menuman.addMenu('icon-disable', 'Disable', function(element){
    icon.setModeEnable(false);
});
menuman.addMenu('icon-delete', 'Delete', function(element){
    popman.confirm('Are you sure to delete icon?' +icon.title, function(){
        that.removeIcon(dbItem);
        return true;
    });
});
```