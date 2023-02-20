import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e38 } from '../../../../POM/Rozliczenia/E38 Rachunki wewnetrzne'

describe('SEPP-1181 Rachunki wewnętrzne - kolumny tabeli', function () {
    // DO UZUPEŁNIENIA PUNKT 5 - sprawdzenie czy sortowanie działa prawidłowo!!!

    it('Rachunki wewnętrzne - kolumny tabeli', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // Otwieram widok rachunkow zewnetrznych
        cy.goToMenu('Rachunki wewnętrzne')
        fWspolne.sprawdzProgressBar()
        // 1. Zweryfikuj czy następujące kolumny tabeli są widoczne w widoku domyślnym
        cy.log('Weryfikuję czy następujące kolumny tabeli:ID, Nr rachunku, Data rozliczenia, Kwota rozliczenia, Jednostka TVP, Nr porozumienia, Nazwa audycji TV, Nr zamówienia wewnętrznego, Producent, Agencja i Operacje) są widoczne w widoku domyślnym')
        cy.get('[role="row"] > [data-title="ID"]')
            .should('contain', 'ID')
        cy.get('[role="row"] > [data-title="Nr rachunku"]')
            .should('contain', 'Nr rachunku')
        cy.get('[role="row"] > [data-title="Data rozliczenia"]')
            .should('contain', 'Data rozliczenia')
        cy.get('[role="row"] > [data-title="Kwota rozliczenia"]')
            .should('contain', 'Kwota rozliczenia')
        cy.get('[role="row"] > [data-title="Jednostka TVP"]')
            .should('contain', 'Jednostka TVP')
        cy.get('[role="row"] > [data-title="Nr poroz."]')
            .should('have.attr', 'title', 'Numer porozumienia')
        cy.get('[role="row"] > [data-title="Nazwa audycji TV"]')
            .should('contain', 'Nazwa audycji TV')
        cy.get('[role="row"] > [data-title="Nr zamówienia wew."]')
            .should('have.attr', 'title', 'Numer zamówienia wewnętrznego')
        cy.get('[role="row"] > [data-title="Producent"]')
            .should('contain', 'Producent')
        cy.get('[role="row"] > [data-title="Agencja"]')
            .should('contain', 'Agencja')
        cy.get('[role="row"] > [data-op-template-id="invoiceList_template"]')
            .should('contain', 'Operacje')

        // 2. Kliknij na przycisk "Wybierz widoczne kolumny". 
        // Zweryfikuj czy w popupie zaznaczone na niebiesko są te same kolumny co wymienione w poprzednim kroku
        cy.log('Klikam w przycisk wybierz widoczne kolumny')
        e38.wybierzWidoczneKolumnyPrzycisk().click()

        cy.log('Weryfikuję czy w popupie zaznaczone na niebiesko są te same kolumny co wymienione w poprzednim kroku')
        cy.get('.dt-button-collection').contains('Data rozliczenia').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active')
        cy.get('.dt-button-collection').contains('Kwota rozliczenia').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active')
        cy.get('.dt-button-collection').contains('Jednostka TVP').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active')
        cy.get('.dt-button-collection').contains('Nr poroz.').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active')
        cy.get('.dt-button-collection').contains('Nazwa audycji TV').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active')
        cy.get('.dt-button-collection').contains('Nr zamówienia wew.').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active')
        cy.get('.dt-button-collection').contains('Producent').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active')
        cy.get('.dt-button-collection').contains('Agencja').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active')

        // 3. Odznacz w popupie wszystkie zaznaczone na niebiesko pozycje
        // Tabela rachunków wew. zostaje zmodyfikowana zgodnie z nowymi ustawieniami. 
        // Tylko kolumny "ID", "Nr rachunku"  oraz "Operacje" są teraz widoczne
        cy.log('Odznaczam w popup wszystkie kolumny')
        cy.get('.dt-button-collection').contains('Data rozliczenia').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active').click()
        cy.get('.dt-button-collection').contains('Kwota rozliczenia').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active').click()
        cy.get('.dt-button-collection').contains('Jednostka TVP').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active').click()
        cy.get('.dt-button-collection').contains('Nr poroz.').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active').click()
        cy.get('.dt-button-collection').contains('Nazwa audycji TV').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active').click()
        cy.get('.dt-button-collection').contains('Nr zamówienia wew.').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active').click()
        cy.get('.dt-button-collection').contains('Producent').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active').click()
        cy.get('.dt-button-collection').contains('Agencja').should('have.class', 'dt-button dropdown-item buttons-columnVisibility active').click()

        cy.log('Zamykam popup')
        cy.get('.dt-button-background').click()

        cy.log('Sprawdzam czy tylko kolumny "ID", "Nr rachunku"  oraz "Operacje" są teraz widoczne')
        cy.get('[role="row"] > [data-title="ID"]')
            .should('contain', 'ID')
        cy.get('[role="row"] > [data-title="Nr rachunku"]')
            .should('contain', 'Nr rachunku')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Data rozliczenia')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Kwota rozliczenia')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Jednostka TVP')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Nr poroz.')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Nazwa audycji TV')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Nr zamówienia wew.')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Producent')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Agencja')
        cy.get('[role="row"] > [data-op-template-id="invoiceList_template"]')
            .should('contain', 'Operacje')

        // 4. Zaznacz wszystkie pozycje w popupie listy kolumn.
        // Sprawdź czy wybrane kolumny zostają wyświetlone na liście rachunków wewnętrznych.
        cy.log('Klikam w przycisk wybierz widoczne kolumny')
        e38.wybierzWidoczneKolumnyPrzycisk().click()

        cy.log('Zaznaczam wszystkie pozycje na liście')
        cy.get('.dt-button-collection').contains('Data rozliczenia').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Kwota rozliczenia').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Jednostka TVP').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Nr poroz.').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Nazwa audycji TV').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Nazwa kosztorysu').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Cel kosztorysu').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Nr zamówienia wew.').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Producent').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Agencja').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Grupa kosztów').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Rodzaj kosztu').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()

        cy.log('Zamykam popup listy kolumn')
        cy.get('.dt-button-background').click()

        cy.log('Sprawdzam czy są wyświetlone wszystkie kolumny z listy')
        cy.get('[role="row"] > [data-title="ID"]')
            .should('contain', 'ID')
        cy.get('[role="row"] > [data-title="Nr rachunku"]')
            .should('contain', 'Nr rachunku')
        cy.get('[role="row"] > [data-title="Data rozliczenia"]')
            .should('contain', 'Data rozliczenia')
        cy.get('[role="row"] > [data-title="Kwota rozliczenia"]')
            .should('contain', 'Kwota rozliczenia')
        cy.get('[role="row"] > [data-title="Jednostka TVP"]')
            .should('contain', 'Jednostka TVP')
        cy.get('[role="row"] > [data-title="Nr poroz."]')
            .should('have.attr', 'title', 'Numer porozumienia')
        cy.get('[role="row"] > [data-title="Nazwa audycji TV"]')
            .should('contain', 'Nazwa audycji TV')
        cy.get('[role="row"] > [data-title="Nazwa kosztorysu"]')
            .should('contain', 'Nazwa kosztorysu')
        cy.get('[role="row"] > [data-title="Cel kosztorysu"]')
            .should('contain', 'Cel kosztorysu')
        cy.get('[role="row"] > [data-title="Nr zamówienia wew."]')
            .should('have.attr', 'title', 'Numer zamówienia wewnętrznego')
        cy.get('[role="row"] > [data-title="Producent"]')
            .should('contain', 'Producent')
        cy.get('[role="row"] > [data-title="Agencja"]')
            .should('contain', 'Agencja')
        cy.get('[role="row"] > [data-title="Grupa kosztów"]')
            .should('contain', 'Grupa kosztów')
        cy.get('[role="row"] > [data-title="Rodzaj kosztu"]')
            .should('contain', 'Rodzaj kosztu')
        cy.get('[role="row"] > [data-op-template-id="invoiceList_template"]')
            .should('contain', 'Operacje')

        // 5. Kliknij na nazwę kolumny kolejno dla każdej kolumny (poza kolumną 'Operacje').
        // Wszystkie kolumny są sortowane. Zawartość pierwszego wiersza się zmienia i odpowiada ustawionemu sortowaniu. 
        cy.get('[role="row"] > [data-title="ID"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Nr rachunku"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Data rozliczenia"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Kwota rozliczenia"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Jednostka TVP"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Nr poroz."]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Nazwa audycji TV"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Nazwa kosztorysu"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Cel kosztorysu"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Nr zamówienia wew."]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Producent"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Agencja"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Grupa kosztów"]').first().click({ force: true })
        cy.get('[role="row"] > [data-title="Rodzaj kosztu"]').first().click({ force: true })

        cy.log('Otwieram popup Wybierz widoczne kolumny')
        e38.wybierzWidoczneKolumnyPrzycisk().click()

        cy.log('odznaczam kolumny: Nazwa kosztorysu, Cel kosztorysu, Grupa kosztów oraz Rodzaj kosztu')
        cy.get('.dt-button-collection').contains('Nazwa kosztorysu').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Cel kosztorysu').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Grupa kosztów').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()
        cy.get('.dt-button-collection').contains('Rodzaj kosztu').should('have.class', 'dt-button dropdown-item buttons-columnVisibility').click()

        cy.log('Zamykam popup')
        cy.get('.dt-button-background').click()

        cy.log('Sprawdzam czy odpowiednie kolumny są wyświetlone')
        cy.get('[role="row"] > [data-title="ID"]')
            .should('contain', 'ID')
        cy.get('[role="row"] > [data-title="Nr rachunku"]')
            .should('contain', 'Nr rachunku')
        cy.get('[role="row"] > [data-title="Data rozliczenia"]')
            .should('contain', 'Data rozliczenia')
        cy.get('[role="row"] > [data-title="Kwota rozliczenia"]')
            .should('contain', 'Kwota rozliczenia')
        cy.get('[role="row"] > [data-title="Jednostka TVP"]')
            .should('contain', 'Jednostka TVP')
        cy.get('[role="row"] > [data-title="Nr poroz."]')
            .should('contain', 'Nr poroz.')
        cy.get('[role="row"] > [data-title="Nazwa audycji TV"]')
            .should('contain', 'Nazwa audycji TV')
        cy.get('[role="row"] > [data-title="Nr zamówienia wew."]')
            .should('contain', 'Nr zamówienia wew.')
        cy.get('[role="row"] > [data-title="Producent"]')
            .should('contain', 'Producent')
        cy.get('[role="row"] > [data-title="Agencja"]')
            .should('contain', 'Agencja')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Nazwa kosztorysu')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Cel kosztorysu')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Grupa kosztów')
        cy.get('[role="row"]')
            .should('not.have.attr', 'data-title', 'Rodzaj kosztu')
        cy.get('[role="row"] > [data-op-template-id="invoiceList_template"]')
            .should('contain', 'Operacje')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})