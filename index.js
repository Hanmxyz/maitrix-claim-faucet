const axios = require("axios")
const { HttpsProxyAgent } = require("https-proxy-agent"); 

const wallets = [
    "0x52a5186BAf569Eb707fdaC6e4dd6A6647565368F",
];

// use proxy if you have wallet more than 1

const proxys = [
    "http://proxy67281:proxy67281@45.249.106.254:5951",
];
const endpoints = [
    "maitrix-faucet",
    "maitrix-usd1",
    "maitrix-usde",
    "maitrix-lvl",
    "maitrix-ai16z",
    "maitrix-virtual",
    "maitrix-vana"
]

async function claimFaucet(wallet, endpoint, proxyUrl) {
    try {
        const agent = await new HttpsProxyAgent(proxyUrl)
        const res = await axios.post(`https://app.x-network.io/${endpoint}/faucet`, {
            address: `${wallet}`,
        }, {
            httpsAgent: agent,
            proxy: false,
        });
        console.log('Claim result:', res.data);
    } catch (err) {
        console.error('Error:', err.message);
    }
}


async function main() {
    for (let i = 0 ; i < wallets.length; i++) {
        const wallet = wallets[i]
        const proxy = proxys[i]
            for (const endpoint of endpoints) {
                await claimFaucet(wallet, endpoint, proxy)
            }
    }
}


main()