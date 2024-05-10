import type { SpawnGenerateInput } from "../types";
import { arrayChunk } from '../helper/array';
import { generatePhonenumbersByDdds, getDddByUf } from '../helper/phonenumber'; 

export function spawnWorkersToGenerateBrazilianPhonenumbers(workerUrl: string, data: SpawnGenerateInput){
    const countGeneratedPhonenumbers = data.count;
    const countPhonenumbersByWorker = countGeneratedPhonenumbers / data.workers;
    const dddsFromUf = getDddByUf(data.uf);
    if(!dddsFromUf) return false;
    const phonenumbers: string[] = generatePhonenumbersByDdds(dddsFromUf, (countGeneratedPhonenumbers / dddsFromUf.length))
    const chunkedPhonenumbersArray: string[][] = arrayChunk(phonenumbers, countPhonenumbersByWorker);
    chunkedPhonenumbersArray.forEach((item: string[], index: number) => {
        const worker = new Worker(workerUrl, {
            name: `worker-${index}`
        });
        worker.postMessage({
            phonenumbers: item,
            id: index
        });
        worker.onmessage = (event: MessageEvent) => {
            if(event.data.terminate){
                worker.terminate();
            }
        }
    })
}
