# Love.js-Api-Player
Created as a binder between love.js and javascript, it is made to be able to call javascript functions from lua code

# How it works
- It wraps the window.console logging function, and it eval's the string passed as a JS function, it still mantains the correct functionality from the old console, unless passing the key string to it, it will not log into the devtools console, as it should just execute it
- **BEWARE**: There are some sites that doesn't let you wrap their console, if you're not able doing, the API won't work

# How to
- Download js.lua file
- Add the following lua function to your main.lua
```lua
require 'js'
```
- Convert your project to [love.js](https://github.com/TannerRogalsky/love.js), all thanks to TannerRogalsky
- Add the **`<script src = "consolewrapper.js"></script>`** to the index.html file created by the love.js conversion
- After that, for a simple JS call, where you don't expect any return value, call:
```lua
JS.callJS('kongregate.stats.submit("Score", 1000);')
```
- However, if you do wish to retrieve the value from the JS Api Call, it is a bit more complicated, you will need to use the full extent of js.lua:

## Setting up for data retrieve

1. After importing js.lua file, call `JS.newRequest(strApiToCallInJS, closureOnSuccess)`
    1. **strApiToCallInJS**: a string of the api you want to call
    2. **closureOnSuccess**: A function to call when the data arrives
2. For retrieving your data, you must set it as a closure, kongregate has one api for getting the player username: kongregate is: kongregate.services.getUsername(), so let's try showing how we can get the data:
```lua
gUsername = ""
JS.newRequest('kongregate.services.getUsername()', 
function(data)
    gUsername = data
end)
```
3. This will make the request active, and it will store in the indexed database, for actually completing the request, you must understand if you want it to be sync our assync, in this example, I'm going to show the sync one:
    1. In **love.update**, make it the first line:
    ```lua
    if(retrieveData(dt)) then
        return
    end
    ```
    2. This function will return wether if it is still trying to retrieve or not, so, returning will make the game don't update
    3. After that, you're set up for using the lib

4. ### EXTRA
    1. In lib, it is available too some error handlers, those error occurs only when the retrieveData nevers return, the default value for timeout is 2, but you can change it at your taste
    2. `JS.newRequest` accepts 3 more parameters, the full definition is: `JS.newRequest(funcToCall, onDataLoaded, onError, timeout, optionalId)`, onError is a function that receives the requestID, timeout is a custom parameter for setting if you want to have increased or decreased timeout value, the optionalId is called optional because it will be setup as an incrementing number, but if you want, you can pass a string value for identifying errors
    3. There is another function called `JS.setDefaultErrorFunction`, by setting it up, when your retrieveData returns an error, the function set on the defaultError will be called, there is one already that prints the id of the request if the debug is active


# Working Example
- Here is the probably first ever love2d-kongregate integrated game: https://www.kongregate.com/games/MrcSnm/industrial-flying-creature
