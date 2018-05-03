import Server from './Server'
import SpaceTimer from './../../entity/SpaceTimer'
import UniverseCollection from './../repository/UniverseCollection'

class PlayProcess extends Server {
  /**
   *
   * @param {express} app
   */
  constructor(app) {
    super(app)

    /**
     *
     * @type {SpaceTimer}
     */
    this.spaceTimer = new SpaceTimer()

    /**
     *
     * @type {UniverseCollection}
     */
    this.universeCollection = new UniverseCollection()
  }

  async listen() {
    const universe = await this.universeCollection.getUniverse()

    this.spaceTimer
      .setTimestamp(universe.timestamp)
      .eachMinute((eventData) => {
        return this.universeCollection.updateTimestamp(eventData.timestamp)
      })
      .startTimer()

    this.connect('play-process', (socket) => {

      const eachMinuteEmit = (eventData) => {
        socket.emit('timestamp', eventData.timestamp);
      }

      this.spaceTimer.eachMinute(eachMinuteEmit)

      socket.on('disconnect', () => {
        this.spaceTimer.removeCallbackMinute(eachMinuteEmit)
      });
    });
  }
}

export default PlayProcess