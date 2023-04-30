const db = new Map();

class User {
    constructor({login, email, password}){
        this.login = login;
        this.email = email;
        this.password = password;
        this.id = `${db.size + 1}`;
        this.createdAt = new Date();
        db.set(this.id, this);
        return Promise.resolve(this)
    }
}

User.findAll = async () => {
    return [...db.values()]; 
}

module.exports = User;
