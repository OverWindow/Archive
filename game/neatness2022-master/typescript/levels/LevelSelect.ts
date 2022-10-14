/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { conPaint, conUI, paintTextBlob } from '../canvas.js'
import { Colors } from '../colors/colors.js'
import { Level } from '../Level.js'
import { Settings } from '../prelude.js'
import { enterLevelPhase, LevelPhase, state } from '../state.js'
import { produceRestartMessage } from '../visuals.js'

type WalkFunction = (x: number, y: number, n: number) => void

function walkLevels(Δr: number, walkFunction: WalkFunction) {
    const x0 = 0.5 * Settings.IR_SCREEN_WIDTH
    const y0 = 0.5 * Settings.IR_SCREEN_HEIGHT

    const rx = 0.5 * Settings.IR_SCREEN_WIDTH - 6 * Settings.TILE_WIDTH + Δr
    const ry = 0.5 * Settings.IR_SCREEN_HEIGHT - 4 * Settings.TILE_HEIGHT + Δr

    // Save coordinates for Coil levels
    const xs: number[] = []
    const ys: number[] = []

    // Subtract one because the last level isn't selectable
    for (let n = 0; n < Settings.totalLevels - 1; ++n) {
        const angle = Math.PI * (1.32 * n / (Settings.totalLevels - 2) - 1.16)
        const x = rx * Math.cos(angle) + x0 | 0
        const y = ry * Math.sin(angle) + y0 | 0

        walkFunction(x, y, n)

        if (n > 5 && n < 9) {
            xs.push(x)
            ys.push(Settings.IR_SCREEN_HEIGHT - y)
        }
    }

    // Coil levels
    for (let n = 0; n < 3; ++n) {
        walkFunction(xs[n], ys[n], Settings.totalLevels + n + 1)
    }
}

export class LevelSelect extends Level {
    constructor() {
        super()

        this.buttonsEnabled = 2

        this.addHotspot(0.5 * Settings.IR_SCREEN_WIDTH,
            0.5 * Settings.IR_SCREEN_HEIGHT, false)

        walkLevels(-20, (x, y) => {
            this.addHotspot(x, y, true)
        })
    }

    override _connect(a: number, b: number): void {
        super._connect(a, b)

        const start = this.entryPoints[0].index
        let other: number

        if (start === a) other = b
        else if (start === b) other = a
        else return

        if (this.entryPoints[0].isSatisfied) {
            state.levelIndex = other - this.exitPoints[0].index - 1
            // Correct for ending and padding
            if (state.levelIndex >= Settings.totalLevels - 2) {
                state.levelIndex += 2

                // Coil
                const hasCoil = location.hash === '#coil' ||
                    (document.monetization && document.monetization.state === 'started')

                if (!hasCoil) {
                    // Failing state
                    state.restartMessage = produceRestartMessage(this.hotspots[a], this.hotspots[b], true)
                    // Can't call this.reset() here!
                    enterLevelPhase(LevelPhase.FAILING)

                    return
                }
            }
            enterLevelPhase(LevelPhase.WINNING)
        }
    }

    // @ts-expect-error 't' is declared but its value is never read.
    override paint(t: number): void {
        paintTextBlob(conUI,
            0.5 * Settings.SCREEN_WIDTH,
            0.65 * Settings.SCREEN_HEIGHT,
            48, 'bold 48', Colors.tile, 'The Neatness')
    }

    override paintInternal(): void {
        walkLevels(0, (x, y, n) => {
            const color = n === state.currentLevel ? Colors.tile :
                state.completedLevels[n] ? '#7b8382' : '#ff0040'
            const title = n > Settings.totalLevels ? 'Coil-' + (n - Settings.totalLevels) : '' + (n + 1)
            paintTextBlob(conPaint, x, y, 12, '200 12', color, title, '#0000')
        })
    }
}
