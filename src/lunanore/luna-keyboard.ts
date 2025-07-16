export enum LunaKey {
    Escape,
    Up,
    Down,
    Left,
    Right,
    Space,
    Enter,
    LeftShift,
    RightShift,
    LeftCtrl,
    RightCtrl,
    Tab,
    AltLeft,
    AltRight,
    Backspace,
    Home,
    End,
    Insert,
    Delete,
    PageUp,
    PageDown,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
    D1,
    D2,
    D3,
    D4,
    D5,
    D6,
    D7,
    D8,
    D9,
    D0,
    Minus,
    Equal,
    BracketLeft,
    BracketRight,
    Backslash,
    Slash,
    Comma,
    Period,
    Semicolon,
    Quote,
    Backquote,
    Numpad0,
    Numpad1,
    Numpad2,
    Numpad3,
    Numpad4,
    Numpad5,
    Numpad6,
    Numpad7,
    Numpad8,
    Numpad9,
    NumpadDivide,
    NumpadMultiply,
    NumpadSubtract,
    NumpadAdd,
    NumpadEnter,
    NumpadDecimal,
}

class LunaKeyState {
    public code: string;
    public key: LunaKey;
    public value: number;

    public constructor(code: string, key: LunaKey) {
        this.code = code;
        this.key = key;
        this.value = 0;
    }
}

export class LunaKeyboard {
    private static readonly _states: LunaKeyState[] = [];

    public static init() {
        this.initStates();
        this.initListeners();
    }

    private static initListeners() {
        window.addEventListener("keydown", (e) => {
            const state = this.getStateByCode(e.code);

            if (state == null) {
                return;
            }

            if (state.value == 0) {
                state.value = 1;
            }
        });

        window.addEventListener("keyup", (e) => {
            const state = this.getStateByCode(e.code);

            if (state == null) {
                return;
            }

            state.value = 3;
        });
    }

    private static initStates() {
        this._states.push(new LunaKeyState('ArrowUp', LunaKey.Up));
        this._states.push(new LunaKeyState('ArrowDown', LunaKey.Down));
        this._states.push(new LunaKeyState('ArrowLeft', LunaKey.Left));
        this._states.push(new LunaKeyState('ArrowRight', LunaKey.Right));
        this._states.push(new LunaKeyState('Space', LunaKey.Space));
        this._states.push(new LunaKeyState('Enter', LunaKey.Enter));
        this._states.push(new LunaKeyState('ShiftLeft', LunaKey.LeftShift));
        this._states.push(new LunaKeyState('ShiftRight', LunaKey.RightShift));
        this._states.push(new LunaKeyState('ControlLeft', LunaKey.LeftCtrl));
        this._states.push(new LunaKeyState('ControlRight', LunaKey.RightCtrl));
        this._states.push(new LunaKeyState('Tab', LunaKey.Tab));
        this._states.push(new LunaKeyState('AltLeft', LunaKey.AltLeft));
        this._states.push(new LunaKeyState('AltRight', LunaKey.AltRight));
        this._states.push(new LunaKeyState('Escape', LunaKey.Escape));
        this._states.push(new LunaKeyState('Backspace', LunaKey.Backspace));
        this._states.push(new LunaKeyState('Home', LunaKey.Home));
        this._states.push(new LunaKeyState('End', LunaKey.End));
        this._states.push(new LunaKeyState('Delete', LunaKey.Delete));
        this._states.push(new LunaKeyState('Insert', LunaKey.Insert));
        this._states.push(new LunaKeyState('PageUp', LunaKey.PageUp));
        this._states.push(new LunaKeyState('PageDown', LunaKey.PageDown));

        this._states.push(new LunaKeyState('KeyA', LunaKey.A));
        this._states.push(new LunaKeyState('KeyB', LunaKey.B));
        this._states.push(new LunaKeyState('KeyC', LunaKey.C));
        this._states.push(new LunaKeyState('KeyD', LunaKey.D));
        this._states.push(new LunaKeyState('KeyE', LunaKey.E));
        this._states.push(new LunaKeyState('KeyF', LunaKey.F));
        this._states.push(new LunaKeyState('KeyG', LunaKey.G));
        this._states.push(new LunaKeyState('KeyH', LunaKey.H));
        this._states.push(new LunaKeyState('KeyI', LunaKey.I));
        this._states.push(new LunaKeyState('KeyJ', LunaKey.J));
        this._states.push(new LunaKeyState('KeyK', LunaKey.K));
        this._states.push(new LunaKeyState('KeyL', LunaKey.L));
        this._states.push(new LunaKeyState('KeyM', LunaKey.M));
        this._states.push(new LunaKeyState('KeyN', LunaKey.N));
        this._states.push(new LunaKeyState('KeyO', LunaKey.O));
        this._states.push(new LunaKeyState('KeyP', LunaKey.P));
        this._states.push(new LunaKeyState('KeyQ', LunaKey.Q));
        this._states.push(new LunaKeyState('KeyR', LunaKey.R));
        this._states.push(new LunaKeyState('KeyS', LunaKey.S));
        this._states.push(new LunaKeyState('KeyT', LunaKey.T));
        this._states.push(new LunaKeyState('KeyU', LunaKey.U));
        this._states.push(new LunaKeyState('KeyV', LunaKey.V));
        this._states.push(new LunaKeyState('KeyW', LunaKey.W));
        this._states.push(new LunaKeyState('KeyX', LunaKey.X));
        this._states.push(new LunaKeyState('KeyY', LunaKey.Y));
        this._states.push(new LunaKeyState('KeyZ', LunaKey.Z));
        
        this._states.push(new LunaKeyState('Digit0', LunaKey.D0));
        this._states.push(new LunaKeyState('Digit1', LunaKey.D1));
        this._states.push(new LunaKeyState('Digit2', LunaKey.D2));
        this._states.push(new LunaKeyState('Digit3', LunaKey.D3));
        this._states.push(new LunaKeyState('Digit4', LunaKey.D4));
        this._states.push(new LunaKeyState('Digit5', LunaKey.D5));
        this._states.push(new LunaKeyState('Digit6', LunaKey.D6));
        this._states.push(new LunaKeyState('Digit7', LunaKey.D7));
        this._states.push(new LunaKeyState('Digit8', LunaKey.D8));
        this._states.push(new LunaKeyState('Digit9', LunaKey.D9));
        
        this._states.push(new LunaKeyState('Minus', LunaKey.Minus));
        this._states.push(new LunaKeyState('Equal', LunaKey.Equal));
        this._states.push(new LunaKeyState('BracketLeft', LunaKey.BracketLeft));
        this._states.push(new LunaKeyState('BracketRight', LunaKey.BracketRight));
        this._states.push(new LunaKeyState('Backslash', LunaKey.Backslash));
        this._states.push(new LunaKeyState('Slash', LunaKey.Slash));
        this._states.push(new LunaKeyState('Period', LunaKey.Period));
        this._states.push(new LunaKeyState('Comma', LunaKey.Comma));
        this._states.push(new LunaKeyState('Semicolon', LunaKey.Semicolon));
        this._states.push(new LunaKeyState('Backquote', LunaKey.Backquote));
        this._states.push(new LunaKeyState('Quote', LunaKey.Quote));
        
        this._states.push(new LunaKeyState('Numpad0', LunaKey.Numpad0));
        this._states.push(new LunaKeyState('Numpad1', LunaKey.Numpad1));
        this._states.push(new LunaKeyState('Numpad2', LunaKey.Numpad2));
        this._states.push(new LunaKeyState('Numpad3', LunaKey.Numpad3));
        this._states.push(new LunaKeyState('Numpad4', LunaKey.Numpad4));
        this._states.push(new LunaKeyState('Numpad5', LunaKey.Numpad5));
        this._states.push(new LunaKeyState('Numpad6', LunaKey.Numpad6));
        this._states.push(new LunaKeyState('Numpad7', LunaKey.Numpad7));
        this._states.push(new LunaKeyState('Numpad8', LunaKey.Numpad8));
        this._states.push(new LunaKeyState('Numpad9', LunaKey.Numpad9));
        this._states.push(new LunaKeyState('NumpadDivide', LunaKey.NumpadDivide));
        this._states.push(new LunaKeyState('NumpadMultiply', LunaKey.NumpadMultiply));
        this._states.push(new LunaKeyState('NumpadSubtract', LunaKey.NumpadSubtract));
        this._states.push(new LunaKeyState('NumpadAdd', LunaKey.NumpadAdd));
        this._states.push(new LunaKeyState('NumpadEnter', LunaKey.NumpadEnter));
        this._states.push(new LunaKeyState('NumpadDecimal', LunaKey.NumpadDecimal));
    }

    public static update() {
        for (let i = 0; i < this._states.length; i++) {
            const state = this._states[i];

            if (state.value == 1) {
                this._states[i].value = 2;
            }

            if (state.value == 3) {
                this._states[i].value = 0;
            }
        }
    }

    public static keyDown(key: LunaKey) {
        const state = this.getStateByKey(key);

        if (state != null) {
            return state.value > 0;
        }

        return false;
    }

    public static keyUp(key: LunaKey) {
        const state = this.getStateByKey(key);

        if (state != null) {
            return state.value == 3;
        }

        return false;
    }

    public static keyPressed(key: LunaKey) {
        const state = this.getStateByKey(key);

        if (state != null) {
            return state.value == 1;
        }

        return false;
    }

    /* HELPER FUNCTIONS */
    private static getStateByKey(key: LunaKey): LunaKeyState {
        for (let state of this._states) {
            if (state.key == key) {
                return state;
            }
        }

        return null;
    }

    private static getStateByCode(code: string): LunaKeyState {
        for (let state of this._states) {
            if (state.code == code) {
                return state;
            }
        }

        return null;
    }
}
