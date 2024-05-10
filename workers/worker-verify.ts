import { appendFile } from "node:fs/promises";

import { arrayChunk } from "../helper/array";
import { verifyPhonenumbersExistence } from "../helper/phonenumber";

declare var self: Worker;

self.onmessage = async (event: MessageEvent) => {
    const {phonenumbers, id} = event.data
    if(phonenumbers){
        const chunkedPhonenumbersArray = arrayChunk(phonenumbers, 100);
        // console.log("novo dado", chunkedPhonenumbersArray);
        const promiseArray = chunkedPhonenumbersArray.map((item) => {
            return verifyPhonenumbersExistence(item);
        })
        console.time(id);
        const result = await Promise.all(promiseArray);
        console.timeEnd(id);
        if(result){
            result.forEach(async (phonenumbersExistence) => {
                const onlyPhonenumbers = phonenumbersExistence?.map((item) => item.phonenumber)
                const path = `generate_results/${id}-res.txt`;
                await appendFile(path, `${onlyPhonenumbers?.join('\n')}\n`);
            })
        }
    }
}

