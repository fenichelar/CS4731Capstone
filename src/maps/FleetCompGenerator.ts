/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class FleetCompGenerator {
    private params: IFleetCompParams;
    private resourcesRemaining: number;

    private defaultParams: IFleetCompParams = {
      resources: 500,
      teamNumber: 2
    };

    public constructor(private game: Game, params?: IFleetCompParams) {
      this.params = params || this.defaultParams;
    }

    /**
     * Generates a fleet composition from the current params and returns it
     * as a list of ships (which should have positions), for now
     */
    public generateFleet(): Array<Ship> {
      this.resourcesRemaining = this.params.resources;

      // Test, just make a random group around a BS
      let centralBattleship: Battleship = new Battleship(this.game, 1000, 700, this.params.teamNumber);
      let fleet: Array<Ship> = this.createGroup(centralBattleship);

      console.log(fleet);

      return fleet;
    }

    private createGroup(centralShip: Ship): Array<Ship> {
      // If there's no support for this ship type, return just this ship
      let fleet: Array<Ship> = [centralShip];
      let supportGroups: Array<ISupportGroup> = centralShip.getSupportGroups();
      if (supportGroups.length === 0) {
        return fleet;
      }

      for (let i: number = 0; i < supportGroups.length; i++) {
        // Put a random number of this type of ships around us, up to the maximum
        let numSupportShips: number = this.game.rnd.integerInRange(0, supportGroups[i].maxNumber);

        for (let j: number = 0; j < numSupportShips; j++) {
          // Put the ship at a random distance and angle from us, up to the maximum distance
          let radius: number = this.game.rnd.integerInRange(0, supportGroups[i].maxDistance);
          let angleDeg: number = this.game.rnd.integerInRange(0, 360);
          let angleRad: number = angleDeg * Math.PI / 180;

          // Turn the polar coordinates into real ones
          let dx: number = radius * Math.cos(angleRad);
          let dy: number = radius * Math.sin(angleRad);

          let newX: number = centralShip.sprite.x + dx;
          let newY: number = centralShip.sprite.y + dy;

          // Create the new ship and give it a group if applicable
          let newShip: Ship = new supportGroups[i].shipType(this.game, newX, newY, this.params.teamNumber);
          let newGroup: Array<Ship> = this.createGroup(newShip);

          // Add the new group to the full fleet
          fleet = fleet.concat(newGroup);
        }
      }

      return fleet;
    }

    public setParams(newParams: IFleetCompParams): void {
      this.params = newParams;
    }
  }
}
