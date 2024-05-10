
// generate numbers
function generate9DigitNumber() {
    const min = 91000000;
    const max = 99999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "9" + randomNumber.toString();
}
export function generateManyPhonenumbers(count: number = 100, ddiDdd: string = '5581'){
    var numbers: string[] = [];
    for (let i = 0; i < count; i++) {
    const random9DigitNumber = generate9DigitNumber();
    numbers.push(ddiDdd+random9DigitNumber);
    }
    return numbers;
}
  
  