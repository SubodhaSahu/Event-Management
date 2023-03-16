import { IVenue, IVenueAddress } from "../models/Venue";

class VenueDTO {
    name: string;
    address: IVenueAddress

    constructor(data :IVenue) {
        this.name = data.name;
        this.address = data.address;
    }
}

export default VenueDTO