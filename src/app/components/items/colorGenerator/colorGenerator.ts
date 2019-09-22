   export function getColor () {
    const letters: string = '0123456789ABCDEF';
    let color: string = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  export function getRandomColor(nr?: number): string| string[] {
   if (nr) {
    const array: Array<string> = [];
    for (let i = 0; i < nr; i++ ) {
      array.push(getColor());
    }
    return array;
   }
   return getColor();
  }


