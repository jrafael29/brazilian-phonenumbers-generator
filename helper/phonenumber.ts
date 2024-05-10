import { ufDdds } from "./brazil_uf_ddd";
import { generateManyPhonenumbers } from "./generate";

type EvolutionWhatsappNumbersResponse = {
    exists:boolean,
    jid:string,
    number:string
}

type PhonenumberExistence = {
    phonenumber: string,
    exists: boolean
};

export function getDddByUf(uf: string): number[] | null{
    const result = ufDdds[uf.toUpperCase()];
    if(!result) return null;
    return result;
}

export function generatePhonenumbersByDdds(ddds: number[], countPerDdd: number): string[]{
    const numbers = ddds.map((ddd: number) => {
        return generateManyPhonenumbers(countPerDdd, `55${ddd}`)
    }).flat()
    return numbers;
}

export async function verifyPhonenumbersExistence(phonenumbers: string[]): Promise<PhonenumberExistence[] | null>{
    const [endpoint, apiKey] = [process.env.WPP_VERIFY_ENDPOINT, process.env.API_KEY]
    if(!endpoint || !apiKey) return null;
    const even = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({
                numbers: [...phonenumbers]
            }),
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey
            }
        });
        const result: any = await even.json();
        if(!result) return null;
        const tes: PhonenumberExistence[] = result.map((item: EvolutionWhatsappNumbersResponse) => {
            if(item.exists){
                return {
                    phonenumber: item.number,
                    exists: item.exists
                }
            }
        }).filter((item: PhonenumberExistence) => item)
        return tes;
    }
    