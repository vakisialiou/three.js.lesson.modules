import { Vector3 } from 'three'
import Particle from './Particle'
import Engine from './particles/Engine'
import Gun from './particles/Gun'

class Slot {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     *
     * @type {boolean}
     */
    this.enabled = false

    /**
     *
     * @type {number|?}
     */
    this.type = null

    /**
     *
     * @type {Particle|?}
     */
    this.particle = null

    /**
     *
     * @type {string|?}
     */
    this.particleId = null
  }

  /**
   *
   * @param {boolean} value
   * @returns {Slot}
   */
  enable(value = true) {
    this.enabled = value
    return this
  }

  /**
   *
   * @param {number} value - constants of current class
   * @returns {Slot}
   */
  setType(value) {
    this.type = value
    return this
  }

  /**
   *
   * @param {Particle} value
   * @returns {Slot}
   */
  setParticle(value) {
    this.particle = value
    return this;
  }

  /**
   *
   * @param {string} value
   * @returns {Slot}
   */
  setParticleId(value) {
    this.particleId = value
    return this;
  }

  /**
   *
   * @param {object} data
   * @returns {Slot}
   */
  copy(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          case 'particle':
            this[property] = this._copyParticle(data[property])
            break
          case 'position':
            this[property].copy(data[property])
            break
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }

  /**
   *
   * @param {Object} data
   * @returns {Particle}
   * @private
   */
  _copyParticle(data) {
    switch (data['type']) {
      case Slot.TYPE_ENGINE:
        return new Engine().copy(data)
      case Slot.TYPE_GUN:
        return new Gun().copy(data)
    }
    return null
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_ENGINE() {
    return 1
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_GUN_TURRET() {
    return 2
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_GUN() {
    return 3
  }
}

export default Slot