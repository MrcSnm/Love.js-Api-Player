function callJS(funcToCall)
    local os = love.system.getOS()
    if(os == "Web") then
        print("callJavascriptFunction " .. funcToCall)
    end
end

function startTunnel()
    callJS("__getWebDB('" .. love.filesystem.getUserDirectory() .. "love');")
end
startTunnel()



-- This will call the print function 2 times,
--The first time will 
function retrieveJS(funcToCall)
    callJS("__storeWebDB(" .. funcToCall ..  ", 'FILE_DATA');")
    local gottenData = nil
    while(gottenData == nil) do
        gottenData = love.filesystem.read("__temp") --Reserved for webdb.callJS
    end
    return gottenData
end