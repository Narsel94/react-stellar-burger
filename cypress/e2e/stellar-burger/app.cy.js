describe("тестируем работу бургерной", () => {
  beforeEach(() => {
    //открытие страницы и получаемых данных ингредиентов
    cy.viewport(1400, 1200);
    cy.intercept("GET", "*/ingredients", { fixture: "ingredients.json" });
    cy.visit('/');
  });
  //селекторы
  const topLockSelector = "[class^=burger-constructor_topLock]";
  const bottonLockSelector = "[class^=burger-constructor_bottonLock]";
  const constructorCardSelector = "[class^=constructor-card_card]";
  const ingredientCardSelector = "[class^=burger-ingredient_card]";
  const igredietnsPopupSelector = "[class^=igredient-details_popup]";
  const orderDetailsPopupSelector = "[class^=order-details_popup]";
  const closeIconSelector = "[class^=modal_icon]";
  const buttonSelector = "button[class^=button]";
  const constructorMainElementSelector =
    "[class^=burger-constructor_mainElement]";
  const billBLockSelector = "[class^=burger-constructor_bill]";
  const billPriceSelector = `${billBLockSelector} > [class^=text]`;

  it("Открытие страницы", () => {
    //наличие и отсутствие компонентов

    cy.get("header[data-testid='headerTest']").should("exist");
    cy.get("main[data-testid='mainPage']").should("exist");
    cy.get("div[data-testid='constructor']").should("exist");
    cy.get("div[data-testid='ingredients']").should("exist");
    cy.title().should("eq", "Stellar Burger");
    cy.get(constructorMainElementSelector)
      .contains("Пожалуйста, прежде всего добавьте булку...")
      .should("exist");
    cy.get(topLockSelector).should("not.exist");
    cy.get(bottonLockSelector).should("not.exist");
    cy.get(ingredientCardSelector).should("exist");
    cy.get(billBLockSelector).should("exist");
    cy.get(billPriceSelector).should("have.text", "0");
    cy.get(buttonSelector)
      .contains("Оформить заказ")
      .should("exist")
      .should(
        "not.have.css",
        "background",
        "linear-gradient(63.18deg, rgb(128, 26, 179) 0%, rgb(76, 76, 255) 100%);"
      );

    //проверка открытие попапа ингредиента
    cy.get(igredietnsPopupSelector).should("not.exist");
    cy.get(ingredientCardSelector)
      .contains("Флюоресцентная булка R2-D3")
      .click();
    cy.get(igredietnsPopupSelector).should("exist");
    cy.get(igredietnsPopupSelector)
      .contains("Детали ингредиента")
      .should("exist");
    cy.get(igredietnsPopupSelector)
      .contains("Флюоресцентная булка R2-D3")
      .should("exist");
    cy.get(closeIconSelector).should("exist").click();
    cy.get(igredietnsPopupSelector).should("not.exist");

    //драг энд дроп
    cy.get(ingredientCardSelector).contains("Краторная булка").should("exist");
    cy.get(ingredientCardSelector)
      .contains("Краторная булка")
      .trigger("dragstart");
    cy.get(constructorMainElementSelector).trigger("drop");
    cy.get(billPriceSelector).should("have.text", "2");
    cy.get(buttonSelector)
      .contains("Необходимо авторизоваться")
      .should("exist");
    cy.get(topLockSelector).should("exist");
    cy.get(bottonLockSelector).should("exist");
    cy.get(constructorCardSelector).should("not.exist");
    cy.get(ingredientCardSelector)
      .contains("Соус фирменный Space Sauce")
      .trigger("dragstart");
    cy.get(constructorMainElementSelector).trigger("drop");
    cy.get(billPriceSelector).should("have.text", "82");
    cy.get(constructorCardSelector)
      .contains("Соус фирменный Space Sauce")
      .should("exist");
    cy.get(constructorCardSelector)
      .contains("Сыр с астероидной плесенью")
      .should("not.exist");
    cy.get(ingredientCardSelector)
      .contains("Сыр с астероидной плесенью")
      .trigger("dragstart");
    cy.get(constructorMainElementSelector).trigger("drop");

    cy.get(constructorCardSelector)
      .contains("Сыр с астероидной плесенью")
      .should("exist");
    cy.get(billPriceSelector).should("have.text", "4224");

    //Авторизация
    cy.get(buttonSelector).contains("Необходимо авторизоваться").click();
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
      expect(loc.toString()).to.eq("http://localhost:3000/#/");
    });
    cy.title().should("eq", "Stellar Burger");
    cy.get(orderDetailsPopupSelector).should("not.exist");
    //подтверждение заказа и открытие попапа деталей заказа
    cy.get(buttonSelector).contains("Оформить заказ").click();
    cy.intercept("POST", "*/orders", { fixture: "orders.json" });
    cy.get(orderDetailsPopupSelector).should("exist");
    cy.get("h1[class^=text]").contains("10000").should("exist");
    cy.get("p").contains("идентификатор заказа").should("exist");
    cy.get(closeIconSelector).click();

    //проверка очистки конструктора
    cy.get(constructorCardSelector).should("not.exist");
    cy.get(topLockSelector).should("not.exist");
    cy.get(bottonLockSelector).should("not.exist");
    cy.get(buttonSelector)
      .contains("Оформить заказ")
      .should(
        "not.have.css",
        "background",
        "linear-gradient(63.18deg, rgb(128, 26, 179) 0%, rgb(76, 76, 255) 100%);"
      );
    cy.get(billPriceSelector).should("have.text", "0");
  });
});
