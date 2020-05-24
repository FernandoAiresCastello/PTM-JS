/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    display.js

=============================================================================*/
class Display {
    Gfx = null;
    FrameCounter = 0;
    FrameRendererHandle = null;
    GridViews = [];

    constructor() {
        this.Gfx = new GraphicsDriver();
    }

    StartRendering() {
        this.FrameCounter = 0;
        this.RenderFrame();
    }

    StopRendering() {
        window.cancelAnimationFrame(this.FrameRendererHandle);
    }

    RenderFrame() {
        for (let i = 0; i < this.GridViews.length; i++) {
            this.GridViews[i].Render();
        }
        this.FrameCounter++;
        this.FrameRendererHandle = window.requestAnimationFrame(() => this.RenderFrame());
    }

    AddGridView(view, grid) {
        view.Display = this;
        view.ObjectGrid = grid;
        this.GridViews.push(view);
    }
}
