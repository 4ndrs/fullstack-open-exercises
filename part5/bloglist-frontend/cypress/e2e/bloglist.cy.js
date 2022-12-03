describe("Blog app", () => {
  beforeEach(() => {
    const newUser = {
      name: "Kamen Rider Kaixa",
      username: "kaixa",
      password: "913",
    };

    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser(newUser);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("username").find("input");
    cy.contains("password").find("input");
    cy.contains("login");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.contains("username").find("input").type("kaixa");
      cy.contains("password").find("input").type("913");
      cy.contains("login").click();

      cy.contains("Kamen Rider Kaixa logged in")
        .find("button")
        .contains("logout");
    });

    it("fails with wrong credentials", () => {
      cy.contains("username").find("input").type("kaixa");
      cy.contains("password").find("input").type("555");
      cy.contains("login").click();

      cy.contains("invalid username or password")
        .should("have.class", "error")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", () => {
    beforeEach(() => {
      cy.login({ username: "kaixa", password: "913" });
    });

    it("A blog can be created", () => {
      cy.contains("create new blog").click();
      cy.contains("title").find("input").type("Blooming On the Mountaintop");
      cy.contains("author").find("input").type("Miyanaga Saki");
      cy.contains("url").find("input").type("https://saki-mahjong.co.jp/blog");
      cy.contains(/^create$/).click();

      cy.contains("Blooming On the Mountaintop Miyanaga Saki")
        .find("button")
        .contains("view");
    });

    it.only("A blog can be liked", () => {
      const newBlog = {
        title: "LADY PROSPERA",
        author: "Miorine Rembran",
        url: "https://g-witch.net/blog",
      };

      cy.createBlog(newBlog);

      cy.contains("LADY PROSPERA").find("button").contains("view").click();
      cy.contains("likes 0").find("button").contains("like").click();
      cy.contains("likes 1");
    });
  });
});
