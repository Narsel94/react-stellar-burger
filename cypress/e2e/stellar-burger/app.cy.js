describe("тестируем работу бургерной", () => {
  beforeEach(() => {
    //открытие страницы и получаемых данных ингредиентов
    cy.viewport(1400, 1200);
    cy.intercept("GET", "*/ingredients", { fixture: "ingredients.json" });
    cy.visit("http://localhost:3000/");
  });

  it("Открытие страницы", () => {
    //наличие и отсутствие компонентов
    cy.get("header[data-testid='headerTest']").should("exist");
    cy.get("main[data-testid='mainPage']").should("exist");
    cy.get("header[data-testid='headerTest']").should("exist");
    cy.get("main[data-testid='mainPage']").should("exist");
    cy.get("div[data-testid='constructor']").should("exist");
    cy.get("div[data-testid='ingredients']").should("exist");
    cy.title().should("eq", "Stellar Burger");
    cy.get("[class^=burger-constructor_mainElement]")
      .contains("Пожалуйста, прежде всего добавьте булку...")
      .should("exist");
    cy.get("[class^=burger-constructor_topLock]").should("not.exist");
    cy.get("[class^=burger-constructor_bottonLock]").should("not.exist");
    cy.get("[class^=burger-ingredient_card]").should("exist");
    cy.get("[class^=burger-constructor_bill]").should("exist");
    cy.get("[class^=burger-constructor_bill] > [class^=text]").should(
      "have.text",
      "0"
    );
    cy.get("button[class^=button]")
      .contains("Оформить заказ")
      .should("exist")
      .should(
        "not.have.css",
        "background",
        "linear-gradient(63.18deg, rgb(128, 26, 179) 0%, rgb(76, 76, 255) 100%);"
      );

    //проверка открытие попапа ингредиента
    cy.get("[class^=igredient-details_popup]").should("not.exist");
    cy.get("[class^=burger-ingredient_card]")
      .contains("Флюоресцентная булка R2-D3")
      .click();
    cy.get("[class^=igredient-details_popup]").should("exist");
    cy.get("[class^=igredient-details_popup]")
      .contains("Детали ингредиента")
      .should("exist");
    cy.get("[class^=igredient-details_popup]")
      .contains("Флюоресцентная булка R2-D3")
      .should("exist");
    cy.get("[class^=modal_icon]").should("exist").click();
    cy.get("[class^=igredient-details_popup]").should("not.exist");

    //драг энд дроп
    cy.get("[class^=burger-ingredient_card]")
      .contains("Краторная булка")
      .should("exist");
    cy.get("[class^=burger-ingredient_card]")
      .contains("Краторная булка")
      .trigger("dragstart");
    cy.get("[class^=burger-constructor_mainElement]").trigger("drop");
    cy.get("[class^=burger-constructor_bill] > [class^=text]").should(
      "have.text",
      "2"
    );
    cy.get("button[class^=button]")
      .contains("Необходимо авторизоваться")
      .should("exist");
    cy.get("[class^=burger-constructor_topLock]").should("exist");
    cy.get("[class^=burger-constructor_bottonLock]").should("exist");
    cy.get("[class^=constructor-card_card]").should("not.exist");
    cy.get("[class^=burger-ingredient_card]")
      .contains("Соус фирменный Space Sauce")
      .trigger("dragstart");
    cy.get("[class^=burger-constructor_mainElement]").trigger("drop");
    cy.get("[class^=burger-constructor_bill] > [class^=text]").should(
      "have.text",
      "82"
    );
    cy.get("[class^=constructor-card_card]")
      .contains("Соус фирменный Space Sauce")
      .should("exist");
    cy.get("[class^=constructor-card_card]")
      .contains("Сыр с астероидной плесенью")
      .should("not.exist");
    cy.get("[class^=burger-ingredient_card]")
      .contains("Сыр с астероидной плесенью")
      .trigger("dragstart");
    cy.get("[class^=burger-constructor_mainElement]").trigger("drop");

    cy.get("[class^=constructor-card_card]")
      .contains("Сыр с астероидной плесенью")
      .should("exist");
    cy.get("[class^=burger-constructor_bill] > [class^=text]").should(
      "have.text",
      "4224"
    );

    //Авторизация
    cy.get("button[class^=button]")
      .contains("Необходимо авторизоваться")
      .click();
    cy.title().should("eq", "Вход");
    cy.location().should((loc) => {
      expect(loc.href).to.include("/login");
    });
    cy.get('[data-testid="loginForm"]').should("exist");
    cy.get("input").should(($input) => {
      expect($input).to.have.length(2);
    });

    //заполнение формы и авторизация
    cy.get("[type^=email]")
      .should("exist")
      .click()
      .type("ivan_petrov123@internet.ru")
      .should("have.value", "ivan_petrov123@internet.ru");

    cy.get("[type^=password]")
      .should("exist")
      .click()
      .type("123123")
      .should("have.value", "123123");
    cy.get("[type=submit]").should("exist").click();

    //переход на страницу конструктора после авторизации
    cy.location().should((loc) => {
      expect(loc.toString()).to.eq("http://localhost:3000/");
    });
    cy.title().should("eq", "Stellar Burger");
    cy.get("[class^=order-details_popu]").should("not.exist");
    //подтверждение заказа и открытие попапа деталей заказа
    cy.get("button[class^=button]").contains("Оформить заказ").click();
    cy.intercept("POST", "*/orders", { fixture: "orders.json" });
    cy.get("[class^=order-details_popu]").should("exist");
    cy.get("h1[class^=text]").contains("10000").should("exist");
    cy.get("p").contains("идентификатор заказа").should("exist");
    cy.get("[class^=modal_icon]").click();

    //проверка очистки конструктора
    cy.get("[class^=constructor-card_card]").should("not.exist");
    cy.get("[class^=burger-constructor_topLock]").should("not.exist");
    cy.get("[class^=burger-constructor_bottonLock]").should("not.exist");
    cy.get("button[class^=button]")
      .contains("Оформить заказ")
      .should(
        "not.have.css",
        "background",
        "linear-gradient(63.18deg, rgb(128, 26, 179) 0%, rgb(76, 76, 255) 100%);"
      );
  });
});
