import { spawnWorkersToGenerateBrazilianPhonenumbers } from './action';

const workerUrl = new URL('./workers/worker-verify.ts', import.meta.url).href;

function main(){
    const inputUf = 'PE'; // UF for generate => PE | RJ | SP | RS | CE | AM | etc...
    const inputCount = 50; // how much phonenumbers do you want generate?

    const inputWorkers = 1; // how much workers do you want spawn?
    // ps: each worker will generate a file.txt with a only valid phonenumbers;

    spawnWorkersToGenerateBrazilianPhonenumbers(workerUrl, {
        count: inputCount,
        uf: inputUf,
        workers: inputWorkers
    });
}
main();







