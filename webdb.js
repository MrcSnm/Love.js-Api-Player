/**
 * @author Marcelo Silva Nascimento Mancini
 * @github https://github.com/MrcSnm/Love.js-Api-Player
 */

//This line is needed for retrieving data from .lua
//Please remember that this is not a flexible API, it should be used with consolewrapper.js + love.js
//This will activate the web database for using in conjunction to .lua + love.js
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB; 
if(!window.indexedDB)
{
    alert("Please, update your browser to newer versions or you won't be able to save your game")
}

var __webDb = null;
function __getWebDB(dbName)
{
    return new Promise(function(resolve, reject)
    {
        if(__webDb != null)
        {
            return resolve();
        }
        let request = indexedDB.open(dbName);
        request.onerror = function()
        {
            console.error("Some error ocurred when trying to access web database '" + dbName + "'");
            reject();
        }
        //This webdb should not change version, so it will not add any field
        request.onupgradeneeded = function()
        {
            __webDb = request.result;
        }
        request.onblocked = function(ev)
        {
            console.error("Access to the web database were blocked, please refresh the page");
            reject();
        }
        request.onsuccess = function()
        {
            __webDb = request.result;
            resolve();
        }
    })
}

/**
 * This function must not be called manually
 * @param {any} val 
 */
function ___convertToUint8Array(val)
{
    val = String(val);
    let content = new Uint8Array(val.length);
    for(i = 0, len = val.length; i < len; i++)
    {
        content[i] = (val[i]).charCodeAt(0);
    }
    return content;
}

/**
 * This function must not be called manually
 * @param {any} value 
 */
function ___getLoveJSCompatibleObject(value)
{
    value = ___convertToUint8Array(value); //Content must be Uint8Array

    return {
        timestamp: new Date(),
        mode : 33152, //For some reason it is the mode used for when doing love.filesystem.write
        contents: value //Uint8Array
    }
}

function __storeWebDB(value, objStore)
{
    let lovejsCompatibleObject = ___getLoveJSCompatibleObject(value)

    let transaction = __webDb.transaction(objStore, "readwrite");
    let store = transaction.objectStore(objStore);
    let request = store.put(lovejsCompatibleObject, "__temp");
    request.onsuccess = function()
    {
        // console.log("'" + value + "' were succesfully added to __temp: " + request.result);
    }
    request.onerror = function()
    {
        console.error("Could not add the value '" + value + "' to __temp: " + request.error);
    }
}

function __unconvertFromUint8Array(arr)
{
    return String.fromCharCode(arr);
}

/**
 * Please use it only for debugging purposes
 * @param {String= "FILE_DATA"} objStore 
 */
function __readWebDB(objStore)
{
    objStore = (objStore == undefined) ? "FILE_DATA" : objStore;
    let transaction = __webDb.transaction(objStore, "readonly");
    let store = transaction.objectStore(objStore);
    let request = store.get("__temp");
    request.onsuccess = function()
    {
        console.log("Value gotten: " + __unconvertFromUint8Array(request.result.contents));
    }   
}