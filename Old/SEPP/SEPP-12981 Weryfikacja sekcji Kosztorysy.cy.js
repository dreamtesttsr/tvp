const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e20 } = require('../../../../POM/Planowanie/E20 Porozumienia')
const { e22 } = require('../../../../POM/Planowanie/E22 Porozumienia - szczegoly')
const { e23 } = require('../../../../POM/Planowanie/E23 Koszty planowane')

describe('SEPP-12981 Weryfikacja sekcji Kosztorysy', function () {
    it('Weryfikacja sekcji Kosztorysy', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        cy.log('Krok 1 - otwarcie ekranu szczegółów porozumienia w trybie edycji')
        // przejście do zakładki Porozumienia
        cy.goToMenu('Porozumienia')
        // wyszukanie i przejście do szczegółów wybranego porozumienia
        cy.get('#TvAudition').type('TEST KOSZTORYSY')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().should('have.attr', 'title', 'Edycja').click()
        cy.get('.fieldsetField').contains('Porozumienie (2000028)')

        cy.log('Krok 2 - weryfikacja operacji w sekcji Kosztorysy')
        e22.dodajKosztorysPrzycisk().click()
        cy.get('.modal-title').should('be.visible').contains('Podaj nazwę kosztorysu')
        cy.get('input[name="AgreementTitle"]').type(daneTestowe.numer12345)
        cy.get('#titleModal-noBtn').click()
        cy.get('#titleModal-confirm-return-yesBtn').click()
        e22.edytujKosztorysPrzycisk().click()
        cy.get('.modal-title').should('be.visible').contains('Edytuj nazwę kosztorysu')
        cy.get('input[name="AgreementTitle"]').should('have.attr', 'value', 'TEST KOSZTORYSY')
        cy.get('input[name="AgreementTitle"]').type('śŁóęcinkówkó')
        cy.get('#EditTitleModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        e22.edytujKosztorysPrzycisk().click()
        cy.get('.modal-title').should('be.visible').contains('Edytuj nazwę kosztorysu')
        cy.get('input[name="AgreementTitle"]').should('have.attr', 'value', 'TEST KOSZTORYSYŚŁÓĘCINKÓWKÓ')
        cy.get('input[name="AgreementTitle"]').clear().type('TEST KOSZTORYSY')
        cy.get('#EditTitleModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        e22.kopiujKosztorysPrzycisk().click()
        cy.get('.modal-title').should('be.visible').contains('Kopiuj kosztorys w porozumieniu')
        cy.get('select[id="TitleTargetforCopy"]').select('[B-II] Kosztorys szacunkowy do Brief cz. II', { force: true })
        cy.get('#copyTitleModal-noBtn').click()
        cy.get('button#copyTitleModal-confirm-return-yesBtn').click()

        cy.log('Krok 3 - weryfikacja ekranu Kosztów planowanych')
        cy.get('#ToPlanedCosts').click()
        e23.rodzajKosztuPoz1Przycisk('WYNAGRODZENIA').should('contain.text', ' 05 ')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').should('contain.text', ' 030 ').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Asystent realizatora wizji').parent().parent().parent().parent().siblings('div.col.w-4').should('contain.text', '000008 ')
        e23.edytujKosztPrzycisk('Inne').parent().parent().parent().parent().siblings('div.col.w-4').should('contain.text', '999999 ')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').should('contain.text', ' 50 ').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').should('contain.text', '010 ').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('TELEPROMPTER').parent().parent().parent().parent().should('contain.text', ' 000033')
        e23.edytujKosztPrzycisk('Inne').parent().parent().parent().parent().should('contain.text', ' 999999')
        // Powrót na ekran szczegółów porozumienia
        cy.get('#ReturnToAgreementBtn').click()
        cy.get('.fieldsetField').contains('Porozumienie (2000028)')

        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})