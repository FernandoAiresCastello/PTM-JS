
export class ErrorScreen {

    static show(message: string) {
        message = `[PTM] ${message}`;
        console.error(message);
        message = message.replace(/\</g,"&lt;").replace(/\>/g,"&gt;")
        const body = document.getElementsByTagName('body')[0];
        body.style.background = '#f00';
        body.style.color = '#fff';
        body.style.fontWeight = 'bold';
        body.innerHTML = `<div>${message}</div>`;
    }
}
