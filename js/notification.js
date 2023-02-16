async function clearBadge(){
    navigator.clearAppBadge();
    navigator.serviceWorker.controller.postMessage({
        type: 'CLEAR_BADGE',
    });
    /** Enviar mensaje a service worker para reiniciar contador de notificaciones */
}
const clr_badge = document.getElementById("clear-badge");
if ('setAppBadge' in navigator) {
    clr_badge.addEventListener("click", clearBadge);
}
else{
    console.log("SetAppBadge is not supported");
}

/** Push Notifications */
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

navigator.serviceWorker.ready.then((registration) => {
    return registration.pushManager.getSubscription().then((subscription) => {
        if(subscription){
            return subscription;
        }
        const vapid_public_key = "BPO3YYmVyNpt-aIhEyqiGHOfXyJi1DgViYjDfdTv2gxqROTLYjEBpW2ohPqZBUWf2Llo0OyEdTShVmMGPUrkR-I";
        return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapid_public_key)
        });
    });
});