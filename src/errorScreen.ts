
export class ErrorScreen {

    static show(message: string) {
        message = `PTM >> ${message}`;
        console.error(message);
        message = message.replace(/\</g,"&lt;").replace(/\>/g,"&gt;")
        document.body.style.background = '#f00';
        document.body.style.color = '#fff';
        document.body.style.fontWeight = 'bold';
        document.body.innerHTML = `<div>${message}</div>`;
    }
}
