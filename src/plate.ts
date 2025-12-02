import { numberToPosition } from './utils/numberToPosition.ts';
import { positionToNumber } from './utils/positionToNumber.ts';

export interface WellInfo {
  color?: string;
  [key: string]: any;
}

export interface Well {
  number: number;
  position: string;
  info: WellInfo;
  selected?: boolean;
}

export interface PlateOptions {
  /**
   * Width of the plate
   * @default 12
   */
  width?: number;
  /**
   * Height of the plate
   * @default options.width/3*2
   */
  height?: number;
  /**
   * Size of the plate
   * @default options.width*options.height
   */
  size?: number;
}

export class Plate {
  width: number;
  height: number;
  size: number;
  wells: Well[] = [];

  constructor(options: PlateOptions = {}) {
    this.width = options.width ?? 12;
    this.height = options.height ?? (this.width / 3) * 2;
    this.size = this.width * this.height;

    this.initialize();
  }

  getWells(): Well[] {
    return this.wells;
  }

  select(range?: string) {
    if (range) {
      // reset all
      for (const well of this.wells) {
        well.selected = false;
      }

      const reg = /(\d+)(-(\d+))?,?/g;
      let m: RegExpExecArray | null;

      while ((m = reg.exec(range))) {
        const from = Number(m[1]);
        const to = m[3] ? Number(m[3]) : undefined;

        if (to && from <= to) {
          for (let i = from; i <= to; i++) {
            const well = this.wells[i - 1];
            if (!isEmpty(well.info)) well.selected = true;
          }
        } else {
          const well = this.wells[from - 1];
          if (!isEmpty(well.info)) well.selected = true;
        }
      }
    } else {
      // auto-select wells with info
      for (const well of this.wells) {
        well.selected = !isEmpty(well.info);
      }
    }
  }

  getArrayElement(index: number): Well {
    return this.wells[index];
  }

  updateColor(): void {
    for (const well of this.wells) {
      if (isEmpty(well.info)) {
        // empty well = white
        well.info.color = 'white';
      } else if (well.selected) {
        // selected = strong highlight
        well.info.color = 'rgba(144, 238, 144, 1)';
      } else {
        // unselected = faded highlight
        well.info.color = 'rgba(144, 238, 144, 0.3)';
      }
    }
  }

  getByPosition(position: string): Well {
    const index = positionToNumber(position, this.width) - 1;
    return this.wells[index];
  }

  getByNumber(number: number): Well {
    return this.wells[number - 1];
  }

  initialize(): void {
    this.wells = new Array(this.size);

    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        const i = row * this.width + column;

        this.wells[i] = {
          number: i + 1,
          position: numberToPosition(i + 1, this.width),
          info: {},
        };
      }
    }
  }
}

// ----------- Helpers -----------

function isEmpty(object: any): boolean {
  return (
    object &&
    typeof object === 'object' &&
    !Array.isArray(object) &&
    Object.keys(object).length === 0
  );
}
