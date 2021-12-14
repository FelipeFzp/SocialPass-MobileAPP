export class WebClipboard {

    public static async copy(text: string): Promise<boolean> {
        const input = document.createElement('textarea');

        input.style.top = "0";
        input.style.left = "0";
        input.style.position = "fixed";
        input.style.width = '2em';
        input.style.height = '2em';
        input.style.padding = '0';
        input.style.border = 'none';
        input.style.outline = 'none';
        input.style.boxShadow = 'none';
        input.style.background = 'transparent';

        input.value = text;

        document.body.appendChild(input);

        input.focus();
        input.select();
        input.setSelectionRange(0, 99999);

        let result = document.execCommand('copy');
        document.body.removeChild(input);

        if(!result)
            await navigator['clipboard']?.writeText(text);

        return result;
    }
}