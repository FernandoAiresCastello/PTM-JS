/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    main.js

=============================================================================*/
$(document).ready(() => Main());

let PTM;

function Main() {
    PTM = new Machine();
    new Test().Run();
}
