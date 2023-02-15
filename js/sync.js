async function syncOnConnection(){
    const registration = await navigator.serviceWorker.ready;
    try {
        /** Primero guardar datos en IndexedDB */
        /** Sincronizacion con nombre especifico */
        await registration.sync.register('sync-post');
        console.log("Registration success!");
    } catch (error) {
        console.error(error);
    }
}
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    let sync_button = document.getElementById("sync-check");
    sync_button.addEventListener("click", syncOnConnection);
}
else{
    console.log("Background Sync is not supported");
}