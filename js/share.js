async function shareCV()
{
    const share_data = {
        title: 'CV Data',
        text: 'Mi CV',
        url: 'http://localhost/CV_PWA/index.html',
    };
    try {
        await navigator.share(share_data);
        console.log("CV compartido!");
    } catch (error) {
        console.error(error);
    }
}
document.getElementById("share").addEventListener("click", shareCV);