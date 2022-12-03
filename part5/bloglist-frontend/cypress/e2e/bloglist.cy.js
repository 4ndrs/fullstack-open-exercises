describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("username").find("input");
    cy.contains("password").find("input");
    cy.contains("login");
  });
});
