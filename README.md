# Love.js-Api-Player
Created as a binder between love.js and javascript, it is made to be able to call javascript functions from lua code

# How it works
- It wraps the window.console logging function, and it eval's the string passed as a JS function, it still mantains the correct functionality from the old console, unless passing the key string to it, it will not log into the devtools console, as it should just execute it

# How to
- Add the following lua function to your main.lua
```lua
function callJS(funcToCall)
    print("callJavascriptFunction " .. funcToCall)
end
```
- Convert your project to [love.js](https://github.com/TannerRogalsky/love.js), all thanks to TannerRogalsky
- Add the <script src = "consolewrapper.js"></script> to the index.html file created by the love.js conversion

# Working Example
- Here is the probably first ever love2d-kongregate integrated game: https://www.kongregate.com/games/MrcSnm/industrial-flying-creature
