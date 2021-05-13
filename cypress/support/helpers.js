export function extractUrl(message){
    let url = message.split(' ').find(item => item[0] === '"')
    return url.slice(1,-1)
}