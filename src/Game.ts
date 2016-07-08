/*
Copyright 2016 Alec Fenichel, Matt Schmidt, and Benjamin Elder

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
module Game {
  export class Game extends Phaser.Game {

    constructor() {
      super(800, 600, Phaser.AUTO, "game-container", null);

      this.state.add("Boot", Boot, false);
      this.state.add("Preloader", Preloader, false);
      this.state.add("MainMenu", MainMenu, false);

      this.state.start("Boot");

    }

  }
}
