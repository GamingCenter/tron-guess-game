const contractAddress = '[CONTRACT_DEPLOYED_ADDRESS]'

export const Utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb: any) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};