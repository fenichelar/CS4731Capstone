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

    // These hold group cost information for each ship type.
    // Built on creation to save time during generation.
    private groupCosts: Map<IShipSubclass, number> = new Map<IShipSubclass, number>();
    private typesOrderedByCost: Array<IShipSubclass> = new Array<IShipSubclass>();

    public constructor(private game: Game, params?: IFleetCompParams) {
      this.params = params || this.getDefaultParams();

      // Build the group cost info, including a list of all types
      // in descending order by group cost
      let unorderedTypes: Array<IShipSubclass> = [Fighter, Cruiser, Battleship];
      for (let i: number = 0; i < unorderedTypes.length; i++) {
        // First get the cost
        let aType: IShipSubclass = unorderedTypes[i];
        let cost: number = this.getMaxGroupCost(aType);

        // Cache the cost value and insertion-sort the type
        this.groupCosts.set(aType, cost);
        let inserted = false;
        for (let j: number = 0; j < this.typesOrderedByCost.length; j++) {
          if (cost > this.groupCosts.get(this.typesOrderedByCost[j])) {
            this.typesOrderedByCost.splice(j, 0, aType);
            inserted = true;
            break;
          }
        }
        if (!inserted) {
          this.typesOrderedByCost.push(aType);
        }
      }

      console.log(this.groupCosts);
      console.log(this.typesOrderedByCost);
    }

    private getDefaultParams(): IFleetCompParams {
      return {
        maxX: this.game.world.bounds.width,
        maxY: this.game.world.bounds.height,
        minX: this.game.world.bounds.width / 2,
        minY: 0,
        resources: 500,
        teamNumber: 2
      };
    }

    /**
     * Generates a fleet composition from the current params and returns it
     * as a list of ships (which should have positions), for now
     */
    public generateFleet(): Array<Ship> {
      this.resourcesRemaining = this.params.resources;
      let fleet: Array<Ship> = new Array<Ship>();

      // Naive implementation: Make as many of the biggest groups as we can first
      for (let i: number = 0; i < this.typesOrderedByCost.length; i++) {
        let currentType: IShipSubclass = this.typesOrderedByCost[i];

        while (this.resourcesRemaining >= this.groupCosts.get(currentType) / 2 &&
               this.resourcesRemaining >= currentType.RESOURCE_COST) {
          // Buffer the central ship from the edges of fleet bounds by its support radius
          // Makes it less likely for fleets to overlap
          let radius: number = 0;
          for (let j = 0; j < currentType.getSupportGroups().length; j++) {
            radius = Math.max(currentType.getSupportGroups()[j].maxDistance, radius);
          }

          let x: number = this.game.rnd.integerInRange(this.params.minX + radius, this.params.maxX - radius);
          let y: number = this.game.rnd.integerInRange(this.params.minY + radius, this.params.maxY - radius);
          let centralShip: Ship = new currentType(this.game, x, y, this.params.teamNumber);
          fleet = fleet.concat(this.createGroup(centralShip));
        }
      }

      return fleet;
    }

    /**
     * Recursively calculate the maximum cost of a battle group
     * for a given ship type, including itself.
     */
    private getMaxGroupCost(centralShipType: IShipSubclass): number {
      // If we have a cached value for this type, use it
      if (this.groupCosts.get(centralShipType)) {
        return this.groupCosts.get(centralShipType);
      }

      let cost: number = centralShipType.RESOURCE_COST;
      let supportGroups: Array<ISupportGroup> = centralShipType.getSupportGroups();

      for (let i: number = 0; i < supportGroups.length; i++) {
        cost += supportGroups[i].maxNumber * this.getMaxGroupCost(supportGroups[i].shipType);
      }

      return cost;
    }

    /**
     * Place support ships around a central unit,
     * and then recursively place support around each of those.
     * Effectively builds a battle group out from a single unit.
     */
    private createGroup(centralShip: Ship): Array<Ship> {
      // If we can't afford this ship... oops. Do nothing
      if (this.resourcesRemaining < centralShip.getType().RESOURCE_COST) {
        centralShip.die();
        return [];
      }

      // Nuclear option: If the ship spawns out of bounds, just kill it
      if (centralShip.sprite.x - centralShip.sprite.offsetX < 0 ||
        centralShip.sprite.y - centralShip.sprite.offsetY < 0 ||
        centralShip.sprite.right > this.game.world.bounds.width ||
        centralShip.sprite.bottom > this.game.world.bounds.height) {
        centralShip.die();
        return [];
      }

      // If there's no support for this ship type, return just this ship
      let fleet: Array<Ship> = [centralShip];
      this.resourcesRemaining -= centralShip.getType().RESOURCE_COST;
      let supportGroups: Array<ISupportGroup> = centralShip.getType().getSupportGroups();
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
