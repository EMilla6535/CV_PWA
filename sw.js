if('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('/sw/sw.js', {scope: '/../'}).then((registration) => {
        console.log('Service worker registration succeeded: ', registration);
    }, (error) => {
        console.log('Service worker registration failed: ${error}');
    });
} else{
    console.error('Service workers are not supported');
}