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
    public generateFleet(): Array<Ship> {
      const teamNumber: number = 2;
      let fleet: Array<Ship> = new Array<Ship>();

      // Test, just make a random group around a BS
      let centralBattleship: Battleship = new Battleship({ x: 100, y: 100 }, teamNumber);
      let maxRadiusFromBS: number = 50;

      // Put a certain number of cruisers around the BS
      let numCruisers: number = HelperMethods.randomIntInInterval(1, 3);
      for (let i: number = 0; i < numCruisers; i++) {
        let radius: number = HelperMethods.randomIntInInterval(0, maxRadiusFromBS);
        let angleDeg: number = HelperMethods.randomIntInInterval(0, 360);
        let angleRad: number = angleDeg * Math.PI / 180;

        let dx: number = radius * Math.cos(angleRad);
        let dy: number = radius * Math.sin(angleRad);

        let newPosition: IPosition = {
          x: centralBattleship.position.x + dx,
          y: centralBattleship.position.y + dy
        };
        let theCruiser: Cruiser = new Cruiser(newPosition, teamNumber);

        // Do the same thing for fighters

        fleet.push(theCruiser);
      }
      fleet.push(centralBattleship);

      return fleet;
    }

    public setParams(newParams: IFleetCompParams): void {
      this.params = newParams;
    }
  }
}
