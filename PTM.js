/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

=============================================================================*/
$(document).ready(() => Main());

function Main() {
    const display = new Display();
    display.DrawTile('@', '#2f4', '#000', 0, 0);
    display.DrawTileString('Hello World!', '#0ff', '#00f', 1, 1);
}
