// Dựa trên Listing 16
import ProductPage from "../pages/ProductPage";

describe("Product E2E Tests", () => {
  const productPage = new ProductPage();
  const productData = {
    name: "Laptop Dell XPS 13",
    price: "25000000",
    quantity: "5",
  };
  const updatedPrice = "24000000";

  beforeEach(() => {
    cy.login("testuser", "Test123");
    productPage.visit(); 
  });

  // a) Test Create product flow (0.5 điểm)
  it("Nên tạo sản phẩm mới thành công (Create)", () => {
    productPage.clickAddNew();
    productPage.fillProductForm(productData);
    productPage.submitForm();

    productPage.getSuccessMessage().should("contain", "thành công");
    productPage.getProductInList(productData.name).should("exist");
  });

  // b) Test Read/List products (0.5 điểm)
  it("Nên hiển thị danh sách sản phẩm", () => {
    productPage.getProductInList(productData.name).should("be.visible");
  });

  // c) Test Update product (0.5 điểm)
  it("Nên cập nhật sản phẩm thành công (Update)", () => {
    productPage.getProductInList(productData.name).click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="product-price"]').clear().type(updatedPrice);
    productPage.submitForm();
    cy.get('[data-testid="product-price"]').should("have.value", updatedPrice);
  });

  // d) Test Delete product (0.5 điểm)
  it("Nên xóa sản phẩm thành công (Delete)", () => {
    productPage.getProductInList(productData.name).click();
    cy.get('[data-testid="delete-btn"]').click();
    productPage.confirmDelete();
    productPage.getProductInList(productData.name).should("not.exist");
  });

  // e) Test Search/Filter functionality (0.5 điểm)
  it("Nên tìm kiếm sản phẩm theo từ khóa", () => {
    cy.get('[data-testid="search-input"]').type("Dell");
    productPage.getProductInList("Laptop Dell XPS 13").should("exist");
    productPage.getProductInList("Chuột Logitech").should("not.exist");
  });
});
