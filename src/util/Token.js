import jwtDecode from "jwt-decode";

class Token {

    token = null;

    constructor() {
        this.init();
    }

    init() {
        this.token = localStorage.getItem("token");
    }

    getToken = () => this.token;

    setToken = token => this.token = token;

    getId = () => {
        if (!this.token) {
            return null;
        } else {
            const { id } = jwtDecode(this.token);
            return id;
        }
    };
    getRole = () => {
        if (!this.token) {
            return null;
        } else {
            const { role } = jwtDecode(this.token);
            return role;
        }
    }
    getUserWallId=()=>{
        if(!this.token){
            return null
        }
        const {userWallId} =jwtDecode(this.token);
        return userWallId;
    }
}

export default new Token();