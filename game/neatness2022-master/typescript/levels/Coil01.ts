/* This file is part of The Neatness (js13kGames–2022)
 * GitHub https://github.com/mvasilkov/neatness2022
 * Copyright (c) 2022 Mark Vasilkov
 * Licensed under the GNU General Public License version 3
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import { tiles, width, xs, ys } from '../bitmaps/Coil01.js'
import { Level } from '../Level.js'

export class Coil01 extends Level {
    constructor() {
        super()

        this.reflect = true

        this.addHotspot(xs[0] - 3, ys[0], false)
        this.addHotspot(xs[1] - 3, ys[1], false)
        this.addHotspot(xs[2] - 3, ys[2], true)
        this.addHotspot(xs[3] - 3, ys[3], false)
        this.addHotspot(xs[4] - 3, ys[4], true)
        this.addHotspot(xs[5] - 3, ys[5], false)
        this.addHotspot(xs[6] - 3, ys[6], true)
        this.addHotspot(xs[7] - 3, ys[7], true)
    }

    override paintInternal() {
        this.paintInternalTiles2(tiles, width)
    }
}
