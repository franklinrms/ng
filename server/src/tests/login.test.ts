// const { frisby, LOCAL_HOST } = require("./helpers/constants");

describe("/login test", () => {
    it("Should not be able to login without username field filled", async () => {
        await frisby.post(`${LOCAL_HOST}/login`, {
            username: "",
            password: "123456aA",
        }).expect("status", 400);
    });
    it("Should not be able to login without password field filled", async () => {
        await frisby.post(`${LOCAL_HOST}/login`, {
            username: "user",
            password: "",
        }).expect("status", 400);
    });

    it("Should be able to login successfully", async () => {
        await frisby.post(`${LOCAL_HOST}/login`, {
            username: "userD",
            password: "123456aA",
        }).expect("status", 201);
    });
});
