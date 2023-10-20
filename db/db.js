const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

module.exports = class JsonDb {
    constructor() {
        const data = require('./db.json');
        if (data) {
            this.data = data;
        } else {
            this.data = [];
        }
        
        /*
        data sample
        [
            {
                "id": "id-generated-by-uuid",
                "title":"Test Title",
                "text":"Test text"
            },
            {
                "id": "id-generated-by-uuid",
                "title":"Test Title1",
                "text":"Test text1"
            },
        ]   
        */
    }

    // get all data
    getAll() {
        console.log(this.data);
        return this.data;
    }

    //create new item
    create(title, text) {
        this.data.push({
            'id': uuidv4(),
            title,
            text
        });
    }

    //write data to file
    async commit() {
        try{
            await fs.promises.writeFile('./db/db.json', JSON.stringify(this.data));
            console.log(`db write successfully`);
        }
        catch(err) {
            console.error(err)
        }
        
    }
}