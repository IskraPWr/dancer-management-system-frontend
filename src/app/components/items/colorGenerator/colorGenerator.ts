export class RandomColor {

  private get color () {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomColor(nr?) {
   if (nr) {
    const array = [];
    for (let i = 0; i < nr; i++ ) {
      array.push(this.color);
    }
    return array;
   }
   return this.color;
  }
}

