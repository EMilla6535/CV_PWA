async function clearBadge(){
    navigator.clearAppBadge();
}
const clr_badge = document.getElementById("clear-badge");
if ('setAppBadge' in navigator) {
    clr_badge.addEventListener("click", clearBadge);
}
else{
    console.log("SetAppBadge is not supported");
}