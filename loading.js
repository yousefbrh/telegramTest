//Lock Scaling/Zooming
document.getElementsByTagName("head")[0].innerHTML += '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">';
document.getElementsByTagName("head")[0].innerHTML += '<meta name="HandheldFriendly" content="true" />';

document.addEventListener("gesturestart", function (e)
{
  e.preventDefault();
});

document.addEventListener("gesturechange", function (e)
{
  e.preventDefault();
});
document.addEventListener("gestureend", function (e)
{
  e.preventDefault();
});

var container = document.querySelector("#game-container");
var canvas = document.querySelector("#game-canvas");
var loadingBar = document.querySelector("#loading-view");
var progressBarFull = document.querySelector(".loading-progress-bar");
var drawing = document.querySelector("#drawing");

var buildUrl = "Build";
var loaderUrl = buildUrl + "/53.loader.js";
var config = {
dataUrl: buildUrl + "/53.data",
frameworkUrl: buildUrl + "/53.framework.js",
codeUrl: buildUrl + "/53.wasm",
streamingAssetsUrl: "StreamingAssets",
companyName: "Inex",
productName: "Math Lava",
productVersion: "0.1",
};

//Mobile
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) 
{
var meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
document.getElementsByTagName('head')[0].appendChild(meta);

container.className = "unity-mobile";

canvas.style.width = "100%";
canvas.style.height = "100%";
config.devicePixelRatio = 2
//Resize window when chage orentation
window.addEventListener("orientationchange", event =>
{
  canvas.style.width = "100%";
  canvas.style.height = "100%";
});
} 
//PC
else 
{
canvas.style.width = "100%";
canvas.style.height = "100%";
}

loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
createUnityInstance(canvas, config, (progress) => {
  progressBarFull.style.width = 100 * progress + "%";
}).then((unityInstance) => {
  window.unityInstance = unityInstance;
  
  loadingBar.style.display = "none";
  drawing.style.display = "none";
  document.getElementById("float-overlay").style.display = "block";
}).catch((message) => {
  alert(message);
});
};
document.body.appendChild(script);
