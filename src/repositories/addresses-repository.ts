export type AddressesType = {
    id: number
    title: string
}

const addresses = [{id: 1, title: 'bla'}, {id: 2, title: 'bla-bla'}]

export const addressesRepository = {
    async findAddressesById(id: number): Promise<AddressesType | undefined> {
        return addresses.find(el => el.id === id)
    }
}