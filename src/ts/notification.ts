class CustomNotification {
    private element: HTMLDivElement;
    constructor (icon: string, text: string, ttl: number) {
        this.element = document.createElement("div");
        this.element.id = "notification";
        document.body.appendChild(this.element);

        let elementText = document.createElement("p");
        elementText.innerHTML = `<i data-feather="${icon}">`;
        elementText.innerHTML += text;
        this.element.appendChild(elementText);

        this.showNotification(ttl);

    }
    private wait(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    private async showNotification(ttl: number) {
        this.element = document.body.appendChild(this.element);
        // @ts-ignore
        feather.replace();

        this.element.classList.add('show');
        await this.wait(ttl);
        this.element.remove();
    }
}

function customAlert(text: string, title?:string, icon?:string) {
    const alert = document.createElement("div");
    alert.id = "alert";

    const alertIcon = document.createElement('i');
    alertIcon.setAttribute("data-feather", icon || "alert-circle");

    const alertTitle = document.createElement('h1');
    alertTitle.innerText = title || "Alert";

    const alertText = document.createElement('span');
    alertText.innerText = text;

    const alertButton = document.createElement('button');
    alertButton.id = "alert-ok";
    alertButton.innerText = "OK";
    alertButton.addEventListener('click', () => document.querySelector('#alert').remove());

    alert.append(alertIcon, alertTitle, alertText, alertButton);
    document.body.appendChild(alert);
    // @ts-ignore
    feather.replace();
}

class CustomAlert {
    private element: HTMLDivElement;
    constructor (text: string, title?:string, icon?:string) {
        this.element = document.createElement("div");
        this.element.id = "alert";
    
        const alertIcon = document.createElement('i');
        alertIcon.setAttribute("data-feather", icon || "alert-circle");
    
        const alertTitle = document.createElement('h1');
        alertTitle.innerText = title || "Alert";
    
        const alertText = document.createElement('span');
        alertText.innerText = text;
    
        const alertButton = document.createElement('button');
        alertButton.id = "alert-ok";
        alertButton.innerText = "OK";
        alertButton.addEventListener('click', () => document.querySelector('#alert').remove());
    
        this.element.append(alertIcon, alertTitle, alertText, alertButton);
        document.body.appendChild(this.element);
        // @ts-ignore
        feather.replace();
    }
}