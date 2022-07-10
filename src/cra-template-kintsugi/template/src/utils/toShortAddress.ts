export function toShortAddress(address: string) {
    return address.slice(0, 8).concat("...").concat(address.slice(address.length - 8));
}