/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class FleetCompGenerator {
    private params: IFleetCompParams;

    private defaultParams: IFleetCompParams = {
      resources: 500
    };

    public constructor(params?: IFleetCompParams) {
      this.params = params || this.defaultParams;
    }

    /**
     * Generates a fleet composition from the current params and returns it
     * as a list of ships (which should have positions), for now
     */
    public generateFleet(): Array<Game.Ship> {
      return new Array<Game.Ship>();
    }

    public setParams(newParams: IFleetCompParams): void {
      this.params = newParams;
    }
  }
}
