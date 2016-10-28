const eventData = require('./events');

let locationList = [
    {
        id: 1,
        name: "Texas de Brazil",
        location: "Albany, NY"
    },
    {
        id: 2,
        name: "The Capital Building",
        location: "Washington DC"
    },
    {
        id: 3,
        name: "The Fishing Hole",
        location: "Neverland"
    },
    {
        id: 4,
        name: "Freddy's Rib Joint",
        location: "Washington DC"
    },
    {
        id: 5,
        name: "The Riverfront",
        location: "Troy NY"
    },
];

let exportedMethods = {
    getAllLocations () { return Promise.resolve(locationList.slice(0)); },
    getLocation(id) {
        if (id === undefined) return Promise.reject("No id provided");

        let thislocation = locationList.filter(x => x.id === id).shift();

        
        if (!thislocation) return Promise.reject("No location found")
        return eventData.getEventsForLocation(id).then(evetlist =>{
            let re = {
                id: thislocation.id,
                name: thislocation.name,
                location: thislocation.location,
                events: evetlist
            };
            return Promise.resolve(re);

        }).catch(err => {
            console.log(err);
            return Promise.reject(err);
        });
    }
}

module.exports = exportedMethods;
