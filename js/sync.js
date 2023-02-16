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

async function periodicSyncOnConnection(){
    const registration = await navigator.serviceWorker.ready;
    const status = await navigator.permissions.query({
        name: 'periodic-background-sync',
    });
    if (status.state !== 'granted') {
        console.log("Periodic Background Sync is not granted");
        return;
    }

    try {
        await registration.periodicSync.register('per-sync-check', {
            minInterval: 60 * 1000 * 2,
        });
        console.log("Periodic Sync Reg success!");
    } catch (error) {
        console.error(error);
    }
}
if ('serviceWorker' in navigator && 'PeriodicSyncManager' in window) {
    periodicSyncOnConnection();
} else {
    console.log("Periodic Sync is not supported");
}