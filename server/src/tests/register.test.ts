const { frisby, LOCAL_HOST } = require("./helpers/constants");

describe("/register test", () => {
    it("Should not be able to register without username field filled in", async () => {
        await frisby.post(`${LOCAL_HOST}/register`, {
            username: "",
            password: "123456aA",
        }).expect("status", 400);
    });
    it("Should not be able to register without password field filled", async () => {
        await frisby.post(`${LOCAL_HOST}/register`, {
            username: "user",
            password: "",
        }).expect("status", 400);
    });

    it("Should be possible to create a user", async () => {
        await frisby.post(`${LOCAL_HOST}/register`, {
            username: "user1",
            password: "123456aA",
        }).expect("status", 201);
    });
});
