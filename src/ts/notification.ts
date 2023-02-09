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