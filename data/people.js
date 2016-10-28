const eventData = require('./events');

const personList = [
    {
        id: 1,
        name: "Phil"
    },
    {
        id: 2,
        name: "Bren"
    },
    {
        id: 3,
        name: "Francis Underwood"
    },
    {
        id: 4,
        name: "Claire Underwood"
    },
    {
        id: 5,
        name: "Ricky Underwood"
    },
    {
        id: 6,
        name: "Leo Boykewich"
    }
];

let exportedMethods = {
    getAllPeople () { return Promise.resolve(personList.slice(0)); },
    getPerson(id) {

        if (id === undefined) return Promise.reject("No id provided");

        let person = personList.filter(x => x.id === id).shift();

        console.log('after filter person is ');
        console.log(person);
        if (!person) return Promise.reject("No person found");


        return eventData.getEventsForAttendee(id).then (eventlist => {
            console.log(eventlist);
            let re = {
                id:person.id,
                name:person.name,
                events:eventlist
            }
            return Promise.resolve(re);
        })  
        .catch(err => {
            console.log(err);
            return Promise.reject(err);
        });
        
    },
    getPeoplebyList(list){
        console.log('getPeoplebyList is called, list passed in is ');
        console.log(list);
        if(!list)return Promise.reject("no list provided");
        return Promise.resolve(personList.filter(x => list.indexOf(x.id)>=0 ));

    }
   
}


module.exports = exportedMethods;

