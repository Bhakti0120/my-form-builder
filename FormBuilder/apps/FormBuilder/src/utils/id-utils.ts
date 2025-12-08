export function shortId(id: string, length: 6):string{
    if (!id) return ""
    return `${id.slice(0,length)}...${id.slice(-length)}`
}