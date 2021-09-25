import { Error } from "./error";

export class Program {

    Load() {
        const element = document.querySelectorAll('script[type="ptml"]');
        if (element && element.length) {
            console.log(element[0].innerHTML.trim());
        } else {
            Error.Show('Required tag <script type="ptml"> not found');
        }
    }
};
